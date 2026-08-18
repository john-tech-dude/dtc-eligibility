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

  function getProgress() {
    try {
      return JSON.parse(localStorage.getItem('dtc-progress-v2')) || {};
    } catch (e) {
      return {};
    }
  }

  function renderPath(path) {
    var progress = getProgress();
    var totalSteps = path.steps ? path.steps.length : 0;
    var completedPoints = 0;
    
    if (path.steps) {
      path.steps.forEach(function(step) {
        var p = progress[step.module];
        if (p) {
          if (p.quizScore !== null && p.quizScore >= 80) {
            completedPoints += 1.0;
          } else if (p.viewed) {
            completedPoints += 0.5;
          }
        }
      });
    }
    
    var pct = totalSteps > 0 ? Math.round((completedPoints / totalSteps) * 100) : 0;

    var steps = (path.steps || [])
      .map(function (step, i) {
        var p = progress[step.module];
        var statusClass = '';
        var checkMark = '';
        if (p) {
          if (p.quizScore !== null && p.quizScore >= 80) {
            statusClass = ' lp-step-passed';
            checkMark = ' <span class="lp-step-check">✓</span>';
          } else if (p.viewed) {
            statusClass = ' lp-step-viewed';
          }
        }
        return (
          '<li class="lp-step' + statusClass + '">' +
          '<span class="lp-step-num" aria-hidden="true">' +
          (i + 1) +
          '</span>' +
          '<a class="lp-step-link" href="' +
          escapeHtml(step.href) +
          '">' +
          escapeHtml(step.label) +
          checkMark +
          '</a>' +
          (i < path.steps.length - 1 ? '<span class="lp-step-arrow" aria-hidden="true">→</span>' : '') +
          '</li>'
        );
      })
      .join('');

    var firstHref = path.steps && path.steps[0] ? path.steps[0].href : '#documents';
    
    var progressHtml = '';
    if (totalSteps > 0) {
      var completedClass = pct === 100 ? ' completed' : '';
      progressHtml = 
        '<div class="lp-progress-wrapper">' +
        '<div class="lp-progress-container" title="' + pct + '% Complete">' +
        '<div class="lp-progress-bar' + completedClass + '" style="width: ' + pct + '%"></div>' +
        '</div>' +
        '<div class="lp-progress-text">' + pct + '% completed' + (pct === 100 ? ' 🏆' : '') + '</div>' +
        '</div>';
    }

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
      progressHtml +
      '<ol class="lp-steps">' +
      steps +
      '</ol>' +
      '<a class="lp-start" href="' +
      escapeHtml(firstHref) +
      '">' + (pct === 100 ? 'Review path' : (pct > 0 ? 'Continue path' : 'Start this path')) + ' →</a>' +
      '</article>'
    );
  }

  function render(root, data) {
    global.__LEARNING_PATHS_ROOT_EL__ = root;
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

    // Mouse tracking spotlight hover effect
    var grid = root.querySelector('.lp-grid');
    if (grid) {
      grid.addEventListener('mousemove', function (e) {
        var card = e.target.closest('.lp-card');
        if (!card) return;
        var rect = card.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', x + 'px');
        card.style.setProperty('--mouse-y', y + 'px');
      });
    }
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

  // React to progress updates
  window.addEventListener('dtc-progress-updated', function () {
    if (global.__LEARNING_PATHS_ROOT_EL__ && global.__LEARNING_PATHS__) {
      render(global.__LEARNING_PATHS_ROOT_EL__, global.__LEARNING_PATHS__);
    }
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      if (document.getElementById('learning-paths-root')) initLearningPaths();
    });
  } else if (document.getElementById('learning-paths-root')) {
    initLearningPaths();
  }
})(typeof window !== 'undefined' ? window : globalThis);
