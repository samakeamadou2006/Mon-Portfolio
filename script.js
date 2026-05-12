const initReveal = () => {
  const revealElements = document.querySelectorAll('.reveal');

  if (!('IntersectionObserver' in window)) {
    revealElements.forEach((element) => element.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  revealElements.forEach((element) => observer.observe(element));
};

const initMenu = () => {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav-links');
  const navLinks = document.querySelectorAll('.nav-links a');

  if (!toggle || !nav) return;

  const closeMenu = () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Ouvrir le menu');
  };

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen);
    toggle.setAttribute('aria-label', isOpen ? 'Fermer le menu' : 'Ouvrir le menu');
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('click', (event) => {
    if (nav.classList.contains('open') && !nav.contains(event.target) && event.target !== toggle) {
      closeMenu();
    }
  });
};

const initDynamicContent = () => {
  const heroGreeting = document.getElementById('hero-greeting');
  const footerYear = document.getElementById('footer-year');

  if (heroGreeting) {
    const hour = new Date().getHours();
    const greeting = hour < 12 ? 'Bonjour, bienvenue sur mon portfolio !' : hour < 18 ? 'Bon après-midi, découvrez mes compétences !' : 'Bonsoir, merci de votre visite !';
    heroGreeting.textContent = greeting;
  }

  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }
};

document.addEventListener('DOMContentLoaded', () => {
  initReveal();
  initMenu();
  initDynamicContent();
});
