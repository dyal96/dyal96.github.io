// ── Theme toggle ──────────────────────────────────────
const html = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');

// Restore saved preference
const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
});

// ── Navbar scroll effect ─────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ── Hamburger menu ────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
});

document.querySelectorAll('.mob-link').forEach(link => {
    link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// ── Pricing tabs ──────────────────────────────────────
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const tab = btn.dataset.tab;
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById('tab-' + tab).classList.add('active');
    });
});

// ── Skill bars — animate when section enters viewport ─
const skillSection = document.getElementById('skills');
let skillsAnimated = false;

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !skillsAnimated) {
            skillsAnimated = true;
            document.querySelectorAll('.skill-fill').forEach(fill => {
                const pct = fill.style.getPropertyValue('--pct');
                fill.style.width = pct;
            });
        }
    });
}, { threshold: 0.25 });

if (skillSection) skillObserver.observe(skillSection);

// ── Scroll reveal ─────────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('revealed'), i * 60);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.glass-card, .section-title, .section-label, .hero-badge, .hero-stats').forEach(el => {
    el.setAttribute('data-reveal', '');
    revealObserver.observe(el);
});

// ── Active nav link highlight on scroll ───────────────
const sections = document.querySelectorAll('section[id], footer[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => {
                link.style.color = '';
                if (link.getAttribute('href') === '#' + entry.target.id) {
                    link.style.color = '#fff';
                }
            });
        }
    });
}, { threshold: 0.35 });

sections.forEach(s => sectionObserver.observe(s));

// ── Hero visual subtle parallax ───────────────────────
const heroVisual = document.querySelector('.hero-visual');
if (heroVisual) {
    document.addEventListener('mousemove', (e) => {
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        const dx = (e.clientX - cx) / cx;
        const dy = (e.clientY - cy) / cy;
        heroVisual.style.transform = `translate(${dx * 8}px, ${dy * 6}px)`;
    });
}
