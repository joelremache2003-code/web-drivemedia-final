/* ============================================================
   DRIVE MEDIA SAS — main.js v2.0
   ============================================================ */

(function () {
  'use strict';

  /* --- Nav scroll state ----------------------------------- */
  const nav = document.querySelector('.nav');

  function onScroll() {
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* --- Active nav link (match current page) --------------- */
  (function setActiveNavLink() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(function (a) {
      const href = a.getAttribute('href') || '';
      if (href === path || (path === '' && href === 'index.html') ||
          (path === 'index.html' && href === '/')) {
        a.classList.add('active');
      }
    });
  })();

  /* --- Mobile hamburger (full-screen overlay) ------------- */
  const hamburger = document.querySelector('.nav-hamburger');
  const navLinks  = document.querySelector('.nav-links');

  function closeMenu() {
    if (!navLinks) return;
    navLinks.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    const bars = hamburger.querySelectorAll('span');
    bars[0].style.transform = '';
    bars[1].style.opacity   = '';
    bars[2].style.transform = '';
  }

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      const isOpen = navLinks.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';

      const bars = hamburger.querySelectorAll('span');
      if (isOpen) {
        bars[0].style.transform = 'translateY(6px) rotate(45deg)';
        bars[1].style.opacity   = '0';
        bars[2].style.transform = 'translateY(-6px) rotate(-45deg)';
      } else {
        bars[0].style.transform = '';
        bars[1].style.opacity   = '';
        bars[2].style.transform = '';
      }
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navLinks.classList.contains('open')) {
        closeMenu();
      }
    });
  }

  /* --- Scroll reveal -------------------------------------- */
  const revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.10,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('.reveal').forEach(function (el) {
    revealObserver.observe(el);
  });

  /* --- Stagger cards on reveal ---------------------------- */
  const cardObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.card, .blog-card, .principle-card').forEach(function (card) {
          card.classList.add('visible');
        });
        cardObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05 });

  document.querySelectorAll('.services-grid, .blog-grid, .principles-grid').forEach(function (grid) {
    grid.querySelectorAll('.card, .blog-card, .principle-card').forEach(function (card, i) {
      card.classList.add('reveal');
      card.style.transitionDelay = (i * 0.10) + 's';
    });
    cardObserver.observe(grid);
  });

  /* --- Contact form validation ---------------------------- */
  const form = document.querySelector('.contact-form[data-validate]');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      let valid = true;

      // Clear previous errors
      form.querySelectorAll('.form-group').forEach(function (g) {
        g.classList.remove('has-error');
      });

      // Validate required fields
      form.querySelectorAll('[required]').forEach(function (field) {
        if (!field.value.trim()) {
          field.closest('.form-group').classList.add('has-error');
          valid = false;
        }
      });

      // Validate email format
      const emailField = form.querySelector('[type="email"]');
      if (emailField && emailField.value.trim()) {
        const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRe.test(emailField.value.trim())) {
          emailField.closest('.form-group').classList.add('has-error');
          valid = false;
        }
      }

      if (!valid) return;

      var errBanner = document.querySelector('.form-send-error');
      if (errBanner) {
        errBanner.hidden = true;
        errBanner.textContent = '';
      }

      var submitBtn = form.querySelector('[type="submit"]');
      var originalLabel = submitBtn ? submitBtn.textContent : '';

      function showSuccess() {
        form.style.opacity = '0';
        form.style.transition = 'opacity 0.4s';
        setTimeout(function () {
          form.style.display = 'none';
          var success = document.querySelector('.form-success');
          if (success) {
            success.classList.add('visible');
            success.style.animation = 'fadeUp 0.6s var(--ease-out) both';
          }
        }, 400);
      }

      var nombre = form.querySelector('[name="nombre"]');
      var email = form.querySelector('[name="email"]');
      var mensaje = form.querySelector('[name="mensaje"]');
      var empresa = form.querySelector('[name="empresa"]');

      var payload = {
        name: nombre && nombre.value.trim(),
        email: email && email.value.trim(),
        message: mensaje && mensaje.value.trim(),
        empresa: empresa && empresa.value.trim(),
        _subject: 'Contacto — Drive Media (drive-media-web)',
        _replyto: email && email.value.trim(),
        _template: 'table',
        _captcha: false
      };

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando…';
      }

      fetch('https://formsubmit.co/ajax/info@drivemediadj.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(payload)
      })
        .then(function (res) {
          if (!res.ok) throw new Error('Network');
          showSuccess();
        })
        .catch(function () {
          var errEl = document.querySelector('.form-send-error');
          if (errEl) {
            errEl.hidden = false;
            errEl.textContent =
              'No se pudo enviar desde el navegador. Escríbenos a info@drivemediadj.com';
          }
        })
        .finally(function () {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = originalLabel;
          }
        });
    });

    // Live clear error on input
    form.querySelectorAll('.form-input, .form-textarea').forEach(function (field) {
      field.addEventListener('input', function () {
        if (field.value.trim()) {
          field.closest('.form-group').classList.remove('has-error');
        }
      });
    });
  }

})();
