/**
 * OA Canon — load data/oa-canon.json and render Then→Now crosswalk UI.
 * Mount: <div id="oa-crosswalk" data-oa-canon-src="../../data/oa-canon.json"></div>
 */
(function (global) {
  'use strict';

  function resolveSrc(mount) {
    if (mount && mount.getAttribute('data-oa-canon-src')) {
      return mount.getAttribute('data-oa-canon-src');
    }
    // Guess relative path from common page locations
    const path = global.location.pathname || '';
    if (path.includes('/pages/forms/') || path.includes('/pages/guides/') || path.includes('/pages/docs/')) {
      return '../../data/oa-canon.json';
    }
    return 'data/oa-canon.json';
  }

  function el(tag, className, html) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (html != null) node.innerHTML = html;
    return node;
  }

  function statusClass(status) {
    if (status === 'match') return 'oa-status-match';
    if (status === 'partial') return 'oa-status-partial';
    return 'oa-status-legacy';
  }

  function renderTimeline(data) {
    const section = el('div', 'oa-canon-block');
    section.appendChild(el('h3', 'oa-canon-heading', 'Exhibit B &amp; key timelines'));
    section.appendChild(el('p', 'oa-canon-lead',
      'Current OA rules vs. wording still printed on the historical 2000 questionnaire facsimile.'));

    const table = el('div', 'oa-canon-table');
    table.setAttribute('role', 'table');
    table.setAttribute('aria-label', 'OA timelines then versus now');

    const head = el('div', 'oa-canon-row oa-canon-row-head');
    head.setAttribute('role', 'row');
    ['Topic', '2000 form (legacy)', 'OA June 10, 2026', 'Cite'].forEach(function (label) {
      const c = el('div', 'oa-canon-cell oa-canon-th', label);
      c.setAttribute('role', 'columnheader');
      head.appendChild(c);
    });
    table.appendChild(head);

    (data.timelines || []).forEach(function (row) {
      const r = el('div', 'oa-canon-row');
      r.setAttribute('role', 'row');
      r.setAttribute('data-id', row.id || '');
      const cells = [
        '<strong>' + escapeHtml(row.label) + '</strong>',
        '<span class="oa-was">' + escapeHtml(row.legacyForm) + '</span>',
        '<span class="oa-now">' + escapeHtml(row.oaRule) + '</span>',
        '<code class="oa-cite">' + escapeHtml(row.cite) + '</code>'
      ];
      cells.forEach(function (html) {
        const c = el('div', 'oa-canon-cell', html);
        c.setAttribute('role', 'cell');
        r.appendChild(c);
      });
      table.appendChild(r);
    });

    section.appendChild(table);
    return section;
  }

  function renderCrosswalk(data) {
    const section = el('div', 'oa-canon-block');
    section.appendChild(el('h3', 'oa-canon-heading', 'Teaching crosswalk (Slices A–C)'));
    section.appendChild(el('p', 'oa-canon-lead',
      'What the guide used to teach vs. the corrected OA rule. Status <strong>match</strong> means the live page is aligned.'));

    const list = el('div', 'oa-crosswalk-list');
    (data.crosswalk || []).forEach(function (item) {
      const card = el('article', 'oa-crosswalk-card');
      card.setAttribute('data-id', item.id || '');

      const head = el('div', 'oa-crosswalk-card-head');
      head.appendChild(el('h4', '', escapeHtml(item.topic)));
      const badge = el('span', 'oa-status-badge ' + statusClass(item.status),
        escapeHtml((item.status || 'match').toUpperCase()) +
        (item.slice ? ' · Slice ' + escapeHtml(item.slice) : ''));
      head.appendChild(badge);
      card.appendChild(head);

      const body = el('div', 'oa-crosswalk-card-body');
      body.appendChild(el('div', 'oa-diff-line',
        '<span class="oa-diff-label">Was</span><span class="oa-was">' + escapeHtml(item.was) + '</span>'));
      body.appendChild(el('div', 'oa-diff-line',
        '<span class="oa-diff-label">Now</span><span class="oa-now">' + escapeHtml(item.now) + '</span>'));
      card.appendChild(body);
      list.appendChild(card);
    });

    section.appendChild(list);
    return section;
  }

  function renderRules(data) {
    const section = el('div', 'oa-canon-block');
    section.appendChild(el('h3', 'oa-canon-heading', 'Canon rules (quick reference)'));
    const grid = el('div', 'oa-rules-grid');
    (data.rules || []).forEach(function (rule) {
      const card = el('div', 'oa-rule-card');
      card.setAttribute('data-id', rule.id || '');
      card.appendChild(el('h4', '', escapeHtml(rule.label)));
      card.appendChild(el('p', '', escapeHtml(rule.summary)));
      card.appendChild(el('div', 'oa-cite', escapeHtml(rule.cite)));
      if (rule.tags && rule.tags.length) {
        const tags = el('div', 'oa-tags');
        rule.tags.forEach(function (t) {
          tags.appendChild(el('span', 'oa-tag', escapeHtml(t)));
        });
        card.appendChild(tags);
      }
      grid.appendChild(card);
    });
    section.appendChild(grid);
    return section;
  }

  function renderContacts(data) {
    if (!data.contacts) return null;
    const section = el('div', 'oa-canon-block');
    section.appendChild(el('h3', 'oa-canon-heading', 'Contacts policy'));
    const pref = el('ul', 'oa-contact-list');
    (data.contacts.preferred || []).forEach(function (c) {
      pref.appendChild(el('li', '',
        '<strong>' + escapeHtml(c.label) + ':</strong> ' +
        escapeHtml(c.value) +
        (c.use ? ' — <em>' + escapeHtml(c.use) + '</em>' : '')));
    });
    section.appendChild(pref);
    if (data.contacts.legacyFacsimile) {
      section.appendChild(el('p', 'oa-legacy-note',
        '<strong>Legacy facsimile:</strong> ' + escapeHtml(data.contacts.legacyFacsimile.note)));
    }
    return section;
  }

  function escapeHtml(str) {
    if (str == null) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function render(mount, data) {
    mount.innerHTML = '';
    mount.classList.add('oa-canon-root');

    const header = el('div', 'oa-canon-header');
    header.appendChild(el('div', 'section-heading', 'OA Canon — Then vs Now'));
    const asOf = (data.meta && data.meta.asOf) || 'June 10, 2026';
    header.appendChild(el('p', 'section-subtitle',
      'Single teaching source of truth from the <strong>DTC Operational Arrangements as of ' +
      escapeHtml(asOf) +
      '</strong>. Use this when the 2000 form facsimile text conflicts with current practice. Not legal advice.'));
    mount.appendChild(header);

    const filters = el('div', 'oa-canon-filters', '');
    filters.innerHTML =
      '<button type="button" class="oa-filter-btn active" data-view="all">All</button>' +
      '<button type="button" class="oa-filter-btn" data-view="timelines">Timelines</button>' +
      '<button type="button" class="oa-filter-btn" data-view="crosswalk">Crosswalk</button>' +
      '<button type="button" class="oa-filter-btn" data-view="rules">Rules</button>';
    mount.appendChild(filters);

    const body = el('div', 'oa-canon-body');
    const timelines = renderTimeline(data);
    timelines.dataset.view = 'timelines';
    const crosswalk = renderCrosswalk(data);
    crosswalk.dataset.view = 'crosswalk';
    const rules = renderRules(data);
    rules.dataset.view = 'rules';
    const contacts = renderContacts(data);

    body.appendChild(timelines);
    body.appendChild(crosswalk);
    body.appendChild(rules);
    if (contacts) {
      contacts.dataset.view = 'rules';
      body.appendChild(contacts);
    }
    mount.appendChild(body);

    filters.addEventListener('click', function (e) {
      const btn = e.target.closest('.oa-filter-btn');
      if (!btn) return;
      const view = btn.getAttribute('data-view');
      filters.querySelectorAll('.oa-filter-btn').forEach(function (b) {
        b.classList.toggle('active', b === btn);
      });
      body.querySelectorAll('.oa-canon-block').forEach(function (block) {
        if (view === 'all') {
          block.hidden = false;
        } else {
          block.hidden = block.dataset.view !== view;
        }
      });
    });
  }

  function showError(mount, err) {
    mount.innerHTML = '';
    mount.classList.add('oa-canon-root');
    const msg = el('div', 'oa-canon-error');
    msg.innerHTML =
      '<strong>OA Canon could not load.</strong> Serve the site over HTTP (not <code>file://</code>) so ' +
      '<code>data/oa-canon.json</code> can be fetched. ' +
      '<span class="oa-canon-error-detail">' + escapeHtml(err && err.message ? err.message : String(err)) + '</span>';
    mount.appendChild(msg);
  }

  function initOaCanon(selector) {
    const mount = typeof selector === 'string'
      ? document.querySelector(selector)
      : selector || document.getElementById('oa-crosswalk');
    if (!mount) return Promise.resolve(null);

    const src = resolveSrc(mount);
    return fetch(src, { credentials: 'same-origin' })
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status + ' for ' + src);
        return res.json();
      })
      .then(function (data) {
        render(mount, data);
        global.__OA_CANON__ = data;
        return data;
      })
      .catch(function (err) {
        console.warn('[oa-canon]', err);
        showError(mount, err);
        return null;
      });
  }

  global.initOaCanon = initOaCanon;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      if (document.getElementById('oa-crosswalk')) initOaCanon('#oa-crosswalk');
    });
  } else if (document.getElementById('oa-crosswalk')) {
    initOaCanon('#oa-crosswalk');
  }
})(typeof window !== 'undefined' ? window : globalThis);
