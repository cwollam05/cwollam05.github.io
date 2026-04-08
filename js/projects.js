/* ============================================================
   PROJECTS.JS — filter by tag
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards      = document.querySelectorAll('.project-card');
  const noResults  = document.querySelector('.no-results');

  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      /* Update active button */
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      let visible = 0;

      cards.forEach(card => {
        const tags = card.dataset.tags ? card.dataset.tags.split(',') : [];
        const show = filter === 'all' || tags.includes(filter);
        card.classList.toggle('hidden', !show);
        if (show) visible++;
      });

      if (noResults) {
        noResults.classList.toggle('visible', visible === 0);
      }
    });
  });

});
