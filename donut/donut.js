import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

//Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf3f3f4);

//Camera
const camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 1000);

//Renderer
const renderer = new THREE.WebGLRenderer({ antialiasing: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio * 1.5);

document.body.appendChild(renderer.domElement);

//Load donut
const loader = new GLTFLoader();

let donut = null;

loader.load( 'public/donut/scene.gltf', function (gltf) {
    donut = gltf.scene;

    const radius = 13;
    donut.scale.set(radius, radius, radius);

    donut.rotation.x = Math.PI * 0.1;
    donut.rotation.z = Math.PI * 0.2; 

    scene.add(donut);
 
}, undefined, function (error) {
    console.error(error);
} );

//Orbit controls
const controls = new OrbitControls(camera, renderer.domElement);

camera.position.set(0,0,5);
controls.autoRotate = true;
controls.enablePan = false;
controls.maxDistance = 10;
controls.minDistance = 3.5;

//Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(1, 2, 0);

directionalLight.castShadow = true;
scene.add(directionalLight);

//Animation
const clock = new THREE.Clock(true);

function animate() {
    const deltaTime = clock.getDelta();
    controls.update(deltaTime);

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}
animate();