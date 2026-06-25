// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Sticky header
const header = document.getElementById('header');
const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 30);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// Mobile nav
const toggle = document.getElementById('navToggle');
const links = document.getElementById('navLinks');
toggle.addEventListener('click', () => {
  const open = links.classList.toggle('open');
  toggle.classList.toggle('active', open);
  toggle.setAttribute('aria-expanded', open);
});
links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  links.classList.remove('open');
  toggle.classList.remove('active');
  toggle.setAttribute('aria-expanded', false);
}));

// Starfield
const sky = document.getElementById('stars');
const STAR_COUNT = window.innerWidth < 600 ? 40 : 80;
for (let i = 0; i < STAR_COUNT; i++) {
  const s = document.createElement('i');
  const size = Math.random() * 2 + 1;
  s.style.width = s.style.height = size + 'px';
  s.style.left = Math.random() * 100 + '%';
  s.style.top = Math.random() * 100 + '%';
  s.style.animationDelay = (Math.random() * 3) + 's';
  s.style.animationDuration = (2 + Math.random() * 3) + 's';
  sky.appendChild(s);
}

// Reveal on scroll
const revealEls = document.querySelectorAll('.card, .why-item, .section-head, .about-text, .about-visual, .contact-card, .hero-stats');
revealEls.forEach(el => el.classList.add('reveal'));
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => io.observe(el));

// Animated counters
const counters = document.querySelectorAll('[data-count]');
const cio = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    const target = +el.dataset.count;
    let cur = 0;
    const step = Math.max(1, Math.ceil(target / 60));
    const tick = () => {
      cur += step;
      if (cur >= target) { el.textContent = target + '+'; return; }
      el.textContent = cur;
      requestAnimationFrame(tick);
    };
    tick();
    cio.unobserve(el);
  });
}, { threshold: 0.5 });
counters.forEach(c => cio.observe(c));
