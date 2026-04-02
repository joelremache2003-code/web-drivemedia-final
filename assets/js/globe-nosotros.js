/**
 * Globo COBE — Quito con pulso neón (paleta Drive Media: cromado + ácido + cyan).
 * Carga cobe vía ESM (+esm); onRender devuelve markers animados.
 */
import createGlobe from 'https://cdn.jsdelivr.net/npm/cobe@0.6.3/+esm';

var QUITO = [-1.8312, -78.1834];

function init() {
  var canvas = document.getElementById('globe-canvas');
  if (!canvas) return;

  var stage = canvas.closest('.globe-stage-inner');
  var phi = 2.05;
  var rotating = true;
  var pulseT = 0;

  function diameter() {
    if (!stage) return 420;
    var w = stage.clientWidth;
    return Math.min(680, Math.max(280, Math.floor(w)));
  }

  function syncCanvasSize() {
    var d = diameter();
    canvas.width = d;
    canvas.height = d;
  }

  syncCanvasSize();

  createGlobe(canvas, {
    devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
    width: canvas.width,
    height: canvas.height,
    phi: phi,
    theta: 0.32,
    dark: 1,
    diffuse: 1.42,
    mapSamples: 26000,
    mapBrightness: 1.08,
    mapBaseBrightness: 0.12,
    baseColor: [0.2, 0.21, 0.26],
    markerColor: [0.812, 0.992, 0.059],
    glowColor: [0.45, 0.84, 0.98],
    markers: [
      { location: QUITO, size: 0.065 },
      { location: QUITO, size: 0.12 }
    ],
    onRender: function () {
      pulseT += 0.038;
      var core = 0.048 + Math.sin(pulseT * 1.15) * 0.028;
      var ring = 0.1 + Math.sin(pulseT * 1.15 + 0.65) * 0.055;
      if (rotating) phi += 0.0031;
      return {
        width: canvas.width,
        height: canvas.height,
        phi: phi,
        markers: [
          { location: QUITO, size: core },
          { location: QUITO, size: ring }
        ]
      };
    }
  });

  canvas.addEventListener('mouseenter', function () {
    rotating = false;
  });
  canvas.addEventListener('mouseleave', function () {
    rotating = true;
  });
  canvas.addEventListener(
    'touchstart',
    function () {
      rotating = false;
    },
    { passive: true }
  );
  canvas.addEventListener('touchend', function () {
    rotating = true;
  });

  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(syncCanvasSize, 100);
  });
}

init();
