/*
 * Contact form → email (info@arthemii.com) via FormSubmit (https://formsubmit.co).
 *
 * The site is static (GitHub Pages), so messages are relayed by FormSubmit.
 * The very first message triggers an activation email to info@arthemii.com:
 * click "Activate Form" in it once, and all messages arrive from then on
 * (FormSubmit keeps messages sent before activation and delivers them after).
 *
 * After activation FormSubmit can also give you a random alias string;
 * put it in ENDPOINT_ID below instead of the address to hide it from spam bots.
 */
(function () {
  'use strict';

  var ENDPOINT_ID = 'info' + '@' + 'arthemii.com';
  var ENDPOINT = 'https://formsubmit.co/ajax/' + ENDPOINT_ID;

  var MSG = {
    sending: 'Sending…',
    success: 'Thank you! I will get back to you soon.',
    missing: 'Please fill in your name, email and message.',
    badEmail: 'Please enter a valid email address.',
    error: 'Sorry, the message could not be sent. Please try again later or write to info@arthemii.com.'
  };

  function t(s) { return window.I18N ? window.I18N.t(s) : s; }

  var css = document.createElement('style');
  css.textContent =
    '.contact-form__status{margin-top:1rem;font-size:.875rem;line-height:1.6;min-height:1.4em}' +
    '.contact-form__status.is-error{color:#b3261e}' +
    '.contact-form__hp{position:absolute!important;left:-10000px!important;width:1px;height:1px;overflow:hidden}';
  document.head.appendChild(css);

  document.querySelectorAll('form#contactForm, form.contact-form').forEach(function (form) {
    if (form.dataset.contactReady) return;
    form.dataset.contactReady = '1';

    // Honeypot against spam bots (humans never see or fill it)
    var hp = document.createElement('input');
    hp.type = 'text'; hp.name = '_honey'; hp.tabIndex = -1; hp.autocomplete = 'off';
    hp.className = 'contact-form__hp'; hp.setAttribute('aria-hidden', 'true');
    form.appendChild(hp);

    var status = document.createElement('p');
    status.className = 'contact-form__status';
    status.setAttribute('role', 'status');
    status.setAttribute('aria-live', 'polite');
    form.appendChild(status);

    function show(text, isError) {
      status.textContent = t(text);
      status.classList.toggle('is-error', !!isError);
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var val = function (sel) { var el = form.querySelector(sel); return el ? el.value.trim() : ''; };
      var name = val('[name=name]'), email = val('[name=email]'), subject = val('[name=subject]'), message = val('[name=message]');

      if (!name || !email || !message) { show(MSG.missing, true); return; }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { show(MSG.badEmail, true); return; }
      if (hp.value) { form.reset(); show(MSG.success); return; }

      var btn = form.querySelector('[type=submit]');
      if (btn) btn.disabled = true;
      show(MSG.sending);

      fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          name: name,
          email: email,
          subject: subject,
          message: message,
          language: (window.I18N && window.I18N.lang) || document.documentElement.lang || 'en',
          page: location.href,
          _replyto: email,
          _subject: 'arthemii.com — ' + (subject || 'New message') + ' (' + name + ')',
          _template: 'table',
          _captcha: 'false'
        })
      })
        .then(function (r) { return r.json().catch(function () { return {}; }).then(function (data) { return { ok: r.ok, data: data }; }); })
        .then(function (res) {
          var d = res.data || {};
          var accepted = res.ok && (String(d.success) === 'true' || /activat/i.test(d.message || ''));
          if (!accepted) throw new Error(d.message || 'Request failed');
          form.reset();
          show(MSG.success);
        })
        .catch(function () { show(MSG.error, true); })
        .then(function () { if (btn) btn.disabled = false; });
    });
  });
})();
