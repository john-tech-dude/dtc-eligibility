/**
 * Shared scenario tab engine.
 *
 * Markup mode (keep rich HTML panels):
 *   <div data-scenario-root id="scenarios">
 *     <div class="scenario-tabs" role="tablist">...</div>
 *     <div class="scenario-panel" id="sc-a" data-scenario-panel>...</div>
 *   </div>
 *
 * Data mode (JSON-driven):
 *   <div id="scenarios" data-scenario-src="../../data/eligibility-scenarios.json"></div>
 *
 * API: initScenarioEngine(rootOrSelector?)
 *      showScenario(id)  — global for backwards compatibility
 */
(function (global) {
  'use strict';

  var activeRoot = null;

  function el(tag, className, html) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (html != null) node.innerHTML = html;
    return node;
  }

  function escapeHtml(str) {
    if (str == null) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function getPanels(root) {
    return Array.prototype.slice.call(
      root.querySelectorAll('[data-scenario-panel], .scenario-panel')
    );
  }

  function getTabs(root) {
    return Array.prototype.slice.call(
      root.querySelectorAll('[role="tab"], .scenario-tab')
    );
  }

  function showScenarioInRoot(root, id) {
    if (!root || !id) return;
    var panels = getPanels(root);
    var tabs = getTabs(root);

    panels.forEach(function (panel) {
      var match = panel.id === id || panel.getAttribute('data-scenario-id') === id;
      panel.classList.toggle('active', match);
      panel.hidden = !match;
      panel.setAttribute('aria-hidden', match ? 'false' : 'true');
    });

    tabs.forEach(function (tab, index) {
      var target = tab.getAttribute('data-scenario-target') ||
        tab.getAttribute('aria-controls') ||
        extractIdFromOnclick(tab) ||
        (panels[index] && panels[index].id);
      var selected = target === id;
      tab.classList.toggle('active', selected);
      tab.setAttribute('aria-selected', selected ? 'true' : 'false');
      tab.tabIndex = selected ? 0 : -1;
    });

    // Hash deep-link without fighting other hash handlers too hard
    try {
      if (history.replaceState) {
        var url = new URL(global.location.href);
        url.hash = id;
        history.replaceState(null, '', url.pathname + url.search + url.hash);
      }
    } catch (e) { /* ignore */ }

    root.dispatchEvent(new CustomEvent('scenario:change', { detail: { id: id }, bubbles: true }));
  }

  function extractIdFromOnclick(tab) {
    var oc = tab.getAttribute('onclick') || '';
    var m = oc.match(/showScenario\(\s*['"]([^'"]+)['"]\s*\)/);
    return m ? m[1] : null;
  }

  function bindMarkupMode(root) {
    var tabs = getTabs(root);
    var panels = getPanels(root);
    if (!tabs.length || !panels.length) return false;

    if (root.getAttribute('data-scenario-bound') === '1') {
      // Already wired — only re-sync selection from hash
      var hashOnly = (global.location.hash || '').replace(/^#/, '');
      if (panels.some(function (p) { return p.id === hashOnly; })) {
        showScenarioInRoot(root, hashOnly);
      }
      return true;
    }
    root.setAttribute('data-scenario-bound', '1');

    // Normalize ARIA + remove inline onclick dependency
    tabs.forEach(function (tab, index) {
      var target = tab.getAttribute('data-scenario-target') ||
        extractIdFromOnclick(tab) ||
        (panels[index] && panels[index].id);
      if (target) {
        tab.setAttribute('data-scenario-target', target);
        tab.setAttribute('aria-controls', target);
        tab.setAttribute('role', 'tab');
        tab.removeAttribute('onclick');
      }
      tab.addEventListener('click', function (e) {
        e.preventDefault();
        var id = tab.getAttribute('data-scenario-target');
        if (id) showScenarioInRoot(root, id);
      });
      tab.addEventListener('keydown', function (e) {
        var keys = ['ArrowLeft', 'ArrowRight', 'Home', 'End'];
        if (keys.indexOf(e.key) === -1) return;
        e.preventDefault();
        var i = tabs.indexOf(tab);
        var next = i;
        if (e.key === 'ArrowRight') next = (i + 1) % tabs.length;
        if (e.key === 'ArrowLeft') next = (i - 1 + tabs.length) % tabs.length;
        if (e.key === 'Home') next = 0;
        if (e.key === 'End') next = tabs.length - 1;
        tabs[next].focus();
        var tid = tabs[next].getAttribute('data-scenario-target');
        if (tid) showScenarioInRoot(root, tid);
      });
    });

    panels.forEach(function (panel) {
      panel.setAttribute('role', 'tabpanel');
      panel.setAttribute('data-scenario-panel', '');
      if (!panel.hasAttribute('tabindex')) panel.setAttribute('tabindex', '0');
    });

    var tablist = root.querySelector('[role="tablist"], .scenario-tabs');
    if (tablist) tablist.setAttribute('role', 'tablist');

    // Initial selection from hash or first tab
    var hash = (global.location.hash || '').replace(/^#/, '');
    var initial = panels.some(function (p) { return p.id === hash; })
      ? hash
      : (tabs[0] && tabs[0].getAttribute('data-scenario-target')) || (panels[0] && panels[0].id);
    if (initial) showScenarioInRoot(root, initial);
    return true;
  }

  function renderFromData(root, data) {
    root.innerHTML = '';
    root.classList.add('scenarios-section');

    root.appendChild(el('div', 'section-heading', 'Scenario-Based Learning'));
    root.appendChild(el('p', 'section-subtitle',
      'Work through realistic offerings to see how the questionnaire applies. Use tabs or ← → keys. Deep-link with <code>#sc-a</code> … <code>#sc-d</code>.'));

    var tabs = el('div', 'scenario-tabs');
    tabs.setAttribute('role', 'tablist');
    var panelsWrap = el('div', 'scenario-panels');

    (data.scenarios || []).forEach(function (sc, index) {
      var tab = el('button', 'scenario-tab' + (index === 0 ? ' active' : ''));
      tab.type = 'button';
      tab.setAttribute('role', 'tab');
      tab.setAttribute('data-scenario-target', sc.id);
      tab.setAttribute('aria-controls', sc.id);
      tab.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
      tab.tabIndex = index === 0 ? 0 : -1;
      tab.textContent = sc.shortLabel || sc.title;
      tabs.appendChild(tab);

      var panel = el('div', 'scenario-panel' + (index === 0 ? ' active' : ''));
      panel.id = sc.id;
      panel.setAttribute('data-scenario-panel', '');
      panel.setAttribute('role', 'tabpanel');
      panel.setAttribute('tabindex', '0');
      if (index !== 0) panel.hidden = true;

      if (sc.tags && sc.tags.length) {
        var meta = el('div', 'scenario-meta');
        sc.tags.forEach(function (t) {
          meta.appendChild(el('span', 'scenario-tag', escapeHtml(t)));
        });
        panel.appendChild(meta);
      }
      panel.appendChild(el('h4', '', escapeHtml(sc.title)));
      if (sc.offering) {
        panel.appendChild(el('p', '', '<strong>The Offering:</strong> ' + escapeHtml(sc.offering)));
      }
      if (sc.walkthrough && sc.walkthrough.length) {
        panel.appendChild(el('p', '', '<strong>Questionnaire Walkthrough:</strong>'));
        var ul = el('ul', '');
        sc.walkthrough.forEach(function (step) {
          ul.appendChild(el('li', '',
            '<strong>' + escapeHtml(step.label) + ':</strong> ' + escapeHtml(step.text)));
        });
        panel.appendChild(ul);
      }
      if (sc.takeaway) {
        panel.appendChild(el('div', 'scenario-tip',
          '<strong>Key Takeaway:</strong> ' + escapeHtml(sc.takeaway)));
      }
      panelsWrap.appendChild(panel);
    });

    root.appendChild(tabs);
    root.appendChild(panelsWrap);
    bindMarkupMode(root);
  }

  function initDataMode(root) {
    var src = root.getAttribute('data-scenario-src');
    if (!src) return Promise.resolve(false);
    return fetch(src, { credentials: 'same-origin' })
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status + ' for ' + src);
        return res.json();
      })
      .then(function (data) {
        renderFromData(root, data);
        global.__SCENARIOS_DATA__ = data;
        return true;
      })
      .catch(function (err) {
        console.warn('[scenarios]', err);
        root.appendChild(el('div', 'oa-canon-error',
          '<strong>Scenarios could not load from JSON.</strong> ' +
          escapeHtml(err.message) +
          ' Falling back to static markup if present.'));
        return false;
      });
  }

  function initScenarioEngine(rootOrSelector) {
    var root;
    if (!rootOrSelector) {
      root = document.querySelector('[data-scenario-root]') ||
        document.getElementById('scenarios');
    } else if (typeof rootOrSelector === 'string') {
      root = document.querySelector(rootOrSelector);
    } else {
      root = rootOrSelector;
    }
    if (!root) return Promise.resolve(null);

    activeRoot = root;

    if (root.getAttribute('data-scenario-src')) {
      return initDataMode(root).then(function (ok) {
        if (!ok) bindMarkupMode(root);
        return root;
      });
    }

    bindMarkupMode(root);
    return Promise.resolve(root);
  }

  function showScenario(id) {
    var root = activeRoot ||
      document.querySelector('[data-scenario-root]') ||
      document.getElementById('scenarios');
    if (root) showScenarioInRoot(root, id);
  }

  global.initScenarioEngine = initScenarioEngine;
  global.showScenario = showScenario;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      if (document.querySelector('[data-scenario-root], #scenarios[data-scenario-src], #scenarios .scenario-tabs')) {
        initScenarioEngine();
      }
    });
  } else if (document.querySelector('[data-scenario-root], #scenarios[data-scenario-src], #scenarios .scenario-tabs')) {
    initScenarioEngine();
  }
})(typeof window !== 'undefined' ? window : globalThis);
