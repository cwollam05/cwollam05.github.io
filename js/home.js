/* ============================================================
   HOME.JS — typewriter effect + scroll hint
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* --- Typewriter --- */
  const roles = ['Graphic Designer', 'Video Editor', 'Web Developer'];
  const el = document.querySelector('.typewriter');
  if (!el) return;

  let roleIndex  = 0;
  let charIndex  = 0;
  let isDeleting = false;
  const TYPING_SPEED   = 95;
  const DELETING_SPEED = 55;
  const PAUSE_END      = 1800;
  const PAUSE_START    = 350;

  function type() {
    const currentRole = roles[roleIndex];

    if (!isDeleting) {
      el.textContent = currentRole.slice(0, charIndex + 1);
      charIndex++;
      if (charIndex === currentRole.length) {
        isDeleting = true;
        setTimeout(type, PAUSE_END);
        return;
      }
    } else {
      el.textContent = currentRole.slice(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(type, PAUSE_START);
        return;
      }
    }

    setTimeout(type, isDeleting ? DELETING_SPEED : TYPING_SPEED);
  }

  type();

  /* --- Scroll hint click --- */
  const scrollHint = document.querySelector('.hero__scroll-hint');
  if (scrollHint) {
    scrollHint.addEventListener('click', () => {
      const quickNav = document.querySelector('.quick-nav');
      if (quickNav) quickNav.scrollIntoView({ behavior: 'smooth' });
    });
  }

});
