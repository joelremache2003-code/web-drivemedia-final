/* ============================================================
   DRIVE MEDIA SAS — premium.js v1.0
   Micro-animations: Magnetic Buttons, Text Scramble,
   Stat Counters, Parallax, Ticker, Noise Overlay
   ============================================================ */

(function () {
  'use strict';

  // Register GSAP plugins
  if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  /* ── 1. GSAP ENTRANCE ANIMATIONS ───────────────────────── */
  function initGSAP() {
    if (typeof gsap === 'undefined') return;

    // Hero entrance
    const tl = gsap.timeline();
    tl.from('.hero-title', { opacity: 0, y: 40, duration: 1, ease: 'expo.out' }, 0.2)
      .from('.hero-tagline', { opacity: 0, y: 20, duration: 0.8, ease: 'expo.out' }, 0.5)
      .from('.hero-description', { opacity: 0, y: 20, duration: 0.8, ease: 'expo.out' }, 0.6)
      .from('.hero-cta', { opacity: 0, y: 20, duration: 0.8, ease: 'expo.out' }, 0.7);

    // Scroll trigger for sections
    document.querySelectorAll('.reveal').forEach(el => {
      gsap.to(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          onEnter: () => el.classList.add('visible')
        }
      });
    });
  }

    // Hero 3D Asset Parallax & Float
    if (document.querySelector('.hero-3d-asset')) {
      gsap.to('.hero-3d-asset', {
        y: -30,
        rotation: 3,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
      });

      window.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 40;
        const y = (e.clientY / window.innerHeight - 0.5) * 40;
        gsap.to('.hero-3d-asset', { x: x, y: y, duration: 1, ease: 'power2.out' });
      });
    }
  }
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789·—';

  function scrambleText(el, finalText, duration) {
    if (!el || !finalText) return;
    let frame = 0;
    const totalFrames = Math.round((duration || 900) / 16);
    const len = finalText.length;

    const tick = function () {
      let output = '';
      for (let i = 0; i < len; i++) {
        if (frame / totalFrames > i / len) {
          output += finalText[i];
        } else {
          output += chars[Math.floor(Math.random() * chars.length)];
        }
      }
      el.textContent = output;
      frame++;
      if (frame <= totalFrames) requestAnimationFrame(tick);
      else el.textContent = finalText;
    };
    requestAnimationFrame(tick);
  }

  // Fire scramble on hero title once
  window.addEventListener('DOMContentLoaded', function () {
    const heroTitle = document.querySelector('.hero-title[data-scramble]');
    if (heroTitle) {
      const original = heroTitle.textContent.trim();
      setTimeout(function () { scrambleText(heroTitle, original, 1200); }, 400);
    }
  });


  /* ── 2. ANIMATED STAT COUNTERS ─────────────────────────── */
  function easeOutQuart(t) { return 1 - Math.pow(1 - t, 4); }

  function animateCounter(el) {
    const target = parseFloat(el.getAttribute('data-count')) || 0;
    const suffix = el.getAttribute('data-suffix') || '';
    const prefix = el.getAttribute('data-prefix') || '';
    const duration = parseInt(el.getAttribute('data-duration'), 10) || 1800;
    const start = performance.now();

    const update = function (now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const value = Math.round(easeOutQuart(progress) * target);
      el.textContent = prefix + value + suffix;
      if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  }

  const counterObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('[data-count]').forEach(function (el) {
    counterObserver.observe(el);
  });


  /* ── 3. MAGNETIC BUTTONS ───────────────────────────────── */
  function initMagneticButtons() {
    document.querySelectorAll('.btn-primary, .btn-secondary, .btn-magnetic').forEach(function (btn) {
      var strength = parseFloat(btn.getAttribute('data-magnetic')) || 0.35;

      btn.addEventListener('mousemove', function (e) {
        var rect = btn.getBoundingClientRect();
        var cx = rect.left + rect.width / 2;
        var cy = rect.top + rect.height / 2;
        var dx = (e.clientX - cx) * strength;
        var dy = (e.clientY - cy) * strength;
        btn.style.transform = 'translate(' + dx + 'px, ' + dy + 'px)';
      });

      btn.addEventListener('mouseleave', function () {
        btn.style.transform = '';
        btn.style.transition = 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1)';
        setTimeout(function () { btn.style.transition = ''; }, 500);
      });
    });
  }

  window.addEventListener('DOMContentLoaded', initMagneticButtons);


  /* ── 4. HERO PARALLAX ──────────────────────────────────── */
  var heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    window.addEventListener('scroll', function () {
      var scrollY = window.scrollY;
      heroBg.style.transform = 'translateY(' + (scrollY * 0.25) + 'px)';
    }, { passive: true });
  }


  /* ── 5. HORIZONTAL TICKER ──────────────────────────────── */
  function initTicker() {
    var tracks = document.querySelectorAll('.ticker-track');
    tracks.forEach(function (track) {
      // Duplicate content for seamless loop
      var inner = track.querySelector('.ticker-inner');
      if (!inner) return;
      inner.innerHTML += inner.innerHTML;
    });
  }

  window.addEventListener('DOMContentLoaded', initTicker);


  /* ── 6. GLOWING NAV INDICATOR ──────────────────────────── */
  function initNavIndicator() {
    var activeLink = document.querySelector('.nav-links a.active');
    if (!activeLink) return;
    var indicator = document.createElement('span');
    indicator.className = 'nav-active-indicator';
    activeLink.appendChild(indicator);
  }

  window.addEventListener('DOMContentLoaded', initNavIndicator);


  /* ── 7. QUITO CLOCK ────────────────────────────────────── */
  function initQuitoClock() {
    var el = document.getElementById('quito-clock');
    if (!el) return;

    function update() {
      var now = new Date();
      var quito = new Date(now.toLocaleString('en-US', { timeZone: 'America/Guayaquil' }));
      var h = quito.getHours().toString().padStart(2, '0');
      var m = quito.getMinutes().toString().padStart(2, '0');
      el.textContent = 'QTO ' + h + ':' + m;
    }

    update();
    setInterval(update, 30000);
  }

  window.addEventListener('DOMContentLoaded', initQuitoClock);


  /* ── 8. CARD TILT (subtle 3D on hover) ─────────────────── */
  function initCardTilt() {
    document.querySelectorAll('.card-tilt').forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var rect = card.getBoundingClientRect();
        var xRel = (e.clientX - rect.left) / rect.width - 0.5;
        var yRel = (e.clientY - rect.top) / rect.height - 0.5;
        var rotX = -(yRel * 8);
        var rotY = xRel * 8;
        card.style.transform = 'perspective(800px) rotateX(' + rotX + 'deg) rotateY(' + rotY + 'deg) translateZ(4px)';
      });
      card.addEventListener('mouseleave', function () {
        card.style.transform = '';
        card.style.transition = 'transform 0.6s cubic-bezier(0.34,1.56,0.64,1)';
        setTimeout(function () { card.style.transition = ''; }, 600);
      });
    });
  }

  window.addEventListener('DOMContentLoaded', initCardTilt);


  /* ── 9. SECTION ENTRANCE — stagger children ─────────────── */
  var staggerObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var children = entry.target.querySelectorAll('.stagger-child');
        children.forEach(function (child, i) {
          setTimeout(function () {
            child.classList.add('stagger-visible');
          }, i * 80);
        });
        staggerObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.stagger-parent').forEach(function (el) {
    staggerObserver.observe(el);
  });


  /* ── 10. WAVEFORM ANIMATION (Soundstage & Music) ───────── */
  function initWaveform() {
    const containers = document.querySelectorAll('#hero-waveform, .waveform-container');
    
    containers.forEach(container => {
      if (!container.innerHTML.trim()) {
        for (let i = 0; i < 40; i++) {
          const bar = document.createElement('div');
          bar.className = 'waveform-bar';
          container.appendChild(bar);
        }
      }
    });

    document.querySelectorAll('.waveform-bar').forEach(function (bar, i) {
      var delay = (i * 0.05) % 1;
      var duration = 0.5 + Math.random() * 1.5;
      bar.style.animation = `wave ${duration}s ease-in-out ${delay}s infinite alternate`;
    });
  }

  // Add the CSS animation dynamically if not in styles.css
  const style = document.createElement('style');
  style.textContent = `
    .waveform-container {
      display: flex;
      align-items: center;
      gap: 4px;
      height: 60px;
    }
    .waveform-bar {
      width: 3px;
      height: 10px;
      background: var(--dm-acid);
      border-radius: 2px;
      opacity: 0.6;
    }
    @keyframes wave {
      0% { height: 10px; opacity: 0.3; }
      100% { height: 60px; opacity: 1; }
    }
  `;
  document.head.appendChild(style);

  window.addEventListener('DOMContentLoaded', initWaveform);


  /* ── 11. PRESS KIT COMING SOON EFFECT ───────────────────── */
  function initPressKitSoon() {
    var badge = document.querySelector('.presskit-soon-badge');
    if (!badge) return;
    badge.addEventListener('click', function () {
      badge.textContent = 'Próximamente →';
      badge.style.transform = 'scale(1.04)';
      setTimeout(function () { badge.style.transform = ''; }, 300);
    });
  }

  window.addEventListener('DOMContentLoaded', initPressKitSoon);

})();
