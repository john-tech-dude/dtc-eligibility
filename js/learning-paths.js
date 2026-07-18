/**
 * Render hub learning paths from data/learning-paths.json
 * Mount: <div id="learning-paths-root" data-paths-src="data/learning-paths.json"></div>
 */
(function (global) {
  'use strict';

  function escapeHtml(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function renderPath(path) {
    var steps = (path.steps || [])
      .map(function (step, i) {
        return (
          '<li class="lp-step">' +
          '<span class="lp-step-num" aria-hidden="true">' +
          (i + 1) +
          '</span>' +
          '<a class="lp-step-link" href="' +
          escapeHtml(step.href) +
          '">' +
          escapeHtml(step.label) +
          '</a>' +
          (i < path.steps.length - 1 ? '<span class="lp-step-arrow" aria-hidden="true">→</span>' : '') +
          '</li>'
        );
      })
      .join('');

    var firstHref = path.steps && path.steps[0] ? path.steps[0].href : '#documents';

    return (
      '<article class="lp-card lp-color-' +
      escapeHtml(path.color || 'accent') +
      '" data-path-id="' +
      escapeHtml(path.id) +
      '">' +
      '<div class="lp-card-top">' +
      '<span class="lp-level">' +
      escapeHtml(path.level || '') +
      '</span>' +
      '<span class="lp-duration">' +
      escapeHtml(path.duration || '') +
      '</span>' +
      '</div>' +
      '<h3 class="lp-title">' +
      escapeHtml(path.title) +
      '</h3>' +
      '<p class="lp-blurb">' +
      escapeHtml(path.blurb) +
      '</p>' +
      '<ol class="lp-steps">' +
      steps +
      '</ol>' +
      '<a class="lp-start" href="' +
      escapeHtml(firstHref) +
      '">Start this path →</a>' +
      '</article>'
    );
  }

  function render(root, data) {
    var meta = data.meta || {};
    root.innerHTML =
      '<div class="lp-header">' +
      '<h2 class="section-title lp-section-title">' +
      '<span class="lp-section-icon" aria-hidden="true">🗺️</span> ' +
      escapeHtml(meta.title || 'Learning Paths') +
      '</h2>' +
      '<p class="section-subtitle lp-intro">' +
      escapeHtml(meta.description || '') +
      '</p>' +
      '</div>' +
      '<div class="lp-grid">' +
      (data.paths || []).map(renderPath).join('') +
      '</div>';
    root.classList.add('lp-root');
  }

  function initLearningPaths(selector) {
    var root =
      typeof selector === 'string'
        ? document.querySelector(selector)
        : selector || document.getElementById('learning-paths-root');
    if (!root) return Promise.resolve(null);

    var src = root.getAttribute('data-paths-src') || 'data/learning-paths.json';
    return fetch(src, { credentials: 'same-origin' })
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json();
      })
      .then(function (data) {
        render(root, data);
        global.__LEARNING_PATHS__ = data;
        return data;
      })
      .catch(function (err) {
        console.warn('[learning-paths]', err);
        root.innerHTML =
          '<p class="lp-error">Learning paths could not load. Serve over HTTP and ensure <code>data/learning-paths.json</code> is available.</p>';
        return null;
      });
  }

  global.initLearningPaths = initLearningPaths;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      if (document.getElementById('learning-paths-root')) initLearningPaths();
    });
  } else if (document.getElementById('learning-paths-root')) {
    initLearningPaths();
  }
})(typeof window !== 'undefined' ? window : globalThis);
