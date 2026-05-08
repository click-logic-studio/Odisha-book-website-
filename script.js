// --- 3D Background (Floating Particles & Geometry) ---
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#bg-canvas'), antialias: true });

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

// Add a glowing 3D Ring
const geometry = new THREE.TorusGeometry(12, 0.2, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xf3a61c, emissive: 0xf3a61c, emissiveIntensity: 0.5 });
const ring = new THREE.Mesh(geometry, material);
scene.add(ring);

// Random Stars
function addStar() {
    const geo = new THREE.SphereGeometry(0.1, 24, 24);
    const mat = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const star = new THREE.Mesh(geo, mat);
    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
    star.position.set(x, y, z);
    scene.add(star);
}
Array(200).fill().forEach(addStar);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(10, 10, 10);
scene.add(ambientLight, pointLight);

function animate() {
    requestAnimationFrame(animate);
    ring.rotation.x += 0.005;
    ring.rotation.y += 0.002;
    renderer.render(scene, camera);
}
animate();

// --- Language Switching Logic ---
function switchLang(lang) {
    document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    const translatable = document.querySelectorAll('[data-en]');
    translatable.forEach(el => {
        el.innerText = el.getAttribute(`data-${lang}`);
    });
}

// Handle Window Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
