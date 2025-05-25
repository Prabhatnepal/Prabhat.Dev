import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/0.174.0/three.module.js';
import { FontLoader } from 'https://cdn.jsdelivr.net/npm/three@0.176.0/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'https://cdn.jsdelivr.net/npm/three@0.176.0/examples/jsm/geometries/TextGeometry.js';

const container = document.getElementById('canvas');
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(100, -20, 200); // Centered camera position

// Renderer setup
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x6b73ff, 1); // Set background 
container.appendChild(renderer.domElement);

// Add ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
scene.add(ambientLight);

// Add directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(0, 1, 1);
scene.add(directionalLight);

// Load font and create text
let textMesh; // Declare it here
const fontLoader = new FontLoader();
fontLoader.load(
    'https://cdn.jsdelivr.net/npm/three@0.152.2/examples/fonts/helvetiker_regular.typeface.json',
    function (font) {
        const textGeometry = new TextGeometry('Prabhat Nepal', {
            font: font,
            size: 10,
            height: 3,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 0.3,
            bevelSize: 0.3,
            bevelOffset: 0,
            bevelSegments: 5,
        });

        // Center text geometry
        textGeometry.computeBoundingBox();
        const centerOffset = -0.5 * (textGeometry.boundingBox.max.x + textGeometry.boundingBox.min.x);
        const material = new THREE.MeshPhongMaterial({
            color: 0xff4081,
            shininess: 100,
            specular: 0xffffff,
        });
        textMesh = new THREE.Mesh(textGeometry, material);
        textMesh.position.x = centerOffset; // Center the text horizontally
        textMesh.position.y = 0; // Center the text vertically
        textMesh.position.z = 0; // Position in the scene
        scene.add(textMesh);
        animate();
    },
    undefined,
    function (error) {
        console.error('An error occurred while loading the font:', error);
    }
);

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

// Handle Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Mouse movement tilt functionality
window.addEventListener('mousemove', (event) => {
    // Get mouse position in normalized device coordinates (-1 to +1)
    const mouseX = (event.clientX / window.innerWidth) * 2 - 1; // Normalize to -1 to 1

    // Adjust text rotation based on mouse position
    if (textMesh) {
        textMesh.rotation.y = mouseX * Math.PI / 4; // Tilt left/right based on mouse position
    }
});
