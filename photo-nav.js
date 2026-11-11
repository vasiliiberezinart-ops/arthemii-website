/*
 * Gallery photo pages: go to the previous / next photo with the keyboard
 * (← →) or a swipe on the photo, and prefetch the next page so it opens fast.
 * The links themselves are plain <a rel="prev|next"> in the page.
 */
(function () {
  'use strict';
  var prev = document.querySelector('a[rel="prev"]');
  var next = document.querySelector('a[rel="next"]');
  if (!prev || !next) return;

  function go(a) { if (a && a.href) window.location.href = a.href; }

  document.addEventListener('keydown', function (e) {
    if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
    var t = e.target;
    if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(prev); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); go(next); }
  });

  var view = document.querySelector('.photo-view');
  if (view) {
    var sx = 0, sy = 0, on = false;
    view.addEventListener('touchstart', function (e) {
      on = e.touches.length === 1;
      if (on) { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }
    }, { passive: true });
    view.addEventListener('touchend', function (e) {
      if (!on) return;
      on = false;
      var dx = e.changedTouches[0].clientX - sx;
      var dy = e.changedTouches[0].clientY - sy;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) go(dx < 0 ? next : prev);
    }, { passive: true });
  }

  // Prefetch the next page so the next photo opens without waiting
  [next, prev].forEach(function (a) {
    var l = document.createElement('link');
    l.rel = 'prefetch';
    l.href = a.href;
    document.head.appendChild(l);
  });
})();
