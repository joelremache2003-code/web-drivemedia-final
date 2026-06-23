/* =====================================================================
   DRIVE ERP — interacciones
   ===================================================================== */
(function () {
  'use strict';

  var CONTENT = null;

  /* ---------- 1. Content loader (Fase 2-ready) ---------- */
  function getPath(obj, path) {
    return path.split('.').reduce(function (o, k) {
      return (o == null) ? undefined : o[k];
    }, obj);
  }

  function applyContent(data) {
    document.querySelectorAll('[data-content]').forEach(function (el) {
      var v = getPath(data, el.getAttribute('data-content'));
      if (v != null) el.textContent = v;
    });
    document.querySelectorAll('[data-content-html]').forEach(function (el) {
      var v = getPath(data, el.getAttribute('data-content-html'));
      if (v != null) el.innerHTML = v;
    });
    document.querySelectorAll('[data-content-src]').forEach(function (el) {
      var v = getPath(data, el.getAttribute('data-content-src'));
      if (v) el.setAttribute('src', v);
    });
    document.querySelectorAll('[data-content-href]').forEach(function (el) {
      var v = getPath(data, el.getAttribute('data-content-href'));
      if (v) el.setAttribute('href', v);
    });
    // Brand wordmark (two-tone) desde meta.productName
    var pn = getPath(data, 'meta.productName');
    if (pn) {
      var parts = pn.trim().split(/\s+/);
      var first = parts.shift();
      var rest = parts.join(' ');
      var html = first + (rest ? '<span class="nav-word-accent"> ' + rest + '</span>' : '');
      document.querySelectorAll('[data-brand]').forEach(function (el) { el.innerHTML = html; });
    }
  }

  function loadContent() {
    return fetch('content.json', { cache: 'no-cache' })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (data) {
        if (data) { CONTENT = data; applyContent(data); }
      })
      .catch(function () { /* se quedan los textos por defecto del HTML */ });
  }

  /* ---------- 2. Nav: scroll state ---------- */
  function initNavScroll() {
    var nav = document.querySelector('.nav');
    if (!nav) return;
    var onScroll = function () {
      if (window.scrollY > 20) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- 3. Mobile menu ---------- */
  function initMenu() {
    var burger = document.querySelector('.nav-burger');
    var overlay = document.querySelector('.nav-overlay');
    if (!burger || !overlay) return;

    function close() {
      document.body.classList.remove('menu-open');
      document.body.style.overflow = '';
      burger.setAttribute('aria-expanded', 'false');
    }
    function toggle() {
      var open = document.body.classList.toggle('menu-open');
      document.body.style.overflow = open ? 'hidden' : '';
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    }

    burger.addEventListener('click', toggle);
    overlay.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', close);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') close();
    });
  }

  /* ---------- 4. Reveal on scroll ---------- */
  function initReveal() {
    var els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window) || !els.length) {
      els.forEach(function (el) { el.classList.add('in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------- 5. "Cómo funciona" stepper ---------- */
  function initHowStepper() {
    var steps = Array.prototype.slice.call(document.querySelectorAll('.how-step'));
    var visuals = Array.prototype.slice.call(document.querySelectorAll('.how-visual'));
    if (!steps.length || !visuals.length || !('IntersectionObserver' in window)) return;

    function setActive(idx) {
      steps.forEach(function (s, i) { s.classList.toggle('is-active', i === idx); });
      visuals.forEach(function (v, i) { v.classList.toggle('is-active', i === idx); });
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var idx = parseInt(entry.target.getAttribute('data-step'), 10);
          if (!isNaN(idx)) setActive(idx);
        }
      });
    }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });

    steps.forEach(function (s) { io.observe(s); });
  }

  /* ---------- 6. Hero / CTA parallax (GSAP opcional) ---------- */
  function initParallax() {
    if (!window.gsap || !window.ScrollTrigger) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray('.hero-emblem, .discta-emblem').forEach(function (el) {
      gsap.to(el, {
        yPercent: 14, ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 1 }
      });
    });
  }

  /* ---------- 7. Contact form (FormSubmit) ---------- */
  function initForm() {
    var form = document.getElementById('erp-form');
    if (!form) return;
    var success = document.querySelector('.form-success');
    var btn = form.querySelector('button[type="submit"]');
    var btnLabel = btn ? btn.querySelector('span:first-child') : null;
    var defaultLabel = btnLabel ? btnLabel.textContent : 'Enviar';

    function setError(name, on) {
      var input = form.querySelector('[name="' + name + '"]');
      if (input && input.closest('.field')) input.closest('.field').classList.toggle('error', on);
    }

    form.addEventListener('input', function (e) {
      if (e.target.closest('.field')) e.target.closest('.field').classList.remove('error');
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = {
        name: form.name.value.trim(),
        email: form.email.value.trim(),
        empresa: form.empresa.value.trim(),
        message: form.message.value.trim()
      };

      var ok = true;
      if (!data.name) { setError('name', true); ok = false; }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) { setError('email', true); ok = false; }
      if (!data.message) { setError('message', true); ok = false; }
      if (!ok) return;

      var email = (CONTENT && CONTENT.contact && CONTENT.contact.email) || 'info@drivemediadj.com';
      var endpoint = 'https://formsubmit.co/ajax/' + encodeURIComponent(email);

      if (btnLabel) btnLabel.textContent = 'Enviando…';
      if (btn) btn.disabled = true;

      fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          empresa: data.empresa || '—',
          message: data.message,
          _subject: 'Nuevo lead Drive ERP — ' + data.name,
          _template: 'table',
          _captcha: 'false'
        })
      })
        .then(function (r) {
          if (!r.ok) throw new Error('bad response');
          if (success) { form.setAttribute('hidden', ''); success.removeAttribute('hidden'); }
        })
        .catch(function () {
          if (btnLabel) btnLabel.textContent = 'Reintentar';
          if (btn) btn.disabled = false;
          showFormError(form, email);
        });
    });
  }

  function showFormError(form, email) {
    var existing = form.querySelector('.form-error-msg');
    if (existing) return;
    var p = document.createElement('p');
    p.className = 'form-error-msg form-note';
    p.style.color = '#ff8a8a';
    p.textContent = 'No se pudo enviar. Escríbenos directamente a ' + email;
    form.appendChild(p);
  }

  /* ---------- init ---------- */
  function init() {
    loadContent();
    initNavScroll();
    initMenu();
    initReveal();
    initHowStepper();
    initParallax();
    initForm();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
