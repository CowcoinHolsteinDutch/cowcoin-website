/* Cowcoin – professional UX helpers */
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const yearEl = document.getElementById('year');
  const themeToggle = document.getElementById('themeToggle');

  /* ---- YEAR ---- */
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- THEME TOGGLE (persisted) ---- */
  const THEME_KEY = 'cowcoin-theme';
  const applyTheme = (t) => {
    if (t === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  };
  const stored = localStorage.getItem(THEME_KEY);
  if (stored) applyTheme(stored);
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const next = document.documentElement.classList.contains('light') ? 'dark' : 'light';
      applyTheme(next);
      localStorage.setItem(THEME_KEY, next);
    });
  }

  /* ---- SMOOTH SCROLL WITH OFFSET FOR STICKY HEADER ---- */
  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  const headerHeight = () => header ? header.getBoundingClientRect().height : 0;

  navLinks.forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (!target) return;

      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - (headerHeight() + 8);
      window.scrollTo({ top, behavior: (window.matchMedia('(prefers-reduced-motion: no-preference)').matches ? 'smooth' : 'auto') });
      history.replaceState(null, '', `#${id}`);
    });
  });

  /* ---- ACTIVE NAV (scroll spy) ---- */
  const sections = Array.from(document.querySelectorAll('section[id]'));
  const markActive = () => {
    const scrollY = window.scrollY + headerHeight() + 12;
    let current = null;
    for (const sec of sections) {
      if (scrollY >= sec.offsetTop && scrollY < sec.offsetTop + sec.offsetHeight) {
        current = sec.id; break;
      }
    }
    document.querySelectorAll('nav a').forEach(a => {
      a.classList.toggle('is-active', current && a.getAttribute('href') === `#${current}`);
    });
  };
  markActive();
  window.addEventListener('scroll', markActive, { passive: true });
  window.addEventListener('resize', markActive);

  /* ---- COPY TO CLIPBOARD + TOAST ---- */
  const makeToast = (() => {
    let tEl = null, hideT = null;
    return (msg) => {
      if (!tEl) {
        tEl = document.createElement('div');
        tEl.className = 'toast';
        document.body.appendChild(tEl);
      }
      tEl.textContent = msg;
      tEl.classList.add('show');
      clearTimeout(hideT);
      hideT = setTimeout(() => tEl.classList.remove('show'), 1800);
    };
  })();

  document.querySelectorAll('[data-copy]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const sel = btn.getAttribute('data-copy');
      const input = document.querySelector(sel);
      if (!input) return;
      try {
        await navigator.clipboard.writeText(input.value || input.textContent || '');
        makeToast('Copied to clipboard ✓');
      } catch {
        // fallback
        input.select(); document.execCommand('copy');
        makeToast('Copied to clipboard ✓');
      }
    });
  });

  /* ---- REVEAL ON SCROLL (subtle) ---- */
  const revealEls = document.querySelectorAll('.reveal, .card, .tok, .step');
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) e.target.classList.add('in');
  }, { threshold: 0.08 });
  revealEls.forEach(el => io.observe(el));
});
