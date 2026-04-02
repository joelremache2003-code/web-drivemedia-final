/* ============================================================
   DRIVE MEDIA SAS — Three.js Dotted Wave Background
   Loads on desktop only (width >= 768). Requires Three.js.
   ============================================================ */
(function () {
  if (window.innerWidth < 768) return;

  var AMOUNTX    = 40;
  var AMOUNTY    = 60;
  var SEPARATION = 150;

  function init() {
    if (typeof THREE === 'undefined') return;

    /* --- Renderer ---------------------------------------- */
    var renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    var canvas    = renderer.domElement;
    canvas.id     = 'wave-canvas';
    canvas.setAttribute('aria-hidden', 'true');
    document.body.insertBefore(canvas, document.body.firstChild);

    /* Make body transparent so the fixed canvas shows through */
    document.body.style.background = 'transparent';

    /* --- Scene & Camera ---------------------------------- */
    var scene  = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.set(0, 355, 1220);

    /* --- Particle grid ----------------------------------- */
    var numPts    = AMOUNTX * AMOUNTY;
    var positions = new Float32Array(numPts * 3);
    var i = 0;

    for (var ix = 0; ix < AMOUNTX; ix++) {
      for (var iy = 0; iy < AMOUNTY; iy++) {
        positions[i]     = ix * SEPARATION - ((AMOUNTX * SEPARATION) / 2);
        positions[i + 1] = 0;
        positions[i + 2] = iy * SEPARATION - ((AMOUNTY * SEPARATION) / 2);
        i += 3;
      }
    }

    var geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    var material = new THREE.PointsMaterial({
      color:          0x89D9F8,
      size:           4,
      transparent:    true,
      opacity:        0.35,
      sizeAttenuation: true
    });

    var particles  = new THREE.Points(geometry, material);
    scene.add(particles);

    var posAttr = particles.geometry.attributes.position;

    /* --- Animation loop ---------------------------------- */
    var count = 0;

    function animate() {
      requestAnimationFrame(animate);

      i = 0;
      for (var ix = 0; ix < AMOUNTX; ix++) {
        for (var iy = 0; iy < AMOUNTY; iy++) {
          posAttr.array[i + 1] =
            Math.sin((ix + count) * 0.3) * 50 +
            Math.sin((iy + count) * 0.5) * 50;
          i += 3;
        }
      }
      posAttr.needsUpdate = true;
      count += 0.08;

      renderer.render(scene, camera);
    }

    animate();

    /* --- Resize ------------------------------------------ */
    window.addEventListener('resize', function () {
      if (window.innerWidth < 768) {
        canvas.style.display = 'none';
        return;
      }
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  /* Load Three.js from CDN then initialise */
  if (typeof THREE !== 'undefined') {
    init();
  } else {
    var s   = document.createElement('script');
    s.src   = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    s.onload = init;
    document.head.appendChild(s);
  }
})();
