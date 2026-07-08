/* Blocking theme init — include synchronously in <head> before CSS to prevent flash */
(function () {
  var stored = localStorage.getItem('dtc-theme');
  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  var theme = stored === 'dark' || (!stored && prefersDark) ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', theme);
})();
