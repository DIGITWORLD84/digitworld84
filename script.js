/* =========================================================
   DigitWorld - Skripta
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
    initHeader();
    initMobileMenu();
    initReveal();
    initCounters();
    initCardGlow();
    initSmartHome();
    initContactForm();
    initBackground();
    initHologram();
    const y = document.getElementById('year');
    if (y) y.textContent = new Date().getFullYear();
});

/* ===== HEADER, AKTIVNA POVEZAVA, GUMB NA VRH ===== */
function initHeader() {
    const header = document.getElementById('header');
    const toTop = document.getElementById('toTop');
    const links = document.querySelectorAll('.nav-links a[href^="#"]');
    const sections = [...links].map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);

    const onScroll = () => {
        const y = window.scrollY;
        header.classList.toggle('scrolled', y > 40);
        toTop.classList.toggle('show', y > 600);

        let current = '';
        sections.forEach(sec => { if (sec.getBoundingClientRect().top <= 120) current = '#' + sec.id; });
        links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === current && !a.classList.contains('nav-cta')));
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
}

/* ===== MOBILNI MENI ===== */
function initMobileMenu() {
    const btn = document.getElementById('menuBtn');
    const nav = document.getElementById('navLinks');

    const close = () => {
        nav.classList.remove('open');
        btn.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
    };

    btn.addEventListener('click', () => {
        const open = nav.classList.toggle('open');
        btn.classList.toggle('open', open);
        btn.setAttribute('aria-expanded', String(open));
    });

    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
}

/* ===== POJAVLJANJE OB SKROLANJU ===== */
function initReveal() {
    const items = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
        items.forEach(el => el.classList.add('visible'));
        return;
    }
    const io = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                io.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    items.forEach((el, i) => {
        el.style.transitionDelay = (i % 4) * 80 + 'ms';
        io.observe(el);
    });
}

/* ===== ŠTEVCI ===== */
function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    const io = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            const target = +el.dataset.count;
            const start = performance.now();
            const step = now => {
                const p = Math.min((now - start) / 1500, 1);
                el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
                if (p < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
            io.unobserve(el);
        });
    });
    counters.forEach(c => io.observe(c));
}

/* ===== SIJ NA KARTICAH ===== */
function initCardGlow() {
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const r = card.getBoundingClientRect();
            card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
            card.style.setProperty('--my', (e.clientY - r.top) + 'px');
        });
    });
}

/* ===== PAMETNI DOM ===== */
function initSmartHome() {
    // Ploščice v hero nadzorni plošči
    document.querySelectorAll('[data-toggle]').forEach(tile => {
        tile.setAttribute('aria-pressed', tile.classList.contains('on'));
        tile.addEventListener('click', () => {
            const on = tile.classList.toggle('on');
            tile.setAttribute('aria-pressed', on);
        });
    });

    // Stikala na karticah naprav
    document.querySelectorAll('.device').forEach(device => {
        const input = device.querySelector('.switch input');
        if (!input) return;
        const sync = () => device.classList.toggle('is-on', input.checked);
        input.addEventListener('change', sync);
        sync();
    });

    // Termostat (sinhroniziran s hero ploščo)
    const range = document.getElementById('thermoRange');
    const out = document.getElementById('thermoValue');
    const heroTemp = document.getElementById('heroTemp');
    if (range) {
        range.addEventListener('input', () => {
            out.textContent = range.value + ' °C';
            if (heroTemp) heroTemp.textContent = range.value;
        });
    }
}

/* ===== KONTAKTNI OBRAZEC ===== */
function initContactForm() {
    const form = document.getElementById('contactForm');
    const status = document.getElementById('formStatus');
    if (!form) return;

    form.addEventListener('submit', e => {
        e.preventDefault();
        let valid = true;

        form.querySelectorAll('[required]').forEach(field => {
            const ok = field.value.trim() !== '' && (field.type !== 'email' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value));
            field.classList.toggle('invalid', !ok);
            if (!ok) valid = false;
        });

        if (!valid) {
            status.textContent = 'Prosimo, pravilno izpolnite vsa polja.';
            status.className = 'form-status err';
            return;
        }

        // TODO: tu povežite pošiljanje na strežnik (npr. fetch na PHP/Formspree)
        status.textContent = 'Hvala! Vaše sporočilo je bilo poslano. Odgovorili vam bomo v 24 urah.';
        status.className = 'form-status ok';
        form.reset();
    });

    form.querySelectorAll('input, textarea').forEach(f =>
        f.addEventListener('input', () => f.classList.remove('invalid')));
}

