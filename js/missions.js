/* ============================================================
   MISSIONS.JS — fetch from JSON and render missions page
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  const upcomingContainer = document.getElementById('upcoming-section');
  const pastContainer     = document.getElementById('past-trips-list');

  function renderUpcoming(trip) {
    if (!trip || !trip.title) {
      if (upcomingContainer) upcomingContainer.remove();
      return;
    }

    const f = trip.fundraising;

    const activitiesHTML = trip.activities.map(a => `<li>${a}</li>`).join('');

    const onlineStepsHTML = f.donateOnlineSteps.map(s => `<li>${s}</li>`).join('');

    const mailAddressHTML = f.donateByMail.address
      .split('\n')
      .join('<br>');

    upcomingContainer.innerHTML = `
      <div class="upcoming-inner">

        <div class="upcoming-header reveal">
          <h2 class="section-title">${trip.title}</h2>
          <div class="section-divider reveal--delay-1"></div>
        </div>

        <div class="upcoming-grid reveal reveal--delay-1">

          <div class="upcoming-trip-photo">
            <img src="${trip.photo}" alt="Mission trip photo" />
          </div>

          <div class="upcoming-detail-card">
            <h3>Trip Details</h3>
            <p>
              <strong>Dates:</strong> ${trip.dates}<br>
              <strong>Destination:</strong> ${trip.destination}<br>
              <strong>Location:</strong> ${trip.location}<br>
              <strong>Church:</strong> ${trip.church}<br>
              <strong>Supported Ministry:</strong> ${trip.ministry}
            </p>
          </div>

          <div class="upcoming-detail-card">
            <h3>What We'll Be Doing</h3>
            <ul>${activitiesHTML}</ul>
          </div>

        </div>

        <div class="past-trips-link reveal reveal--delay-2">
          <a href="#past-trips" class="btn btn--outline">See My Past Trips</a>
        </div>

        <div class="reveal reveal--delay-2">
          <div class="deadline-badge">Fundraising Deadline &mdash; ${f.deadline}</div>
          <div class="donate-section-title">Support This Trip</div>
          <p class="donate-note">${f.tripCostNote}</p>

          <div class="fundraising-progress">
            <div class="fundraising-progress__header">
              <span class="fundraising-progress__raised">$${f.amountRaised.toLocaleString()} raised</span>
              <span class="fundraising-progress__goal">Goal: $${f.goal.toLocaleString()}</span>
            </div>
            <div class="fundraising-progress__bar-track">
              <div class="fundraising-progress__bar-fill" style="width: ${f.progressPercent}%"></div>
            </div>
            <p class="fundraising-progress__note">${f.progressNote}</p>
          </div>

          <div class="donate-methods">

            <div class="donate-method">
              <div class="donate-method__icon">💻</div>
              <div class="donate-method__title">Give Online (Preferred)</div>
              <ol>${onlineStepsHTML}</ol>
              <div class="donate-cta">
                <a href="${f.donateOnlineUrl}" target="_blank" rel="noopener" class="btn--glow">Donate Now</a>
              </div>
            </div>

            <div class="donate-method">
              <div class="donate-method__icon">✉️</div>
              <div class="donate-method__title">Give By Mail</div>
              <ul>
                <li>Make checks payable to: <strong>${f.donateByMail.payableTo}</strong></li>
                <li>Do <strong>not</strong> put my name on the check</li>
                <li>Mail to:<br>${mailAddressHTML}</li>
              </ul>
            </div>

          </div>
        </div>

      </div>`;
  }

  function renderPastTrips(trips) {
    if (!pastContainer || !trips || !trips.length) return;

    pastContainer.innerHTML = trips.map((trip, i) => {
      const delay = i === 0 ? 'reveal--delay-1' : 'reveal--delay-2';
      const photosHTML = trip.photos.map(src =>
        `<div class="trip-photo"><img src="${src}" alt="${trip.title}" /></div>`
      ).join('');

      return `
        <div class="trip-card reveal ${delay}">
          <div class="trip-card__header">
            <div class="trip-card__flag"><img src="${trip.flag}" alt="Flag" /></div>
            <div class="trip-card__meta">
              <div class="trip-card__date">${trip.date}</div>
              <div class="trip-card__title">${trip.title}</div>
              <div class="trip-card__org">${trip.org}</div>
            </div>
          </div>
          <div class="trip-card__body">
            <p class="trip-card__desc">${trip.description}</p>
            <div class="trip-photos">${photosHTML}</div>
          </div>
        </div>`;
    }).join('');

    /* Lightbox */
    pastContainer.querySelectorAll('.trip-photo img').forEach(img => {
      img.addEventListener('click', () => {
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        if (!lightbox || !lightboxImg) return;
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });

    /* Re-run scroll reveal on new elements */
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    pastContainer.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }

  fetch('/content/missions.json')
    .then(res => res.json())
    .then(data => {
      renderUpcoming(data.upcomingTrip);
      renderPastTrips(data.pastTrips);

      /* Re-run scroll reveal on upcoming section elements */
      if (upcomingContainer) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              observer.unobserve(entry.target);
            }
          });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
        upcomingContainer.querySelectorAll('.reveal').forEach(el => observer.observe(el));
      }
    })
    .catch(() => {
      if (upcomingContainer) upcomingContainer.remove();
      if (pastContainer) pastContainer.innerHTML = '<p style="color:var(--text-muted);text-align:center;padding:2rem;">Could not load missions.</p>';
    });

});
