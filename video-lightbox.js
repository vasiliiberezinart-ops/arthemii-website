/*
 * Full-screen video viewer for the Video section (homepage and Videos page).
 *
 * Click a video card to open it full screen with sound and controls.
 * Arrows on screen, the keyboard (← → to switch, Space to pause, F for
 * full screen, Esc to close) and swipes (left / right, down to close)
 * move through the other videos of the same grid.
 *
 * YouTube cards (.yt-placeholder) play their local copy from video-files/;
 * if that file is missing the YouTube player is used instead.
 */
(function () {
  'use strict';

  var CARD = '.video-grid .video-card';

  var css = '' +
    '.video-grid .video-card__embed{cursor:pointer}' +
    '.video-grid .video-card__embed:not(:has(.yt-placeholder))::after{content:"";position:absolute;right:10px;bottom:10px;width:34px;height:34px;' +
      'border-radius:50%;background:rgba(0,0,0,.55) url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27white%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3E%3Cpath d=%27M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5%27/%3E%3C/svg%3E") center/18px no-repeat;' +
      'opacity:0;transform:scale(.9);transition:opacity .25s,transform .25s;pointer-events:none}' +
    '.video-grid .video-card:hover .video-card__embed::after{opacity:1;transform:scale(1)}' +
    '@media (hover:none){.video-grid .video-card__embed:not(:has(.yt-placeholder))::after{opacity:.85;transform:none}}' +
    '.vlightbox{position:fixed;inset:0;background:#000;display:flex;flex-direction:column;align-items:center;justify-content:center;' +
      'padding:clamp(3.5rem,6vw,4.5rem) clamp(3.5rem,7vw,6rem) clamp(4.5rem,7vw,5.5rem);opacity:0;visibility:hidden;pointer-events:none;z-index:10000;' +
      'transition:opacity .28s cubic-bezier(.16,1,.3,1),visibility 0s linear .28s;-webkit-user-select:none;user-select:none}' +
    '.vlightbox.is-open{opacity:1;visibility:visible;pointer-events:auto;transition:opacity .28s cubic-bezier(.16,1,.3,1)}' +
    '.vlightbox__stage{position:relative;flex:1 1 auto;width:100%;min-height:0;display:flex;align-items:center;justify-content:center}' +
    '.vlightbox__video,.vlightbox__frame{max-width:100%;max-height:100%;display:block;background:#000;border:0;outline:none}' +
    '.vlightbox__video{width:auto;height:auto}' +
    '.vlightbox__frame{width:min(100%,calc((100vh - 10rem) * 16 / 9));aspect-ratio:16/9;height:auto}' +
    '.vlightbox.is-loading .vlightbox__video{opacity:.4}' +
    '.vlightbox__caption{position:absolute;left:50%;bottom:clamp(.9rem,2.2vw,1.4rem);transform:translateX(-50%);max-width:min(70vw,640px);' +
      'text-align:center;color:#fff;line-height:1.35;pointer-events:none}' +
    '.vlightbox__title{font-size:.95rem;font-weight:500}' +
    '.vlightbox__meta{font-size:.75rem;color:rgba(255,255,255,.6);margin-top:.2rem;letter-spacing:.04em;font-variant-numeric:tabular-nums}' +
    '.vlightbox__btn{position:absolute;border:none;border-radius:50%;background:rgba(255,255,255,.14);color:#fff;cursor:pointer;z-index:2;' +
      'display:flex;align-items:center;justify-content:center;padding:0;transition:background .2s;-webkit-tap-highlight-color:transparent}' +
    '.vlightbox__btn:hover,.vlightbox__btn:focus-visible{background:rgba(255,255,255,.3);outline:none}' +
    '.vlightbox__btn svg{width:24px;height:24px;stroke:currentColor;stroke-width:2;fill:none;stroke-linecap:round;stroke-linejoin:round}' +
    '.vlightbox__close{top:clamp(.75rem,2vw,1.25rem);right:clamp(.75rem,2vw,1.25rem);width:48px;height:48px}' +
    '.vlightbox__full{top:clamp(.75rem,2vw,1.25rem);right:calc(clamp(.75rem,2vw,1.25rem) + 60px);width:48px;height:48px}' +
    '.vlightbox__full svg{width:20px;height:20px}' +
    '.vlightbox__i-exit,.vlightbox.is-fs .vlightbox__i-enter{display:none}.vlightbox.is-fs .vlightbox__i-exit{display:block}' +
    '.vlightbox__prev,.vlightbox__next{top:50%;width:52px;height:52px;margin-top:-26px}' +
    '.vlightbox__prev{left:clamp(.5rem,2vw,1.5rem)}' +
    '.vlightbox__next{right:clamp(.5rem,2vw,1.5rem)}' +
    '.vlightbox.is-single .vlightbox__prev,.vlightbox.is-single .vlightbox__next{display:none}' +
    '.vlightbox.no-fs .vlightbox__full{display:none}' +
    '@media (max-width:768px){.vlightbox{padding:4rem 0 5.5rem}' +
      '.vlightbox__prev,.vlightbox__next{top:auto;bottom:.75rem;margin-top:0;width:44px;height:44px}' +
      '.vlightbox__prev{left:.75rem}.vlightbox__next{right:.75rem}' +
      '.vlightbox__caption{bottom:.9rem;max-width:calc(100vw - 8rem)}' +
      '.vlightbox__frame{width:100%}}';
  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  var ICON = {
    close: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    prev: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>',
    next: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>',
    full: '<svg class="vlightbox__i-enter" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>' +
          '<svg class="vlightbox__i-exit" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5"/></svg>'
  };

  var lb = document.createElement('div');
  lb.className = 'vlightbox';
  lb.setAttribute('role', 'dialog');
  lb.setAttribute('aria-modal', 'true');
  lb.setAttribute('aria-label', 'Video viewer');
  lb.innerHTML =
    '<div class="vlightbox__stage"></div>' +
    '<div class="vlightbox__caption"><div class="vlightbox__title"></div><div class="vlightbox__meta"></div></div>' +
    '<button type="button" class="vlightbox__btn vlightbox__prev" aria-label="Previous video">' + ICON.prev + '</button>' +
    '<button type="button" class="vlightbox__btn vlightbox__next" aria-label="Next video">' + ICON.next + '</button>' +
    '<button type="button" class="vlightbox__btn vlightbox__full" aria-label="Full screen">' + ICON.full + '</button>' +
    '<button type="button" class="vlightbox__btn vlightbox__close" aria-label="Close">' + ICON.close + '</button>';
  document.body.appendChild(lb);

  var stage = lb.querySelector('.vlightbox__stage');
  var titleEl = lb.querySelector('.vlightbox__title');
  var metaEl = lb.querySelector('.vlightbox__meta');
  var btnPrev = lb.querySelector('.vlightbox__prev');
  var btnNext = lb.querySelector('.vlightbox__next');
  var btnFull = lb.querySelector('.vlightbox__full');
  var btnClose = lb.querySelector('.vlightbox__close');

  var group = [];
  var index = 0;
  var lastFocus = null;
  var player = null;
  var pausedPreviews = [];

  /* ---------- full screen (with the Safari prefix) ---------- */
  function fsElement() { return document.fullscreenElement || document.webkitFullscreenElement || null; }
  function fsSupported() { return !!(lb.requestFullscreen || lb.webkitRequestFullscreen); }
  function enterFs() {
    try {
      var p = lb.requestFullscreen ? lb.requestFullscreen() : (lb.webkitRequestFullscreen && lb.webkitRequestFullscreen());
      if (p && p.catch) p.catch(function () {});
    } catch (e) {}
  }
  function exitFs() {
    if (!fsElement()) return;
    try {
      var p = document.exitFullscreen ? document.exitFullscreen() : (document.webkitExitFullscreen && document.webkitExitFullscreen());
      if (p && p.catch) p.catch(function () {});
    } catch (e) {}
  }
  if (!fsSupported()) lb.classList.add('no-fs');

  /* ---------- what to play for a card ---------- */
  function abs(u) { try { return new URL(u, location.href).href; } catch (e) { return u; } }

  function infoFor(card) {
    var info = { src: '', poster: '', yt: '' };
    var v = card.querySelector('.video-card__embed video');
    if (v) {
      var s = v.querySelector('source');
      info.src = v.getAttribute('src') || v.getAttribute('data-src') ||
        (s && (s.getAttribute('src') || s.getAttribute('data-src'))) || v.currentSrc || '';
      info.poster = v.getAttribute('poster') || v.getAttribute('data-poster') || '';
    }
    var yt = card.querySelector('.yt-placeholder[data-yt]');
    if (yt) {
      info.yt = yt.getAttribute('data-yt');
      var m = (yt.getAttribute('style') || '').match(/url\(["']?([^"')]+)["']?\)/);
      if (m) {
        info.poster = info.poster || m[1];
        if (!info.src) info.src = m[1].replace(/video-posters\/yt-([\w-]+)\.\w+$/, 'video-files/yt-$1.mp4');
      }
    }
    if (info.src) info.src = abs(info.src);
    if (info.poster) info.poster = abs(info.poster);
    return info;
  }

  function text(card, sel) {
    var el = card.querySelector(sel);
    return el ? el.textContent.trim() : '';
  }

  /* ---------- player ---------- */
  function clearStage() {
    if (player && player.tagName === 'VIDEO') {
      try { player.pause(); } catch (e) {}
      player.removeAttribute('src');
      try { player.load(); } catch (e) {}
    }
    stage.innerHTML = '';
    player = null;
  }

  function playYouTube(id) {
    clearStage();
    var f = document.createElement('iframe');
    f.className = 'vlightbox__frame';
    f.src = 'https://www.youtube.com/embed/' + encodeURIComponent(id) + '?autoplay=1&controls=1&rel=0&modestbranding=1&playsinline=1';
    f.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen';
    f.allowFullscreen = true;
    stage.appendChild(f);
    player = f;
    lb.classList.remove('is-loading');
  }

  function playFile(info) {
    clearStage();
    var v = document.createElement('video');
    v.className = 'vlightbox__video';
    v.controls = true;
    v.playsInline = true;
    v.setAttribute('playsinline', '');
    v.preload = 'auto';
    if (info.poster) v.poster = info.poster;
    v.addEventListener('loadeddata', function () { lb.classList.remove('is-loading'); });
    v.addEventListener('error', function () {
      if (player !== v) return;
      if (info.yt) playYouTube(info.yt); else lb.classList.remove('is-loading');
    });
    v.src = info.src;
    stage.appendChild(v);
    player = v;
    var p = v.play();
    if (p && p.catch) p.catch(function () {
      // Browser refused sound without a gesture: play muted, the visitor can unmute
      if (player !== v) return;
      v.muted = true;
      v.play().catch(function () {});
    });
  }

  function show(i) {
    index = (i + group.length) % group.length;
    var card = group[index];
    var info = infoFor(card);
    titleEl.textContent = text(card, '.video-card__title');
    metaEl.textContent = (group.length > 1 ? (index + 1) + ' / ' + group.length : '') +
      (text(card, '.video-card__desc') ? (group.length > 1 ? '  ·  ' : '') + text(card, '.video-card__desc') : '');
    lb.classList.add('is-loading');
    if (info.src) playFile(info);
    else if (info.yt) playYouTube(info.yt);
    else lb.classList.remove('is-loading');
  }

  function pausePreviews() {
    pausedPreviews = [];
    document.querySelectorAll('.video-card video').forEach(function (v) {
      if (!v.paused) { pausedPreviews.push(v); v.pause(); }
    });
  }
  function resumePreviews() {
    pausedPreviews.forEach(function (v) { var p = v.play(); if (p && p.catch) p.catch(function () {}); });
    pausedPreviews = [];
  }

  function open(card) {
    var grid = card.closest('.video-grid');
    group = grid ? Array.prototype.slice.call(grid.querySelectorAll('.video-card')) : [card];
    group = group.filter(function (c) { return infoFor(c).src || infoFor(c).yt; });
    if (group.indexOf(card) < 0) group = [card];
    lb.classList.toggle('is-single', group.length < 2);
    lastFocus = document.activeElement;
    pausePreviews();
    lb.classList.add('is-open');
    document.documentElement.style.overflow = 'hidden';
    show(group.indexOf(card));
    enterFs();
    btnClose.focus({ preventScroll: true });
  }

  function close() {
    if (!lb.classList.contains('is-open')) return;
    lb.classList.remove('is-open');
    clearStage();
    exitFs();
    document.documentElement.style.overflow = '';
    resumePreviews();
    if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
  }

  function next() { if (group.length > 1) show(index + 1); }
  function prev() { if (group.length > 1) show(index - 1); }

  /* ---------- events ---------- */
  // Capture phase: runs before the old inline YouTube / hover handlers on the cards
  document.addEventListener('click', function (e) {
    if (!e.target.closest) return;
    var embed = e.target.closest('.video-card__embed');
    if (!embed || lb.contains(embed)) return;
    var card = embed.closest(CARD);
    if (!card) return;
    e.preventDefault();
    e.stopPropagation();
    open(card);
  }, true);

  btnPrev.addEventListener('click', function (e) { e.stopPropagation(); prev(); });
  btnNext.addEventListener('click', function (e) { e.stopPropagation(); next(); });
  btnClose.addEventListener('click', function (e) { e.stopPropagation(); close(); });
  btnFull.addEventListener('click', function (e) { e.stopPropagation(); fsElement() ? exitFs() : enterFs(); });
  lb.addEventListener('click', function (e) { if (e.target === lb || e.target === stage) close(); });

  // Leaving browser full screen with Esc also closes the viewer
  var wasFs = false;
  function onFsChange() {
    var el = fsElement();
    lb.classList.toggle('is-fs', !!el);
    if (el) { wasFs = true; return; }
    if (wasFs) { wasFs = false; close(); }
  }
  document.addEventListener('fullscreenchange', onFsChange);
  document.addEventListener('webkitfullscreenchange', onFsChange);

  // Capture phase so the arrows switch videos even when the video controls have focus
  document.addEventListener('keydown', function (e) {
    if (!lb.classList.contains('is-open')) return;
    var k = e.key;
    if (k === 'Escape') { e.preventDefault(); close(); }
    else if (k === 'ArrowRight') { e.preventDefault(); e.stopPropagation(); next(); }
    else if (k === 'ArrowLeft') { e.preventDefault(); e.stopPropagation(); prev(); }
    else if ((k === ' ' || k === 'k') && player && player.tagName === 'VIDEO') {
      e.preventDefault(); e.stopPropagation();
      if (player.paused) player.play().catch(function () {}); else player.pause();
    }
    else if ((k === 'f' || k === 'F') && fsSupported()) { e.preventDefault(); fsElement() ? exitFs() : enterFs(); }
    else if (k === 'Tab') {
      var f = [btnPrev, btnNext, btnFull, btnClose].filter(function (b) { return b.offsetParent !== null; });
      if (player && player.tagName === 'VIDEO') f.unshift(player);
      var at = f.indexOf(document.activeElement);
      e.preventDefault();
      f[(at + (e.shiftKey ? -1 : 1) + f.length) % f.length].focus();
    }
  }, true);

  // Swipe: left / right to switch, down to close
  var sx = 0, sy = 0, tracking = false;
  lb.addEventListener('touchstart', function (e) {
    if (e.touches.length !== 1) { tracking = false; return; }
    tracking = true; sx = e.touches[0].clientX; sy = e.touches[0].clientY;
  }, { passive: true });
  lb.addEventListener('touchend', function (e) {
    if (!tracking) return;
    tracking = false;
    var dx = e.changedTouches[0].clientX - sx;
    var dy = e.changedTouches[0].clientY - sy;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) { dx < 0 ? next() : prev(); }
    else if (dy > 90 && dy > Math.abs(dx) * 1.5) { close(); }
  }, { passive: true });
})();
