const modeToggle = document.getElementById('modeToggle');
const modeIcon = document.getElementById('modeIcon');
const bgim = document.getElementById('bgimage');

const isDarkMode = localStorage.getItem('darkMode') === 'true';

function toggleDarkMode() {
  const isDark = document.body.classList.toggle('dark-mode');
  document.documentElement.classList.add(isDark ? 'dark' : document.documentElement.classList.remove('dark'));
  modeIcon.src = isDark ? 'moon.png' : 'sun-removebg-preview.png';
  bgim.src = isDark ? 'darkbg.png' : 'bg.png';
  localStorage.setItem('darkMode', isDark);
  let bg = document.getElementById('bgimage');
  bg.style.display = 'hidden';
}

if (isDarkMode) {
  toggleDarkMode();
}

modeToggle.addEventListener('click', toggleDarkMode);

