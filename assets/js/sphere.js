/* ============================================================
   DRIVE MEDIA SAS — Three.js Wireframe Icosahedron
   Positioned right-side of music hero. Desktop only.
   ============================================================ */
(function () {
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;
  if (window.innerWidth < 768) return;

  function init() {
    if (typeof THREE === 'undefined') return;

    var hero = document.querySelector('.music-hero');
    if (!hero) return;

    var W = Math.round(window.innerHeight * 0.45);
    var H = W;

    /* --- Scene ------------------------------------------- */
    var scene  = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
    camera.position.z = 3;

    /* --- Renderer ---------------------------------------- */
    var renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0);

    var canvas = renderer.domElement;
    canvas.setAttribute('aria-hidden', 'true');
    canvas.style.cssText =
      'position:absolute;top:50%;right:-5%;transform:translateY(-50%);' +
      'z-index:0;pointer-events:none;opacity:0.12;';

    if (getComputedStyle(hero).position === 'static') {
      hero.style.position = 'relative';
    }
    hero.appendChild(canvas);

    /* --- Geometry & shader material ---------------------- */
    var geometry = new THREE.IcosahedronGeometry(1.2, 4);

    var material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0.0 }
      },
      vertexShader: [
        'uniform float time;',
        'void main() {',
        '  vec3 pos = position;',
        '  float d = sin(pos.x * 3.0 + time) * 0.05',
        '           + sin(pos.y * 2.0 + time * 1.3) * 0.05;',
        '  pos += normal * d;',
        '  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);',
        '}'
      ].join('\n'),
      fragmentShader: [
        'void main() {',
        '  gl_FragColor = vec4(0.537, 0.851, 0.973, 0.15);',
        '}'
      ].join('\n'),
      wireframe:   true,
      transparent: true
    });

    var sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    /* --- Mouse tracking ---------------------------------- */
    var mx = 0, my = 0;
    document.addEventListener('mousemove', function (e) {
      mx = (e.clientX / window.innerWidth  - 0.5) * 0.5;
      my = (e.clientY / window.innerHeight - 0.5) * 0.3;
    });

    /* --- Animation --------------------------------------- */
    var t = 0;

    function animate() {
      requestAnimationFrame(animate);
      t += 0.016;
      sphere.rotation.y += 0.0003 + mx * 0.001;
      sphere.rotation.x += 0.0001 + my * 0.001;
      material.uniforms.time.value = t;
      renderer.render(scene, camera);
    }

    animate();

    /* --- Resize ------------------------------------------ */
    window.addEventListener('resize', function () {
      if (window.innerWidth < 768) {
        canvas.style.display = 'none';
        return;
      }
      var nW = Math.round(window.innerHeight * 0.45);
      renderer.setSize(nW, nW);
    });
  }

  /* Load Three.js if not already present */
  if (typeof THREE !== 'undefined') {
    init();
  } else {
    var s    = document.createElement('script');
    s.src    = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    s.onload = init;
    document.head.appendChild(s);
  }
})();
