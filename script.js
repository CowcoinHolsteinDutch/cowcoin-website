// Theme toggle + copy helper
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

document.querySelectorAll('[data-copy]').forEach(btn => {
  btn.addEventListener('click', () => {
    const sel = btn.getAttribute('data-copy');
    const input = document.querySelector(sel);
    if (!input) return;
    navigator.clipboard.writeText(input.value).then(()=>{
      btn.textContent = 'Copied!';
      setTimeout(()=> btn.textContent = 'Copy', 1000);
    });
  });
});

const toggle = document.getElementById('themeToggle');
let dark = true;
function applyTheme(){
  document.documentElement.style.setProperty('--bg', dark ? '#0e0f10' : '#f6f7fb');
  document.documentElement.style.setProperty('--panel', dark ? '#141518' : '#ffffff');
  document.body.style.color = dark ? '#eaecef' : '#141518';
}
applyTheme();
toggle?.addEventListener('click', ()=>{ dark = !dark; applyTheme(); });
