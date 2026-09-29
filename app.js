(() => {
  const data = window.NAMMA_DATA;
  const listingGrid = document.querySelector('#listing-grid');
  const localityList = document.querySelector('#locality-list');
  const resultsCount = document.querySelector('#results-count');
  const emptyState = document.querySelector('#empty-state');
  const filters = document.querySelector('#filters');
  const dialog = document.querySelector('#listing-dialog');
  const dialogContent = document.querySelector('#dialog-content');

  const money = value => `₹${value.toLocaleString('en-IN')}`;
  const whatsappUrl = listing => `https://wa.me/${listing.phone}?text=${encodeURIComponent(`Hi, I found your ${listing.title} on NammaNest. Is it still available?`)}`;

  function renderLocalities() {
    localityList.innerHTML = data.localities.map(locality => `
      <button class="locality-card" data-locality="${locality.name}" style="--locality-image: url('${locality.image}')">
        <span class="locality-copy"><strong>${locality.name}</strong><small>${locality.note}</small><span>${locality.count} home${locality.count === 1 ? '' : 's'} <b aria-hidden="true">&#8594;</b></span></span>
      </button>`).join('');
    localityList.querySelectorAll('[data-locality]').forEach(button => button.addEventListener('click', () => {
      document.querySelector('#locality-filter').value = button.dataset.locality;
      renderListings();
      document.querySelector('#listings').scrollIntoView({ behavior: 'smooth' });
    }));
  }

  function populateFilters() {
    const localities = [...new Set(data.listings.map(listing => listing.locality))].sort();
    const types = [...new Set(data.listings.map(listing => listing.type))].sort();
    const furnishings = [...new Set(data.listings.map(listing => listing.furnishing))].sort();
    document.querySelector('#locality-filter').insertAdjacentHTML('beforeend', localities.map(value => `<option value="${value}">${value}</option>`).join(''));
    document.querySelector('#type-filter').insertAdjacentHTML('beforeend', types.map(value => `<option value="${value}">${value}</option>`).join(''));
    document.querySelector('#furnishing-filter').insertAdjacentHTML('beforeend', furnishings.map(value => `<option value="${value}">${value}</option>`).join(''));
  }

  function cardTemplate(listing) {
    return `<article class="listing-card">
      <button class="listing-image" data-id="${listing.id}" aria-label="View details for ${listing.title}" style="--listing-image: url('${listing.image}')"><span>${listing.available}</span></button>
      <div class="listing-body"><div class="listing-meta"><span>${listing.locality}</span><span>${listing.type}</span></div><h3>${listing.title}</h3><div class="listing-price"><strong>${money(listing.rent)}</strong><span>/ month</span></div><p>${listing.furnishing} · ${listing.landmark}</p><div class="tag-row">${listing.tags.map(tag => `<span>${tag}</span>`).join('')}</div><button class="text-button" data-id="${listing.id}">See home details <span aria-hidden="true">&#8594;</span></button></div>
    </article>`;
  }

  function renderListings() {
    const locality = document.querySelector('#locality-filter').value;
    const type = document.querySelector('#type-filter').value;
    const furnishing = document.querySelector('#furnishing-filter').value;
    const budget = Number(document.querySelector('#budget-filter').value || Infinity);
    const matches = data.listings.filter(listing => (!locality || listing.locality === locality) && (!type || listing.type === type) && (!furnishing || listing.furnishing === furnishing) && listing.rent <= budget);
    listingGrid.innerHTML = matches.map(cardTemplate).join('');
    resultsCount.textContent = `${matches.length} home${matches.length === 1 ? '' : 's'}`;
    emptyState.hidden = matches.length > 0;
    listingGrid.querySelectorAll('[data-id]').forEach(button => button.addEventListener('click', () => openDetails(Number(button.dataset.id))));
  }

  function openDetails(id) {
    const listing = data.listings.find(item => item.id === id);
    if (!listing) return;
    dialogContent.innerHTML = `<div class="detail-image" style="--listing-image: url('${listing.image}')"><span>${listing.available}</span></div><p class="eyebrow">${listing.locality} · ${listing.type}</p><h2 id="dialog-title">${listing.title}</h2><div class="detail-price"><strong>${money(listing.rent)}</strong><span>per month · ${listing.deposit} deposit</span></div><dl class="facts"><div><dt>Furnishing</dt><dd>${listing.furnishing}</dd></div><div><dt>Nearby</dt><dd>${listing.landmark}</dd></div></dl><div class="detail-tags">${listing.tags.map(tag => `<span>${tag}</span>`).join('')}</div><div class="contact-actions"><a role="button" href="${whatsappUrl(listing)}" target="_blank" rel="noreferrer">WhatsApp lister</a><a class="outline-button" href="tel:+${listing.phone}">Call ${listing.phone.slice(-4)}</a></div><small class="review-note">This listing was reviewed before publication. Please verify details during your visit.</small>`;
    dialog.showModal();
  }

    document.querySelector('#share-site').addEventListener('click', async event => {
      const button = event.currentTarget;
      const shareData = { title: 'NammaNest', text: 'Find a rental home in Bengaluru on NammaNest.', url: window.location.href };
      try {
        if (navigator.share) {
          await navigator.share(shareData);
        } else {
          await navigator.clipboard.writeText(window.location.href);
          button.innerHTML = 'Link copied <span aria-hidden="true">&#10003;</span>';
          setTimeout(() => { button.innerHTML = 'Share this site <span aria-hidden="true">&#8599;</span>'; }, 2200);
        }
      } catch (error) {
        if (error.name !== 'AbortError') button.textContent = 'Copy the browser link';
      }
    });

  filters.addEventListener('input', renderListings);
  filters.addEventListener('reset', () => setTimeout(renderListings));
  document.querySelector('#dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  renderLocalities();
  populateFilters();
  renderListings();
})();
