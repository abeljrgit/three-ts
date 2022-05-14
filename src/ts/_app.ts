import * as THREE from "three";
import { gsap } from "gsap";
import GUI from "lil-gui";
import { BoxGeo } from "./_geometries";

// lil-gui interface
const gui = new GUI();

// Scene
const scene = new THREE.Scene();

// Canvas Dimension Sizes
const canvasSizes = {
  // Canvas size is 100vw and 100vh
  width: window.innerWidth,
  height: window.innerHeight,
};

// Red cube
// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
// const mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh);
const box1 = new BoxGeo(THREE, scene, gui);

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  canvasSizes.width / canvasSizes.height,
  0.1,
  1000
);
scene.add(camera);
camera.position.z = 3;
// gui.add(camera.position, "x");

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: <HTMLCanvasElement>document.querySelector(".webgl"),
  alpha: true,
});
renderer.setSize(canvasSizes.width, canvasSizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Screen Responsiveness
window.addEventListener("resize", () => {
  // Update canvas
  canvasSizes.width = window.innerWidth;
  canvasSizes.height = window.innerHeight;
  // Update camera
  camera.aspect = canvasSizes.width / canvasSizes.height;
  camera.updateProjectionMatrix();
  // Update renderer
  renderer.setSize(canvasSizes.width, canvasSizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// GSAP Implementation
// No need to use infiniteFrameRequest since GSAP has its own.
// gsap.to(mesh.position, { x: 2, duration: 2, delay: 3 });

// Clock, Three.JS built-in timer
const clock = new THREE.Clock();
// Infinitely Request Frame
const infiniteFrameRequest = () => {
  // elapsedTime: Used this variable to adapt the animation with framerate
  const elapsedTime = clock.getElapsedTime();

  // mesh.position.y = Math.cos(elapsedTime);
  // mesh.position.x = Math.sin(elapsedTime);

  // Calling renderer and infiniteFrameFequest
  renderer.render(scene, camera);
  window.requestAnimationFrame(infiniteFrameRequest);
};
infiniteFrameRequest();
