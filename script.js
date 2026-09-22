/* =========================================================
   DigitWorld - Skripta
   ========================================================= */

/* ===== 1. DIGITALNO OZADJE S KODAMI ===== */
function createDigitalBackground() {
    const digitalBg = document.getElementById('digital-bg');
    if (!digitalBg) return;

    const characters = '0101011010101010101010101010101010101010101010101010101010101010{}[]()<>;:=+-*/&|^%#@!~';

    for (let i = 0; i < 50; i++) {
        const codeLine = document.createElement('div');
        codeLine.className = 'code-line';
        codeLine.style.left = (Math.random() * 100) + '%';
        codeLine.style.animationDelay = (Math.random() * 20) + 's';
        codeLine.style.animationDuration = (15 + Math.random() * 15) + 's';

        let content = '';
        const length = 10 + Math.floor(Math.random() * 20);
        for (let j = 0; j < length; j++) {
            content += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        codeLine.textContent = content;
        digitalBg.appendChild(codeLine);
    }
}

/* ===== 2. WEBGL OZADJE Z DELCI ===== */
function initBackground() {
    const container = document.getElementById('webgl-bg');
    if (!container || typeof THREE === 'undefined') return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2500;
    const posArray = new Float32Array(particlesCount * 3);
    const colorArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i += 3) {
        posArray[i]     = (Math.random() - 0.5) * 100;
        posArray[i + 1] = (Math.random() - 0.5) * 100;
        posArray[i + 2] = (Math.random() - 0.5) * 100;

        colorArray[i]     = Math.random() * 0.4;
        colorArray[i + 1] = Math.random() * 0.6 + 0.4;
        colorArray[i + 2] = Math.random() * 0.4 + 0.6;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.15,
        vertexColors: true,
        transparent: true,
        opacity: 0.8
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    camera.position.z = 5;

    function animate() {
        requestAnimationFrame(animate);
        particlesMesh.rotation.x += 0.0002;
        particlesMesh.rotation.y += 0.0003;
        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

/* ===== 3. WEBGL HOLOGRAMSKA ANIMACIJA ===== */
function initHologram() {
    const container = document.getElementById('hologram-1');
    if (!container || typeof THREE === 'undefined') return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Svetloba
    scene.add(new THREE.AmbientLight(0x0066ff, 0.6));

    const directionalLight = new THREE.DirectionalLight(0x00ccff, 1.2);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0x00f2ff, 2, 20);
    pointLight.position.set(-3, 3, 3);
    scene.add(pointLight);

    // Glavni hologram
    const geometry = new THREE.IcosahedronGeometry(2, 1);
    const material = new THREE.MeshPhongMaterial({
        color: 0x0066ff,
        emissive: 0x003366,
        specular: 0x00ccff,
        shininess: 100,
        transparent: true,
        opacity: 0.7
    });

    const hologram = new THREE.Mesh(geometry, material);
    scene.add(hologram);

    // Wireframe obroč
    const wireframeGeo = new THREE.IcosahedronGeometry(2.4, 1);
    const wireframeMat = new THREE.MeshBasicMaterial({
        color: 0x00ccff,
        wireframe: true,
        transparent: true,
        opacity: 0.3
    });
    const wireframe = new THREE.Mesh(wireframeGeo, wireframeMat);
    scene.add(wireframe);

    // Obroči
    const ringGeo = new THREE.TorusGeometry(3.2, 0.02, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
        color: 0x00f2ff,
        transparent: true,
        opacity: 0.6
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    scene.add(ring);

    const ring2 = new THREE.Mesh(ringGeo, ringMat);
    ring2.rotation.y = Math.PI / 3;
    ring2.rotation.x = Math.PI / 4;
    scene.add(ring2);

    camera.position.z = 6;

    function animate() {
        requestAnimationFrame(animate);

        hologram.rotation.x += 0.005;
        hologram.rotation.y += 0.008;

        wireframe.rotation.x -= 0.003;
        wireframe.rotation.y -= 0.004;

        ring.rotation.z += 0.005;
        ring2.rotation.z -= 0.003;

        const scale = 1 + Math.sin(Date.now() * 0.001) * 0.05;
        hologram.scale.set(scale, scale, scale);

        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        const newWidth = container.clientWidth;
        const newHeight = container.clientHeight;

        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);
    });
}

/* ===== 4. MOBILNI MENI IN SCROLL ===== */
function setupMobileMenu() {
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const header = document.getElementById('header');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

/* ===== 5. KONTAKTNI OBRAZEC ===== */
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            alert('Hvala za vaše sporočilo! V kratkem vas bomo kontaktirali.');
            this.reset();
        });
    }
}

/* ===== INICIALIZACIJA ===== */
document.addEventListener('DOMContentLoaded', function () {
    createDigitalBackground();
    setupMobileMenu();
    setupContactForm();

    if (typeof THREE !== 'undefined') {
        initBackground();
        initHologram();
    } else {
        console.warn('Three.js ni bil naložen.');
    }
});