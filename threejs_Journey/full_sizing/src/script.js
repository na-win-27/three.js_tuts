import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// CommonJS:
const dat = require("dat.gui");

const gui = new dat.GUI();

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1, 4, 4, 4);
// const geometry = new THREE.Geometry();
// const vertex1 = new THREE.Vector3(0, 0, 0);
// geometry.vertices.push(vertex1);

// const vertex2 = new THREE.Vector3(0, 1, 0);
// geometry.vertices.push(vertex2);

// const vertex3 = new THREE.Vector3(1, 0, 0);
// geometry.vertices.push(vertex3);

// const face = new THREE.Face3(0, 1, 2);
// geometry.faces.push(face);

// for (let i = 0; i < 50; i++) {
//   for (let j = 0; j < 3; j++) {
//     geometry.vertices.push(
//       new THREE.Vector3(
//         (Math.random() - 0.5) * 4,
//         (Math.random() - 0.5) * 4,
//         (Math.random() - 0.5) * 4
//       )
//     );
//   }
//   const vi = i * 3;
//   geometry.faces.push(new THREE.Face3(vi, vi + 1, vi + 2));
// }

const material = new THREE.MeshBasicMaterial({
  color: 0xff0000,
  wireframe: true,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
gui.add(mesh.position, "y", -2, 2, 0.001);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", (event) => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  camera.aspect = sizes.width / sizes.height;
  renderer.setSize(sizes.width, sizes.height);
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 3;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

window.addEventListener("dblclick", () => {
  if (!document.fullscreenElement) {
    canvas.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});
/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
