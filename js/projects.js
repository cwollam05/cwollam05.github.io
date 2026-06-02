/* ============================================================
   PROJECTS.JS — fetch from JSON, render cards, filter by tag
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  const grid      = document.getElementById('projects-grid');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const noResults  = document.querySelector('.no-results');

  if (!grid) return;

  const delays = ['reveal--delay-1','reveal--delay-2','reveal--delay-3','reveal--delay-4','reveal--delay-5'];

  function renderCards(projects) {
    grid.innerHTML = '';

    projects.forEach((project, i) => {
      const delay = delays[i % delays.length];

      const linksHTML = project.links.map(link =>
        `<a href="${link.url}" class="project-link project-link--filled" target="_blank" rel="noopener">${link.label}</a>`
      ).join('');

      const displayTagsHTML = project.displayTags.map(t =>
        `<span class="tag">${t}</span>`
      ).join('');

      const card = document.createElement('div');
      card.className = `project-card reveal ${delay}`;
      card.dataset.tags = project.tags.join(',');
      card.innerHTML = `
        <div class="project-card__thumb">
          <img src="${project.thumbnail}" alt="${project.title}" />
        </div>
        <div class="project-card__body">
          <div class="project-card__tags">${displayTagsHTML}</div>
          <h3 class="project-card__title">${project.title}</h3>
          <p class="project-card__desc">${project.description}</p>
          <div class="project-card__links">${linksHTML}</div>
        </div>`;

      grid.appendChild(card);
    });

    /* Re-run scroll reveal observer on newly created cards */
    const revealEls = grid.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => observer.observe(el));

    attachFilters();
  }

  function attachFilters() {
    if (!filterBtns.length) return;

    filterBtns.forEach(btn => {
      btn.onclick = () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;
        const cards = grid.querySelectorAll('.project-card');
        let visible = 0;

        cards.forEach(card => {
          const tags = card.dataset.tags ? card.dataset.tags.split(',') : [];
          const show = filter === 'all' || tags.includes(filter);
          card.classList.toggle('hidden', !show);
          if (show) visible++;
        });

        if (noResults) noResults.classList.toggle('visible', visible === 0);
      };
    });
  }

  fetch('/content/projects.json')
    .then(res => res.json())
    .then(projects => renderCards(projects))
    .catch(() => {
      grid.innerHTML = '<p style="color:var(--text-muted);text-align:center;padding:2rem;">Could not load projects.</p>';
    });

});
