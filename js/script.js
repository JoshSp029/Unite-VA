/* United VA — main.js */

/* ─── Navbar scroll behaviour ─── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  highlightNavLink();
}, { passive: true });

/* ─── Active nav link on scroll ─── */
const sections = document.querySelectorAll('section[id], div[id]');
const navLinks = document.querySelectorAll('.nav-link');

function highlightNavLink() {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
}

/* ─── Mobile hamburger ─── */
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinksEl.classList.toggle('open');
});

navLinksEl.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinksEl.classList.remove('open');
  });
});

/* ─── Star canvas ─── */
(function buildStars() {
  const canvas = document.getElementById('starCanvas');
  const ctx = canvas.getContext('2d');
  let stars = [];
  let visible = true;
  let lastFrame = 0;
  const FPS = 30;
  const INTERVAL = 1000 / FPS;
  let resizeTimer;

  function resize() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      buildStarField();
    }, 150);
  }

  function buildStarField() {
    const count = Math.min(Math.floor((canvas.width * canvas.height) / 8000), 120);
    stars = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.4 + 0.2,
      a: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.006 + 0.002,
    }));
  }

  ctx.fillStyle = 'white';

  function draw(ts) {
    requestAnimationFrame(draw);
    if (!visible || ts - lastFrame < INTERVAL) return;
    lastFrame = ts;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(s => {
      s.a += s.speed;
      ctx.globalAlpha = 0.3 + 0.7 * Math.abs(Math.sin(s.a));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;
  }

  const observer = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
  observer.observe(canvas);

  window.addEventListener('resize', resize, { passive: true });
  canvas.width  = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  buildStarField();
  requestAnimationFrame(draw);
})();

/* ─── Stats counter animation ─── */
function animateCounter(el) {
  const target = +el.dataset.target;
  const duration = 1800;
  const step = 16;
  const increment = target / (duration / step);
  let current = 0;

  const timer = setInterval(() => {
    current = Math.min(current + increment, target);
    el.textContent = Math.floor(current).toLocaleString();
    if (current >= target) clearInterval(timer);
  }, step);
}

const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stat-num').forEach(animateCounter);
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const statsBar = document.querySelector('.stats-bar');
if (statsBar) statsObserver.observe(statsBar);

/* ─── Scroll reveal ─── */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ─── Route tabs filter ─── */
const tabs = document.querySelectorAll('.rtab');
const routeCards = document.querySelectorAll('.route-card');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    const filter = tab.dataset.filter;
    routeCards.forEach(card => {
      const match = filter === 'all' || card.dataset.cat === filter;
      card.classList.toggle('hidden', !match);
    });
  });
});

/* ─── Registration form ─── */
const registerForm = document.getElementById('registerForm');
const formSuccess  = document.getElementById('formSuccess');

if (registerForm) {
  registerForm.addEventListener('submit', async e => {
    e.preventDefault();

    const required = registerForm.querySelectorAll('[required]');
    let valid = true;
    required.forEach(field => {
      field.style.borderColor = '';
      field.style.boxShadow  = '';
      if (!field.value.trim()) {
        field.style.borderColor = '#e53e3e';
        field.style.boxShadow   = '0 0 0 3px rgba(229,62,62,0.15)';
        valid = false;
      }
    });
    if (!valid) return;

    const btn = registerForm.querySelector('[type="submit"]');
    btn.disabled    = true;
    btn.textContent = 'Sending…';

    try {
      const res  = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: new FormData(registerForm)
      });
      const data = await res.json();

      if (data.success) {
        registerForm.style.display = 'none';
        formSuccess.classList.add('visible');
      } else {
        btn.disabled    = false;
        btn.textContent = 'Submit Application';
        alert('There was a problem sending your application. Please try again or email us at unitedvaivao@gmail.com');
      }
    } catch {
      btn.disabled    = false;
      btn.textContent = 'Submit Application';
      alert('Connection error. Please try again or email us at unitedvaivao@gmail.com');
    }
  });

  registerForm.querySelectorAll('input, select, textarea').forEach(field => {
    field.addEventListener('input', () => {
      field.style.borderColor = '';
      field.style.boxShadow   = '';
    });
  });
}

/* ─── GDPR Privacy Modal ─── */
(function () {
  const modal   = document.getElementById('gdprModal');
  const overlay = document.getElementById('gdprModalOverlay');
  const closeBtn = document.getElementById('gdprModalClose');
  const trigger = document.getElementById('privacyLink');
  if (!modal || !trigger) return;

  function openModal(e) {
    e.preventDefault();
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  trigger.addEventListener('click', openModal);
  overlay.addEventListener('click', closeModal);
  closeBtn.addEventListener('click', closeModal);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
})();

/* ─── Smooth scroll for anchor links ─── */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');
    if (href === '#') return; // bare # links are handled by their own JS (e.g. modals)
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    const offset = 72;
    window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
  });
});
