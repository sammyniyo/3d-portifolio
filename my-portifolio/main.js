import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Set up scene
const scene = new THREE.Scene();

// Set up camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 30);

// Set up renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// Create torus geometry and material
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xFF6347 });
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

// Create point light
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

// Create ambient light
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

// Add light helper
const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);

// Add stars
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff }); 
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z); // Ensure correct positioning
  scene.add(star);
}
//sam box texture
const samTexture = new THREE.TextureLoader().load('sam.jpeg');

const sam = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial({map: samTexture})
);
scene.add(sam);


//moon

const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture
  })
);
scene.add(moon);


// Call addStar function to add stars to the scene
Array(200).fill().forEach(addStar);


const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

// Add orbit controls
const controls = new OrbitControls(camera, renderer.domElement);

moon.position.z = 30;
moon.position.setX(-10);


function moveCamera(){
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.0075;
  moon.rotation.z += 0.05;

  sam.rotation.y += 0.01;
  sam.rotation.z += 0.01;


  camera.position.z = t;

  camera.rotation.x = t * -0.01;
  camera.rotation.y = t * -0.0002;
  camera.rotation.z = t * -0.0002;

}
document.body.onscroll = moveCamera

// Render function
function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;
  controls.update();

  renderer.render(scene, camera);
}

animate();



