/*
 * Photo lightbox with previous / next and a close button.
 * Used on the homepage, the Gallery page and the Drawings page.
 *
 * Click a photo inside one of CONTAINERS to open it full screen. The arrows,
 * the keyboard (← → Esc) and swipes (left / right, down to close) move through
 * the other photos of the same kind in the same section.
 */
(function () {
  'use strict';

  var CONTAINERS = ['.gallery__item', '.drawing', '.exhibition-block__photo', '.side-product', '.workspace__photo', '.tech-block__photo'];

  var css = '' +
    '.lightbox{position:fixed;inset:0;background:rgba(10,10,10,.94);display:flex;align-items:center;justify-content:center;' +
      'padding:clamp(3.5rem,6vw,4.5rem) clamp(3.5rem,7vw,6rem);opacity:0;visibility:hidden;pointer-events:none;z-index:9999;' +
      'transition:opacity .28s cubic-bezier(.16,1,.3,1),visibility 0s linear .28s;-webkit-user-select:none;user-select:none}' +
    '.lightbox.is-open{opacity:1;visibility:visible;pointer-events:auto;transition:opacity .28s cubic-bezier(.16,1,.3,1)}' +
    '.lightbox__img{max-width:100%;max-height:100%;object-fit:contain;border-radius:6px;box-shadow:0 30px 80px rgba(0,0,0,.5);' +
      'transform:scale(.96);transition:transform .32s cubic-bezier(.16,1,.3,1),opacity .2s}' +
    '.lightbox.is-open .lightbox__img{transform:scale(1)}' +
    '.lightbox.is-loading .lightbox__img{opacity:.35}' +
    '.lightbox__btn{position:absolute;border:none;border-radius:50%;background:rgba(255,255,255,.14);color:#fff;cursor:pointer;' +
      'display:flex;align-items:center;justify-content:center;padding:0;transition:background .2s;-webkit-tap-highlight-color:transparent}' +
    '.lightbox__btn:hover,.lightbox__btn:focus-visible{background:rgba(255,255,255,.3);outline:none}' +
    '.lightbox__btn svg{width:24px;height:24px;stroke:currentColor;stroke-width:2;fill:none;stroke-linecap:round;stroke-linejoin:round}' +
    '.lightbox__close{top:clamp(.75rem,2vw,1.25rem);right:clamp(.75rem,2vw,1.25rem);width:48px;height:48px}' +
    '.lightbox__prev,.lightbox__next{top:50%;width:52px;height:52px;margin-top:-26px}' +
    '.lightbox__prev{left:clamp(.5rem,2vw,1.5rem)}' +
    '.lightbox__next{right:clamp(.5rem,2vw,1.5rem)}' +
    '.lightbox__counter{position:absolute;left:50%;bottom:clamp(.75rem,2vw,1.25rem);transform:translateX(-50%);color:rgba(255,255,255,.75);' +
      'font-size:.8125rem;letter-spacing:.08em;font-variant-numeric:tabular-nums}' +
    '.lightbox.is-single .lightbox__prev,.lightbox.is-single .lightbox__next,.lightbox.is-single .lightbox__counter{display:none}' +
    CONTAINERS.join(' img,') + ' img{cursor:zoom-in}' +
    '@media (max-width:768px){.lightbox{padding:4rem .5rem 3.25rem}.lightbox__img{border-radius:4px}' +
      '.lightbox__prev,.lightbox__next{top:auto;bottom:.5rem;margin-top:0;width:44px;height:44px}' +
      '.lightbox__counter{bottom:1.3rem}}';
  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  var ICON = {
    close: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    prev: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>',
    next: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>'
  };

  var lb = document.createElement('div');
  lb.className = 'lightbox';
  lb.setAttribute('role', 'dialog');
  lb.setAttribute('aria-modal', 'true');
  lb.setAttribute('aria-label', 'Photo viewer');
  lb.innerHTML =
    '<img class="lightbox__img" alt="">' +
    '<button type="button" class="lightbox__btn lightbox__prev" aria-label="Previous photo">' + ICON.prev + '</button>' +
    '<button type="button" class="lightbox__btn lightbox__next" aria-label="Next photo">' + ICON.next + '</button>' +
    '<button type="button" class="lightbox__btn lightbox__close" aria-label="Close">' + ICON.close + '</button>' +
    '<div class="lightbox__counter" aria-live="polite"></div>';
  document.body.appendChild(lb);

  var lbImg = lb.querySelector('.lightbox__img');
  var btnPrev = lb.querySelector('.lightbox__prev');
  var btnNext = lb.querySelector('.lightbox__next');
  var btnClose = lb.querySelector('.lightbox__close');
  var counter = lb.querySelector('.lightbox__counter');

  var group = [];
  var index = 0;
  var lastFocus = null;

  /* Best large version of a photo: the 1600w WebP from its <picture>, else the <img> itself */
  function largeSrc(img) {
    var pic = img.closest('picture');
    var source = pic && pic.querySelector('source');
    var set = source && (source.getAttribute('srcset') || source.getAttribute('data-srcset'));
    if (set) {
      var best = null, bestW = 0;
      set.split(',').forEach(function (part) {
        var bits = part.trim().split(/\s+/);
        var w = parseInt(bits[1], 10) || 0;
        if (w <= 1600 && w > bestW) { best = bits[0]; bestW = w; }
      });
      if (best) return best;
    }
    return img.currentSrc || img.getAttribute('src') || img.getAttribute('data-src') || '';
  }

  function containerOf(img) {
    for (var i = 0; i < CONTAINERS.length; i++) {
      var c = img.closest(CONTAINERS[i]);
      if (c) return { el: c, selector: CONTAINERS[i] };
    }
    return null;
  }

  /* All photos of the same kind in the same section (e.g. the whole gallery) */
  function groupFor(img, selector) {
    var scope = img.closest('.exhibition-block, .tech-block, section') || document;
    var imgs = [];
    scope.querySelectorAll(selector + ' img').forEach(function (el) { imgs.push(el); });
    return imgs.length ? imgs : [img];
  }

  function preload(i) {
    if (!group.length) return;
    var el = group[(i + group.length) % group.length];
    var im = new Image();
    im.src = largeSrc(el);
  }

  function show(i) {
    index = (i + group.length) % group.length;
    var el = group[index];
    var src = largeSrc(el);
    lb.classList.add('is-loading');
    lbImg.onload = lbImg.onerror = function () { lb.classList.remove('is-loading'); };
    lbImg.src = src;
    lbImg.alt = el.alt || '';
    counter.textContent = (index + 1) + ' / ' + group.length;
    if (group.length > 1) { preload(index + 1); preload(index - 1); }
  }

  function open(img, selector) {
    group = groupFor(img, selector);
    lb.classList.toggle('is-single', group.length < 2);
    lastFocus = document.activeElement;
    show(Math.max(0, group.indexOf(img)));
    lb.classList.add('is-open');
    document.documentElement.style.overflow = 'hidden';
    btnClose.focus({ preventScroll: true });
  }

  function close() {
    if (!lb.classList.contains('is-open')) return;
    lb.classList.remove('is-open');
    document.documentElement.style.overflow = '';
    setTimeout(function () { if (!lb.classList.contains('is-open')) lbImg.removeAttribute('src'); }, 300);
    if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
  }

  function next() { if (group.length > 1) show(index + 1); }
  function prev() { if (group.length > 1) show(index - 1); }

  // Open: capture phase, so a photo wrapped in a link opens here instead of following the link
  document.addEventListener('click', function (e) {
    var img = e.target.closest && e.target.closest('img');
    if (!img || lb.contains(img)) return;
    var c = containerOf(img);
    if (!c) return;
    e.preventDefault();
    e.stopPropagation();
    open(img, c.selector);
  }, true);

  btnPrev.addEventListener('click', function (e) { e.stopPropagation(); prev(); });
  btnNext.addEventListener('click', function (e) { e.stopPropagation(); next(); });
  btnClose.addEventListener('click', function (e) { e.stopPropagation(); close(); });
  lb.addEventListener('click', function (e) { if (e.target === lb) close(); });

  document.addEventListener('keydown', function (e) {
    if (!lb.classList.contains('is-open')) return;
    if (e.key === 'Escape') { e.preventDefault(); close(); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
    else if (e.key === 'Tab') {
      // keep focus inside the viewer
      var f = [btnPrev, btnNext, btnClose].filter(function (b) { return b.offsetParent !== null; });
      var at = f.indexOf(document.activeElement);
      e.preventDefault();
      f[(at + (e.shiftKey ? -1 : 1) + f.length) % f.length].focus();
    }
  });

  // Swipe: left / right to move, down to close
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
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) { dx < 0 ? next() : prev(); }
    else if (dy > 80 && dy > Math.abs(dx)) { close(); }
  }, { passive: true });
})();
