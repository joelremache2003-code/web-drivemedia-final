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

      // Success state
      form.style.opacity = '0';
      form.style.transition = 'opacity 0.4s';
      setTimeout(function () {
        form.style.display = 'none';
        const success = document.querySelector('.form-success');
        if (success) {
          success.classList.add('visible');
          success.style.animation = 'fadeUp 0.6s var(--ease-out) both';
        }
      }, 400);
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
