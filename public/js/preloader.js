const loader = document.getElementById('preloader');
const fadeEffect = setInterval(() => {
  if (!loader.style.opacity) {
    loader.style.opacity = 1;
  }
  if (loader.style.opacity > 0) {
    loader.style.opacity -= 0.1;
  } else {
    clearInterval(fadeEffect);
    loader.style.display = 'none';
  }
}, 60);

window.addEventListener('load', fadeEffect, removeLoad);
