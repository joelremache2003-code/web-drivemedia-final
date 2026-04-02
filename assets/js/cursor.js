/* ============================================================
   DRIVE MEDIA SAS — cursor.js
   Custom cursor dot + canvas trail. No libraries.
   Disabled on touch devices.
   ============================================================ */

(function () {
  'use strict';

  /* --- Touch device: do nothing, restore default cursor ---- */
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
    document.documentElement.style.cursor = '';
    return;
  }

  /* --- Dot ------------------------------------------------- */
  var dot = document.createElement('div');
  dot.setAttribute('aria-hidden', 'true');
  dot.style.cssText = [
    'position:fixed',
    'width:6px',
    'height:6px',
    'background:#CFFD0F',
    'border-radius:50%',
    'pointer-events:none',
    'z-index:10000',
    'left:-20px',
    'top:-20px',
    'transform:translate(-50%,-50%)',
    'transition:opacity 0.15s',
    'will-change:left,top'
  ].join(';');
  document.body.appendChild(dot);

  /* --- Canvas --------------------------------------------- */
  var canvas = document.createElement('canvas');
  canvas.setAttribute('aria-hidden', 'true');
  canvas.style.cssText = [
    'position:fixed',
    'top:0',
    'left:0',
    'pointer-events:none',
    'z-index:9999',
    'will-change:transform'
  ].join(';');
  document.body.appendChild(canvas);

  var ctx = canvas.getContext('2d');

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  /* --- State ----------------------------------------------- */
  var mouseX   = -100;
  var mouseY   = -100;
  var prevX    = -100;
  var prevY    = -100;
  var segments = [];   // { x1, y1, x2, y2, life }
  var dotVisible = true;

  /* --- Mouse tracking ------------------------------------- */
  document.addEventListener('mousemove', function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;

    dot.style.left = mouseX + 'px';
    dot.style.top  = mouseY + 'px';

    if (prevX > -50) {
      segments.push({
        x1:   prevX,
        y1:   prevY,
        x2:   mouseX,
        y2:   mouseY,
        life: 1.0
      });
    }

    prevX = mouseX;
    prevY = mouseY;
  }, { passive: true });

  document.addEventListener('mouseleave', function () {
    dot.style.opacity = '0';
    dotVisible = false;
  });

  document.addEventListener('mouseenter', function () {
    dot.style.opacity = '1';
    dotVisible = true;
  });

  /* --- Dot scale on interactive elements ------------------ */
  document.addEventListener('mouseover', function (e) {
    var el = e.target;
    if (!el) return;
    var tag = el.tagName ? el.tagName.toLowerCase() : '';
    var isClickable = (
      tag === 'a' || tag === 'button' || tag === 'input' ||
      tag === 'textarea' || tag === 'select' || tag === 'label' ||
      el.getAttribute('role') === 'button' ||
      el.classList.contains('filter-pill') ||
      el.classList.contains('btn-primary') ||
      el.classList.contains('btn-secondary')
    );
    if (isClickable) {
      dot.style.width          = '10px';
      dot.style.height         = '10px';
      dot.style.background     = '#CFFD0F';
      dot.style.mixBlendMode   = 'difference';
    }
  });

  document.addEventListener('mouseout', function (e) {
    dot.style.width        = '6px';
    dot.style.height       = '6px';
    dot.style.mixBlendMode = '';
  });

  /* --- Animation loop ------------------------------------- */
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = segments.length - 1; i >= 0; i--) {
      var seg = segments[i];
      seg.life *= 0.88;

      if (seg.life < 0.008) {
        segments.splice(i, 1);
        continue;
      }

      ctx.beginPath();
      ctx.moveTo(seg.x1, seg.y1);
      ctx.lineTo(seg.x2, seg.y2);
      ctx.strokeStyle = 'rgba(207,253,15,' + seg.life.toFixed(3) + ')';
      ctx.lineWidth   = 1.5;
      ctx.lineCap     = 'round';
      ctx.stroke();
    }

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);

})();
