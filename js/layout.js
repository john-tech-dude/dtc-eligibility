/**
 * Shared layout partials — inject consistent footer / breadcrumbs without a build step.
 *
 * Usage on any page:
 *   <script src="../../js/layout.js" defer></script>
 *   <div data-layout="site-footer"></div>
 *   <nav data-layout="breadcrumbs" data-trail='[{"label":"Guides","href":"../guides/"},{"label":"DTC Guide"}]'></nav>
 *
 * Or call: initLayout() after DOM ready.
 */
(function (global) {
  'use strict';

  function depthPrefix() {
    var path = (global.location && global.location.pathname) || '';
    // Count how deep under site root we are
    if (path.indexOf('/pages/forms/') !== -1 || path.indexOf('/pages/guides/') !== -1 || path.indexOf('/pages/docs/') !== -1) {
      return '../../';
    }
    if (path.indexOf('/pages/') !== -1) {
      return '../';
    }
    return '';
  }

  function footerHTML(prefix) {
    return (
      '<div class="layout-footer-inner">' +
      '<nav class="footer-site-nav layout-footer-nav" aria-label="Site navigation">' +
      '<a href="' + prefix + 'index.html">Home</a>' +
      '<a href="' + prefix + 'sitemap.html">Site Map</a>' +
      '<a href="' + prefix + 'index.html#learning-paths">Learning Paths</a>' +
      '<a href="' + prefix + 'glossary.html">Glossary</a>' +
      '<a href="' + prefix + 'index.html#documents">All Guides</a>' +
      '</nav>' +
      '<p class="layout-footer-meta">DTC Teaching Tool · Educational use only · Not legal or investment advice</p>' +
      '</div>'
    );
  }

  function fillFooters(prefix) {
    document.querySelectorAll('[data-layout="site-footer"]').forEach(function (el) {
      if (el.getAttribute('data-layout-filled') === '1') return;
      el.innerHTML = footerHTML(prefix);
      el.classList.add('layout-site-footer');
      el.setAttribute('data-layout-filled', '1');
    });

    // Enhance existing page footers that only have partial nav
    document.querySelectorAll('.page-footer[data-layout="enhance"]').forEach(function (el) {
      if (el.getAttribute('data-layout-filled') === '1') return;
      var nav = el.querySelector('.footer-site-nav');
      if (nav) {
        var sep = nav.querySelector('.footer-nav-sep');
        function appendLink(href, label) {
          if (sep) nav.appendChild(sep.cloneNode(true));
          var a = document.createElement('a');
          a.href = href;
          a.textContent = label;
          nav.appendChild(a);
        }
        if (!nav.querySelector('a[href*="learning-paths"]')) {
          appendLink(prefix + 'index.html#learning-paths', 'Learning Paths');
        }
        if (!nav.querySelector('a[href*="glossary"]')) {
          appendLink(prefix + 'glossary.html', 'Glossary');
        }
      }
      el.setAttribute('data-layout-filled', '1');
    });
  }

  function fillBreadcrumbs(prefix) {
    document.querySelectorAll('[data-layout="breadcrumbs"]').forEach(function (el) {
      if (el.getAttribute('data-layout-filled') === '1') return;
      var trailRaw = el.getAttribute('data-trail') || '[]';
      var trail;
      try {
        trail = JSON.parse(trailRaw);
      } catch (e) {
        trail = [];
      }
      var parts = [{ label: 'Home', href: prefix + 'index.html' }];
      trail.forEach(function (item) {
        if (!item || !item.label) return;
        parts.push(item);
      });
      el.setAttribute('aria-label', el.getAttribute('aria-label') || 'Breadcrumb');
      if (!el.getAttribute('role')) el.setAttribute('role', 'navigation');
      el.innerHTML = parts
        .map(function (p, i) {
          var last = i === parts.length - 1;
          if (last || !p.href) {
            return '<span class="breadcrumb-current" aria-current="page">' + escapeHtml(p.label) + '</span>';
          }
          return (
            '<a href="' +
            escapeAttr(p.href) +
            '">' +
            escapeHtml(p.label) +
            '</a><span class="breadcrumb-sep" aria-hidden="true">›</span>'
          );
        })
        .join('');
      el.classList.add('layout-breadcrumbs');
      el.setAttribute('data-layout-filled', '1');
    });
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function escapeAttr(s) {
    return escapeHtml(s).replace(/'/g, '&#39;');
  }

  function ensureLayoutStyles() {
    if (document.getElementById('layout-partial-styles')) return;
    var css =
      '.layout-site-footer{margin-top:48px;padding:28px 20px 40px;border-top:1px solid var(--border-light, #e0e0e8);text-align:center;}' +
      '.layout-footer-nav{display:flex;flex-wrap:wrap;gap:12px 20px;justify-content:center;margin-bottom:12px;font-size:0.85rem;}' +
      '.layout-footer-nav a{color:var(--accent,#0a2a4a);text-decoration:none;font-weight:500;}' +
      '.layout-footer-nav a:hover{text-decoration:underline;}' +
      '.layout-footer-meta{font-size:0.72rem;color:var(--ink-muted,#6a6a7a);margin:0;line-height:1.5;}' +
      '.layout-breadcrumbs{display:flex;flex-wrap:wrap;align-items:center;gap:6px 8px;font-size:0.78rem;color:var(--ink-muted,#6a6a7a);margin:12px 0 20px;}' +
      '.layout-breadcrumbs a{color:var(--accent,#0a2a4a);text-decoration:none;}' +
      '.layout-breadcrumbs a:hover{text-decoration:underline;}' +
      '.layout-breadcrumbs .breadcrumb-sep{opacity:0.5;}' +
      '.layout-breadcrumbs .breadcrumb-current{color:var(--ink-secondary,#333);font-weight:500;}';
    var style = document.createElement('style');
    style.id = 'layout-partial-styles';
    style.textContent = css;
    document.head.appendChild(style);
  }

  function initLayout() {
    ensureLayoutStyles();
    var prefix = depthPrefix();
    fillFooters(prefix);
    fillBreadcrumbs(prefix);
  }

  global.initLayout = initLayout;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLayout);
  } else {
    initLayout();
  }
})(typeof window !== 'undefined' ? window : globalThis);
