/*
 * Autoplaying videos inside project blocks (.tech-video): muted, looping, inline.
 * A video loads and plays only while it is on screen and pauses when it leaves,
 * so a page with many clips stays light. On the homepage it also waits for the
 * hero video (heroReady), like every other photo and video there.
 */
(function () {
  'use strict';
  var vids = document.querySelectorAll('.tech-video video');
  if (!vids.length) return;

  function heroOk() { return typeof heroReady === 'undefined' || heroReady; }   // eslint-disable-line no-undef
  function prime(v) {
    if (v.getAttribute('data-poster')) { v.poster = v.getAttribute('data-poster'); v.removeAttribute('data-poster'); }
  }
  function start(v) {
    if (!heroOk()) return;
    prime(v);
    if (v.getAttribute('data-src')) { v.src = v.getAttribute('data-src'); v.removeAttribute('data-src'); }
    try { var p = v.play(); if (p && p.catch) p.catch(function () {}); } catch (e) {}
  }

  for (var i = 0; i < vids.length; i++) {
    var v = vids[i];
    // Phones only autoplay videos that are muted and inline
    v.muted = true; v.defaultMuted = true; v.setAttribute('muted', '');
    v.playsInline = true; v.setAttribute('playsinline', '');
    v.loop = true;
  }

  if (!('IntersectionObserver' in window)) {
    for (var j = 0; j < vids.length; j++) start(vids[j]);
    return;
  }

  // Show the poster a little before the video scrolls into view
  var near = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting && heroOk()) prime(e.target); });
  }, { rootMargin: '400px 0px' });

  // Play while at least a quarter of the video is visible
  var seen = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      e.target._onScreen = e.isIntersecting;
      if (e.isIntersecting) start(e.target);
      else if (!e.target.paused) e.target.pause();
    });
  }, { threshold: 0.25 });

  for (var k = 0; k < vids.length; k++) { near.observe(vids[k]); seen.observe(vids[k]); }

  // Retry visible videos that aren't playing yet (hero not ready, tab was hidden, autoplay blocked for a moment)
  setInterval(function () {
    if (document.hidden) return;
    for (var n = 0; n < vids.length; n++) if (vids[n]._onScreen && vids[n].paused) start(vids[n]);
  }, 1500);
})();