/* ===== OZADJE: POVEZANE TOČKE (CANVAS 2D) ===== */
function initBackground() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w, h, points = [];

    const resize = () => {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
        const count = Math.min(80, Math.floor((w * h) / 18000));
        points = Array.from({ length: count }, () => ({
            x: Math.random() * w,
            y: Math.random() * h,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3
        }));
    };

    const draw = () => {
        ctx.clearRect(0, 0, w, h);
        for (let i = 0; i < points.length; i++) {
            const p = points[i];
            p.x += p.vx; p.y += p.vy;
            if (p.x < 0 || p.x > w) p.vx *= -1;
            if (p.y < 0 || p.y > h) p.vy *= -1;

            ctx.fillStyle = 'rgba(56, 189, 248, 0.6)';
            ctx.beginPath();
            ctx.arc(p.x, p.y, 1.4, 0, Math.PI * 2);
            ctx.fill();

            for (let j = i + 1; j < points.length; j++) {
                const q = points[j];
                const d = Math.hypot(p.x - q.x, p.y - q.y);
                if (d < 140) {
                    ctx.strokeStyle = `rgba(59, 130, 246, ${0.18 * (1 - d / 140)})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(q.x, q.y);
                    ctx.stroke();
                }
            }
        }
        if (!reduce) requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    draw();
}

/* ===== HOLOGRAM (THREE.JS) ===== */
function initHologram() {
    const container = document.getElementById('hologram');
    if (!container || typeof THREE === 'undefined') return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(0, 0.5, 6);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // Glavni objekt - žičnati ikozaeder
    const core = new THREE.Mesh(
        new THREE.IcosahedronGeometry(1.3, 1),
        new THREE.MeshBasicMaterial({ color: 0x22d3ee, wireframe: true, transparent: true, opacity: 0.75 })
    );
    group.add(core);

    // Notranje jedro
    const inner = new THREE.Mesh(
        new THREE.IcosahedronGeometry(0.7, 0),
        new THREE.MeshBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.35 })
    );
    group.add(inner);

    // Obroči
    const rings = [];
    [1.9, 2.3].forEach((r, i) => {
        const ring = new THREE.Mesh(
            new THREE.TorusGeometry(r, 0.01, 8, 120),
            new THREE.MeshBasicMaterial({ color: i ? 0x3b82f6 : 0x38bdf8, transparent: true, opacity: 0.6 })
        );
        ring.rotation.x = Math.PI / 2 + i * 0.4;
        rings.push(ring);
        group.add(ring);
    });

    // Delci
    const count = 400;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        const r = 2 + Math.random() * 1.5;
        const t = Math.random() * Math.PI * 2;
        const p = Math.acos(2 * Math.random() - 1);
        pos[i * 3] = r * Math.sin(p) * Math.cos(t);
        pos[i * 3 + 1] = r * Math.sin(p) * Math.sin(t);
        pos[i * 3 + 2] = r * Math.cos(p);
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const particles = new THREE.Points(pGeo, new THREE.PointsMaterial({ color: 0x7dd3fc, size: 0.03, transparent: true, opacity: 0.8 }));
    group.add(particles);

    // Podstavek (projektor)
    const base = new THREE.Mesh(
        new THREE.CylinderGeometry(1.2, 1.5, 0.08, 48, 1, true),
        new THREE.MeshBasicMaterial({ color: 0x22d3ee, wireframe: true, transparent: true, opacity: 0.3 })
    );
    base.position.y = -2.1;
    scene.add(base);

    // Interakcija z miško
    let tx = 0, ty = 0;
    container.addEventListener('pointermove', e => {
        const r = container.getBoundingClientRect();
        tx = ((e.clientX - r.left) / r.width - 0.5) * 1.2;
        ty = ((e.clientY - r.top) / r.height - 0.5) * 0.8;
    });
    container.addEventListener('pointerleave', () => { tx = 0; ty = 0; });

    // Animiraj samo, ko je vidno
    let visible = false;
    new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }).observe(container);

    const clock = new THREE.Clock();
    const animate = () => {
        requestAnimationFrame(animate);
        if (!visible) return;
        const t = clock.getElapsedTime();

        core.rotation.y = t * 0.4;
        core.rotation.x = t * 0.2;
        inner.rotation.y = -t * 0.6;
        inner.scale.setScalar(1 + Math.sin(t * 2) * 0.08);
        rings[0].rotation.z = t * 0.5;
        rings[1].rotation.z = -t * 0.3;
        particles.rotation.y = t * 0.05;
        core.material.opacity = 0.6 + Math.sin(t * 3) * 0.15;

        group.rotation.y += (tx - group.rotation.y) * 0.05;
        group.rotation.x += (ty - group.rotation.x) * 0.05;
        group.position.y = Math.sin(t) * 0.1;

        renderer.render(scene, camera);
    };
    animate();

    window.addEventListener('resize', () => {
        const w = container.clientWidth, h = container.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
    });
}
