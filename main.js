// ── Fade-in on scroll ──
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.fade-in').forEach(el => io.observe(el));

// Fallback: ensure above-the-fold fade-in elements become visible on load
window.addEventListener('load', () => {
  requestAnimationFrame(() => {
    document.querySelectorAll('.fade-in:not(.visible)').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add('visible');
      }
    });
  });
});

// ── FAQ accordion ──
document.querySelectorAll('.faq-item__q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// ── Smooth scroll ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (id.length > 1) {
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + scrollY - 80;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  });
});

// ── Header: scrolled state ──
const header = document.getElementById('header');
const onScroll = () => {
  header.classList.toggle('scrolled', scrollY > 40);
};
window.addEventListener('scroll', onScroll, { passive: true });
