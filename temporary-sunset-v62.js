/* Six-day Scentory sunset theme, fixed in Bangladesh time. */
(function () {
  'use strict';
  var starts = Date.parse('2026-11-19T00:50:00+06:00');
  var ends = Date.parse('2026-11-25T00:50:00+06:00');
  var timer;
  function syncTheme() {
    var now = Date.now();
    document.documentElement.classList.toggle('scentory-sunset-week', now >= starts && now < ends);
    if (timer) clearTimeout(timer);
    if (now < ends) timer = setTimeout(syncTheme, Math.max(1000, Math.min(ends - now, 3600000)));
  }
  syncTheme();
  window.addEventListener('pageshow', syncTheme);
  document.addEventListener('visibilitychange', syncTheme);
}());
