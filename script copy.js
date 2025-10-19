
(function(){
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Theme toggle (persist)
  const root = document.documentElement;
  const btn = document.getElementById('themeToggle');
  const stored = localStorage.getItem('theme');
  if (stored) root.dataset.theme = stored;
  if (btn){
    btn.addEventListener('click', () => {
      const next = root.dataset.theme === 'light' ? 'dark' : 'light';
      root.dataset.theme = next;
      localStorage.setItem('theme', next);
    });
  }

  // Copy helpers
  function attachCopy(selector){
    document.querySelectorAll('[data-copy]').forEach(el => {
      el.addEventListener('click', () => {
        const input = document.querySelector(el.getAttribute('data-copy'));
        if (input){
          navigator.clipboard.writeText(input.value.replace(/^Contract:\s*/i,''));
          showToast('Copied: <b>' + input.value.replace(/^Contract:\s*/i,'') + '</b>');
        }
      });
    });
  }
  attachCopy();

  // Toast
  const toast = document.getElementById('toast');
  let toTimer;
  function showToast(html){
    if (!toast) return;
    toast.innerHTML = html;
    toast.classList.add('show');
    clearTimeout(toTimer);
    toTimer = setTimeout(() => toast.classList.remove('show'), 1800);
  }

  // Reveal on scroll
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
  }, {threshold:.12});
  revealEls.forEach(el => io.observe(el));
})();
