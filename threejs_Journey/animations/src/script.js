import "./style.css";
import * as THREE from "three";
import gsap from "gsap";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Sizes
const sizes = {
  width: 800,
  height: 600,
};

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

gsap.to(mesh.position, { x: 2, duration: 1, delay: 1 });
gsap.to(mesh.position, { x: -2, duration: 1, delay: 4 });
// let time = new Date();
// const clock = new THREE.Clock();
//Animations
const tick = () => {
  //   mesh.scale.set(0.5, 1, 1);
  //   const elapsed = clock.getElapsedTime();
  //TIMER
  //   const currentTime = new Date();
  //   const delta = currentTime - time;
  //   time = currentTime;
  //   console.log(delta);
  //   mesh.rotation.x += 0.01;
  //   camera.position.y = Math.sin(elapsed);
  //   camera.position.x = Math.cos(elapsed);
  //   camera.lookAt(mesh.position);
  //   mesh.position.x = Math.tan(elapsed);
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
