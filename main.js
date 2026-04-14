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

// ── Modal ──
const overlay  = document.getElementById('modalOverlay');
const modalEl  = document.getElementById('modal');
const modalBody= document.getElementById('modalBody');
const modalClose = document.getElementById('modalClose');

const modalMap = {
  tokusho: 'tpl-tokusho',
  privacy:  'tpl-privacy',
  contact:  'tpl-contact',
};

function openModal(key) {
  const tpl = document.getElementById(modalMap[key]);
  if (!tpl) return;
  modalBody.innerHTML = '';
  modalBody.appendChild(tpl.content.cloneNode(true));
  overlay.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  overlay.classList.remove('is-open');
  document.body.style.overflow = '';
}

document.querySelectorAll('[data-modal]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    openModal(link.dataset.modal);
  });
});

modalClose.addEventListener('click', closeModal);
overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// お問い合わせフォーム送信
function handleContactSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('.modal__submit');
  btn.textContent = '送信しました。ありがとうございます。';
  btn.disabled = true;
  btn.style.background = '#a08060';
  e.target.querySelectorAll('input, select, textarea').forEach(el => el.disabled = true);
}

// ── Smooth scroll ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    if (a.dataset.modal) return; // モーダルリンクはスキップ
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
