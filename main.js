import './src/index.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';
import { initParticles } from './Partical';

const canvas = document.getElementById("threeCanvas");

const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.set(0, 0, 120);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 60;
controls.maxDistance = 200;

const light = new THREE.DirectionalLight(0xffffff, 1.2);
light.position.set(100, 100, 100);
scene.add(light);

const loader = new SVGLoader();
let logoGroup; 

loader.load("/assets/Logo/letter-R2.svg", (data) => {

    const group = new THREE.Group();

    data.paths.forEach((path) => {
        const material = new THREE.MeshPhongMaterial({
            color: 0xffffff,
            side: THREE.DoubleSide,
            depthWrite: true
        });

        const shapes = path.toShapes(true);

        shapes.forEach((shape) => {
            const geometry = new THREE.ExtrudeGeometry(shape, {
                depth: 10,
                bevelEnabled: false
            });
            const mesh = new THREE.Mesh(geometry, material);
            group.add(mesh);
        });
    });

    const LOGO_SCALE = 0.2;
    group.scale.set(LOGO_SCALE, -LOGO_SCALE, LOGO_SCALE);

    const box = new THREE.Box3().setFromObject(group);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    group.position.sub(center); 

    
    function updateLogoPosition() {
        const isMobile = window.innerWidth < 768;

        if (isMobile) {
            group.position.x = -50;       
            group.position.y = 60;       
            group.scale.set(0.12, -0.12, 0.12); 
        } else {
            group.position.x = 10;     
            group.position.y = 70;      
            group.scale.set(LOGO_SCALE, -LOGO_SCALE, LOGO_SCALE);
        }
    }

    updateLogoPosition(); 
    window.addEventListener("resize", updateLogoPosition);

   
    const maxDim = Math.max(size.x, size.y, size.z);
    const fov = camera.fov * (Math.PI / 180);
    const cameraZ = Math.abs(maxDim / (2 * Math.tan(fov / 2)));
    camera.position.set(0, 0, cameraZ * 1.8);

    controls.target.set(0, 0, 0);
    controls.update();

    scene.add(group);
    logoGroup = group; 
});

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();

window.addEventListener("resize", () => {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height, false);
});

initParticles({
    container: document.getElementById("particles-bg"),
    particleCount: 200,
    particleSpread: 10,
    speed: 0.1,
    particleColors: ["#ffffff"],
    particleBaseSize: 30
});
