/**
 * Fly Anytime - Bespoke India Journeys
 * Interactive Client Script
 */

document.addEventListener('DOMContentLoaded', () => {
  // 0. Smooth Page Transition System & Progress Bar
  let progressBar = document.getElementById('pageTransitionBar');
  if (!progressBar) {
    progressBar = document.createElement('div');
    progressBar.id = 'pageTransitionBar';
    document.body.prepend(progressBar);
  }

  // Initial page entrance animation
  document.body.classList.remove('page-exiting');
  document.body.classList.add('page-entering');
  
  // Fast loading progress animation on entry
  progressBar.style.opacity = '1';
  progressBar.style.width = '70%';
  setTimeout(() => {
    progressBar.style.width = '100%';
    setTimeout(() => {
      progressBar.style.opacity = '0';
      setTimeout(() => {
        progressBar.style.width = '0%';
      }, 300);
    }, 150);
    document.body.classList.remove('page-entering');
    document.body.classList.add('page-ready');
  }, 100);

  // Intercept internal page navigation for silky smooth transitions
  const pageLinks = document.querySelectorAll('a[href]');
  pageLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;

    // Only intercept local page transitions, not external links or hash anchors
    const isAnchor = href.startsWith('#');
    const isExternal = href.startsWith('http://') || href.startsWith('https://') || href.startsWith('//') || href.startsWith('mailto:') || href.startsWith('tel:');
    const isBlank = link.getAttribute('target') === '_blank';

    if (!isAnchor && !isExternal && !isBlank) {
      link.addEventListener('click', (e) => {
        // Prevent default instantaneous jump
        e.preventDefault();
        const targetUrl = link.href;

        // Skip transition if navigating to current page with same hash
        if (targetUrl === window.location.href) return;

        // Animate top progress bar
        progressBar.style.opacity = '1';
        progressBar.style.width = '75%';

        // Smoothly fade out the current page
        document.body.classList.remove('page-ready');
        document.body.classList.add('page-exiting');

        // Navigate smoothly after transition completes
        setTimeout(() => {
          progressBar.style.width = '100%';
          window.location.href = targetUrl;
        }, 220);
      });
    }
  });

  // Handle browser back/forward cache restore (bfcache)
  window.addEventListener('pageshow', (event) => {
    document.body.classList.remove('page-exiting');
    document.body.classList.add('page-ready');
    if (progressBar) {
      progressBar.style.opacity = '0';
      progressBar.style.width = '0%';
    }
  });

  // 1. Mobile Menu Drawer Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuToggle');
  const mobileDrawer = document.getElementById('mobileNavDrawer');
  const mobileCloseBtn = document.getElementById('mobileCloseBtn');
  const mobileOverlay = document.getElementById('mobileNavOverlay');

  function openMobileMenu() {
    if (mobileDrawer) {
      mobileDrawer.classList.remove('translate-x-full');
      mobileOverlay?.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeMobileMenu() {
    if (mobileDrawer) {
      mobileDrawer.classList.add('translate-x-full');
      mobileOverlay?.classList.add('hidden');
      document.body.style.overflow = '';
    }
  }

  mobileMenuBtn?.addEventListener('click', openMobileMenu);
  mobileCloseBtn?.addEventListener('click', closeMobileMenu);
  mobileOverlay?.addEventListener('click', closeMobileMenu);

  // 2. Booking Console Tab Switching
  const bookingTabs = document.querySelectorAll('.booking-tab-btn');
  const fromInput = document.getElementById('searchOrigin');
  const toInput = document.getElementById('searchDest');

  bookingTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      bookingTabs.forEach(t => {
        t.classList.remove('primary-btn-3d', 'text-on-primary');
        t.classList.add('bg-surface-container', 'text-on-surface-variant');
      });
      tab.classList.remove('bg-surface-container', 'text-on-surface-variant');
      tab.classList.add('primary-btn-3d', 'text-on-primary');

      const mode = tab.getAttribute('data-tab');
      if (mode === 'flights' && fromInput && toInput) {
        fromInput.value = 'New Delhi (DEL) - Terminal 3';
        toInput.value = 'Mumbai (BOM) - VIP General Aviation';
      } else if (mode === 'heritage' && fromInput && toInput) {
        fromInput.value = 'Udaipur, Rajasthan';
        toInput.value = 'Taj Lake Palace & City Sanctuary';
      } else if (mode === 'weekend' && fromInput && toInput) {
        fromInput.value = 'Bengaluru (BLR)';
        toInput.value = 'Coorg Coffee Plantation Retreat';
      } else if (fromInput && toInput) {
        fromInput.value = 'New Delhi (DEL)';
        toInput.value = 'Jaipur, Rajasthan';
      }
    });
  });

  // 3. Filter Chips Selection in Packages Section
  const filterChips = document.querySelectorAll('.category-filter-chip');
  const packageCards = document.querySelectorAll('.package-item-card');

  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => {
        c.classList.remove('primary-btn-3d', 'text-on-primary');
        c.classList.add('bg-surface-container', 'text-on-surface-variant');
      });
      chip.classList.remove('bg-surface-container', 'text-on-surface-variant');
      chip.classList.add('primary-btn-3d', 'text-on-primary');

      const filter = chip.getAttribute('data-filter') || 'all';
      packageCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 4. Modal Sheet for "Customize Trip" / "Plan My Trip"
  const planTripBtns = document.querySelectorAll('.open-plan-modal');
  const planModal = document.getElementById('planTripModal');
  const closePlanModalBtn = document.getElementById('closePlanModal');
  const modalPackageTitle = document.getElementById('modalPackageTitle');
  const planForm = document.getElementById('planTripForm');
  const modalWhatsAppBtn = document.getElementById('modalWhatsAppBtn');

  let currentInquiryTitle = 'Bespoke India Journey';

  planTripBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      currentInquiryTitle = btn.getAttribute('data-package') || 'Bespoke India Journey';
      if (modalPackageTitle) modalPackageTitle.textContent = currentInquiryTitle;
      if (planModal) {
        planModal.scrollTop = 0;
        planModal.classList.remove('hidden');
      }
      document.body.style.overflow = 'hidden';
    });
  });

  closePlanModalBtn?.addEventListener('click', () => {
    planModal?.classList.add('hidden');
    document.body.style.overflow = '';
  });

  planModal?.addEventListener('click', (e) => {
    if (e.target === planModal) {
      planModal.classList.add('hidden');
      document.body.style.overflow = '';
    }
  });

  // Modal WhatsApp Direct Launch
  modalWhatsAppBtn?.addEventListener('click', () => {
    const waUrl = generateWhatsAppInquiryUrl({
      package: currentInquiryTitle,
      origin: document.getElementById('searchOrigin')?.value || 'Delhi',
      destination: document.getElementById('searchDest')?.value || 'Bespoke Itinerary',
      passengers: '2 Guests',
      price: 'Curated Tariff'
    });
    window.open(waUrl, '_blank');
  });

  planForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputs = planForm.querySelectorAll('input, textarea');
    const nameVal = inputs[0] ? inputs[0].value.trim() : 'Guest';
    const phoneVal = inputs[1] ? inputs[1].value.trim() : '';
    const monthVal = inputs[2] ? inputs[2].value.trim() : 'Upcoming Season';
    const prefVal = inputs[3] ? inputs[3].value.trim() : '';

    const newInquiry = {
      id: 'FA-' + Math.floor(10000 + Math.random() * 90000),
      package: currentInquiryTitle || 'Bespoke India Journey',
      name: nameVal,
      phone: phoneVal,
      month: monthVal,
      preferences: prefVal,
      status: 'Royal Concierge Assigned',
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    };

    const currentInquiries = getStoredInquiries();
    currentInquiries.unshift(newInquiry);
    saveInquiriesToStorage(currentInquiries);

    const alertBox = document.getElementById('modalSuccessAlert');
    if (alertBox) {
      alertBox.classList.remove('hidden');
      setTimeout(() => {
        alertBox.classList.add('hidden');
        planModal?.classList.add('hidden');
        document.body.style.overflow = '';
        planForm.reset();
      }, 2000);
    }
  });

  // 5. Flight Distance Matrix & Live Charter Calculation Engine
  const AIRPORT_DISTANCES = {
    'DEL-BOM': 1150, 'BOM-DEL': 1150,
    'DEL-UDR': 570,  'UDR-DEL': 570,
    'DEL-JAI': 240,  'JAI-DEL': 240,
    'DEL-GOX': 1510, 'GOX-DEL': 1510,
    'DEL-SXR': 650,  'SXR-DEL': 650,
    'DEL-IXL': 620,  'IXL-DEL': 620,
    'DEL-BLR': 1740, 'BLR-DEL': 1740,
    'DEL-COK': 2080, 'COK-DEL': 2080,
    'DEL-VNS': 680,  'VNS-DEL': 680,
    'DEL-JDH': 480,  'JDH-DEL': 480,
    'BOM-GOX': 430,  'GOX-BOM': 430,
    'BOM-UDR': 620,  'UDR-BOM': 620,
    'BOM-BLR': 840,  'BLR-BOM': 840,
    'BOM-COK': 1060, 'COK-BOM': 1060,
    'BOM-JAI': 950,  'JAI-BOM': 950,
    'BOM-VNS': 1250, 'VNS-BOM': 1250,
    'BLR-COK': 360,  'COK-BLR': 360,
    'JAI-UDR': 330,  'UDR-JAI': 330,
    'JAI-VNS': 720,  'VNS-JAI': 720,
    'UDR-VNS': 980,  'VNS-UDR': 980,
    'UDR-IXL': 1180, 'IXL-UDR': 1180,
    'IXL-BOM': 1750, 'BOM-IXL': 1750
  };

  const AIRCRAFT_DATA = {
    'light_jet': { name: 'Pilatus PC-24 / Phenom 300', speed: 750, rate: 185000, seats: 6 },
    'midsize_jet': { name: 'Bombardier Challenger 350', speed: 840, rate: 320000, seats: 9 },
    'helicopter': { name: 'AgustaWestland AW109', speed: 260, rate: 140000, seats: 6 }
  };

  function calculateCharterQuote(origin, dest, aircraftType) {
    if (origin === dest) {
      return { hours: 0.5, distanceKm: 150, formattedTime: '30 mins (Scenic Flight)', priceFormatted: '₹1,25,000' };
    }
    const key = `${origin}-${dest}`;
    const distanceKm = AIRPORT_DISTANCES[key] || 850;
    const ac = AIRCRAFT_DATA[aircraftType] || AIRCRAFT_DATA['light_jet'];
    
    // Total flight hours = distance / speed + 0.25 (taxi + pattern approach)
    let flightHours = (distanceKm / ac.speed) + 0.25;
    if (flightHours < 1.0) flightHours = 1.0;
    
    const h = Math.floor(flightHours);
    const m = Math.round((flightHours - h) * 60);
    const formattedTime = `${h} hr ${m} mins`;
    
    const totalPrice = Math.round(flightHours * ac.rate);
    const priceFormatted = '₹' + totalPrice.toLocaleString('en-IN');

    return {
      flightHours,
      distanceKm,
      formattedTime,
      totalPrice,
      priceFormatted,
      aircraftName: ac.name
    };
  }

  // Generate WhatsApp Deep Link
  function generateWhatsAppInquiryUrl(data) {
    const text = `*Fly Anytime — Royal Concierge Request* ✈️👑\n\n` +
      `• *Journey:* ${data.package || 'Private Charter'}\n` +
      `• *From:* ${data.origin || 'New Delhi'}\n` +
      `• *To:* ${data.destination || 'Udaipur'}\n` +
      `• *Duration / Distance:* ${data.duration || 'Direct VIP Slot'}\n` +
      `• *Passengers:* ${data.passengers || '2 Guests'}\n` +
      `• *Estimated Tariff:* ${data.price || 'Quote on request'}\n\n` +
      `Please connect me with our dedicated Royal Flight Director.`;
    return `https://wa.me/919876543210?text=${encodeURIComponent(text)}`;
  }

  // Hook up Live Calculator in flights.html
  const originSelect = document.getElementById('charterOriginSelect');
  const destSelect = document.getElementById('charterDestSelect');
  const aircraftSelect = document.getElementById('charterAircraftSelect');
  const quoteDuration = document.getElementById('quoteDuration');
  const quotePrice = document.getElementById('quotePrice');
  const whatsappQuoteBtn = document.getElementById('whatsappQuoteBtn');

  function updateLiveCharterQuote() {
    if (!originSelect || !destSelect) return;
    const origin = originSelect.value;
    const dest = destSelect.value;
    const acType = aircraftSelect ? aircraftSelect.value : 'light_jet';

    const quote = calculateCharterQuote(origin, dest, acType);
    if (quoteDuration) {
      quoteDuration.textContent = `${quote.formattedTime} • ${quote.distanceKm} km non-stop (${quote.aircraftName})`;
    }
    if (quotePrice) {
      quotePrice.textContent = quote.priceFormatted;
    }

    if (whatsappQuoteBtn) {
      whatsappQuoteBtn.onclick = () => {
        const url = generateWhatsAppInquiryUrl({
          package: `Private Charter: ${quote.aircraftName}`,
          origin: originSelect.options[originSelect.selectedIndex]?.text || origin,
          destination: destSelect.options[destSelect.selectedIndex]?.text || dest,
          duration: `${quote.formattedTime} (${quote.distanceKm} km)`,
          passengers: 'Private Saloon VIP',
          price: quote.priceFormatted
        });
        window.open(url, '_blank');
      };
    }
  }

  originSelect?.addEventListener('change', updateLiveCharterQuote);
  destSelect?.addEventListener('change', updateLiveCharterQuote);
  aircraftSelect?.addEventListener('change', updateLiveCharterQuote);
  
  // Initial calculation run
  updateLiveCharterQuote();

  // 6. Responsive Image Fallback Protection
  const allImages = document.querySelectorAll('img');
  allImages.forEach(img => {
    img.addEventListener('error', function() {
      if (!this.getAttribute('data-fallback-attempted')) {
        this.setAttribute('data-fallback-attempted', 'true');
        this.src = 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=80';
      }
    });
  });

  // 7. Luxury Digital Itinerary Voucher Modal & Print Engine
  const voucherModal = document.getElementById('itineraryVoucherModal');
  const closeVoucherModalBtn = document.getElementById('closeVoucherModal');
  const printVoucherBtn = document.getElementById('printVoucherBtn');
  const voucherTitle = document.getElementById('voucherTitle');
  const voucherRoute = document.getElementById('voucherRoute');
  const voucherAviation = document.getElementById('voucherAviation');
  const voucherDuration = document.getElementById('voucherDuration');
  const voucherPrice = document.getElementById('voucherPrice');
  const voucherRef = document.getElementById('voucherRef');
  const voucherWhatsAppBtn = document.getElementById('voucherWhatsAppBtn');
  const openVoucherBtns = document.querySelectorAll('.open-voucher-modal');
  const exportFlightVoucher = document.getElementById('exportFlightVoucher');

  function openVoucher(data) {
    if (!voucherModal) return;
    const randomRef = 'FA-ROYAL-' + Math.floor(1000 + Math.random() * 9000);
    if (voucherRef) voucherRef.textContent = `REF: ${randomRef}`;
    if (voucherTitle) voucherTitle.textContent = data.title || 'Bespoke Royal Itinerary';
    if (voucherRoute) voucherRoute.textContent = data.route || 'Delhi • Heritage Enclaves';
    if (voucherAviation) voucherAviation.textContent = data.aviation || 'Pilatus PC-24 / Executive Jet';
    if (voucherDuration) voucherDuration.textContent = data.duration || 'Curated Circuit';
    if (voucherPrice) voucherPrice.textContent = data.price || 'Tariff on Request';

    if (voucherWhatsAppBtn) {
      voucherWhatsAppBtn.onclick = () => {
        const url = generateWhatsAppInquiryUrl({
          package: data.title,
          origin: data.route,
          passengers: 'VIP Royal Delegation',
          price: data.price
        });
        window.open(url, '_blank');
      };
    }

    if (voucherModal) {
      voucherModal.scrollTop = 0;
      voucherModal.classList.remove('hidden');
    }
    document.body.style.overflow = 'hidden';
  }

  openVoucherBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openVoucher({
        title: btn.getAttribute('data-title') || 'Curated Royal Odyssey',
        route: btn.getAttribute('data-route') || 'Pan-India Royal Circuit',
        aviation: btn.getAttribute('data-aviation') || 'Private Aircraft Saloon',
        duration: btn.getAttribute('data-duration') || '7 Days / 6 Nights',
        price: btn.getAttribute('data-price') || '₹4,85,000 / couple'
      });
    });
  });

  exportFlightVoucher?.addEventListener('click', (e) => {
    e.preventDefault();
    const origin = originSelect ? originSelect.options[originSelect.selectedIndex]?.text : 'Delhi';
    const dest = destSelect ? destSelect.options[destSelect.selectedIndex]?.text : 'Udaipur';
    const quote = calculateCharterQuote(originSelect?.value || 'DEL', destSelect?.value || 'UDR', aircraftSelect?.value || 'light_jet');
    openVoucher({
      title: `Private Charter: ${origin} to ${dest}`,
      route: `${origin} ➔ ${dest} (${quote.distanceKm} km non-stop)`,
      aviation: quote.aircraftName,
      duration: quote.formattedTime,
      price: quote.priceFormatted
    });
  });

  closeVoucherModalBtn?.addEventListener('click', () => {
    voucherModal?.classList.add('hidden');
    document.body.style.overflow = '';
  });

  voucherModal?.addEventListener('click', (e) => {
    if (e.target === voucherModal) {
      voucherModal.classList.add('hidden');
      document.body.style.overflow = '';
    }
  });

  printVoucherBtn?.addEventListener('click', () => {
    window.print();
  });

  // 8. Service Worker Registration for PWA Offline Resilience
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js')
        .then(reg => console.log('Fly Anytime Service Worker active:', reg.scope))
        .catch(err => console.log('Service Worker registration skipped:', err));
    });
  }

  // 9. Royal Portfolio & Concierge Inquiry Persistence Engine
  const portfolioDrawer = document.getElementById('portfolioDrawer');
  const portfolioDrawerBackdrop = document.getElementById('portfolioDrawerBackdrop');
  const closePortfolioBtn = document.getElementById('closePortfolioBtn');
  const openPortfolioBtns = document.querySelectorAll('.open-portfolio-drawer');
  const tabInquiriesBtn = document.getElementById('tabInquiriesBtn');
  const tabSavedBtn = document.getElementById('tabSavedBtn');
  const inquiriesView = document.getElementById('inquiriesView');
  const savedView = document.getElementById('savedView');
  const inquiriesListContainer = document.getElementById('inquiriesListContainer');
  const savedTripsContainer = document.getElementById('savedTripsContainer');
  const clearAllInquiriesBtn = document.getElementById('clearAllInquiriesBtn');
  const portfolioBadgeElements = document.querySelectorAll('.portfolio-badge-count');

  function getStoredInquiries() {
    try {
      return JSON.parse(localStorage.getItem('fly_anytime_inquiries') || '[]');
    } catch {
      return [];
    }
  }

  function saveInquiriesToStorage(list) {
    localStorage.setItem('fly_anytime_inquiries', JSON.stringify(list));
    renderPortfolio();
  }

  function getSavedTrips() {
    try {
      return JSON.parse(localStorage.getItem('fly_anytime_saved_trips') || '[]');
    } catch {
      return [];
    }
  }

  function saveTripsToStorage(list) {
    localStorage.setItem('fly_anytime_saved_trips', JSON.stringify(list));
    renderPortfolio();
  }

  function updateBadgeCounters() {
    const inquiries = getStoredInquiries();
    const saved = getSavedTrips();
    const totalCount = inquiries.length + saved.length;
    portfolioBadgeElements.forEach(badge => {
      badge.textContent = totalCount;
      if (totalCount > 0) {
        badge.classList.remove('hidden');
        badge.classList.add('inline-flex');
      } else {
        badge.classList.add('hidden');
        badge.classList.remove('inline-flex');
      }
    });
  }

  function renderPortfolio() {
    updateBadgeCounters();
    const inquiries = getStoredInquiries();
    const saved = getSavedTrips();

    // Render Inquiries
    if (inquiriesListContainer) {
      if (inquiries.length === 0) {
        inquiriesListContainer.innerHTML = `
          <div class="p-8 text-center flex flex-col items-center justify-center gap-3 bg-surface-container rounded-2xl border border-outline-variant/30 text-on-surface-variant">
            <span class="material-symbols-outlined text-4xl text-primary/60">support_agent</span>
            <p class="text-xs font-semibold">No royal inquiries placed yet.</p>
            <p class="text-[11px] text-tertiary">Select any flight charter, palace suite, or rail journey and request a consultation to track here.</p>
          </div>
        `;
      } else {
        inquiriesListContainer.innerHTML = inquiries.map((item, idx) => `
          <div class="clay-card p-4 rounded-2xl bg-surface-bright border border-outline-variant/40 flex flex-col gap-2 relative shadow-xs">
            <div class="flex items-start justify-between gap-2">
              <div>
                <span class="text-[10px] font-mono font-bold text-primary bg-primary-fixed/50 px-2 py-0.5 rounded-md">${item.id}</span>
                <h4 class="text-sm font-bold text-on-surface mt-1">${item.package}</h4>
              </div>
              <button onclick="window.removeInquiryByIndex(${idx})" class="text-tertiary hover:text-red-600 transition-colors cursor-pointer p-1" title="Remove Inquiry">
                <span class="material-symbols-outlined text-lg">delete</span>
              </button>
            </div>
            <div class="flex items-center gap-2 text-[11px] text-on-surface-variant">
              <span class="inline-flex items-center gap-1 font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full text-[10px]">
                <span class="material-symbols-outlined text-xs">verified</span> ${item.status || 'Concierge Assigned'}
              </span>
              <span>•</span>
              <span class="text-tertiary font-mono">${item.date}</span>
            </div>
            ${item.preferences ? `<p class="text-[11px] text-tertiary line-clamp-2 italic bg-surface-container/60 p-2 rounded-lg">"${item.preferences}"</p>` : ''}
            <div class="flex items-center gap-2 pt-2 border-t border-outline-variant/20 mt-1">
              <button onclick="window.followUpWhatsApp('${item.id}', '${item.package}')" class="flex-1 py-2 px-3 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-transform active:scale-95 duration-150 cursor-pointer">
                <span class="material-symbols-outlined text-sm">chat</span>
                Concierge Chat
              </button>
              <button onclick="window.reopenVoucherForPackage('${item.package}')" class="py-2 px-3 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-bold flex items-center justify-center gap-1 border border-outline-variant/40 cursor-pointer">
                <span class="material-symbols-outlined text-sm">receipt_long</span>
                Voucher
              </button>
            </div>
          </div>
        `).join('');
      }
    }

    // Render Saved Trips
    if (savedTripsContainer) {
      if (saved.length === 0) {
        savedTripsContainer.innerHTML = `
          <div class="p-8 text-center flex flex-col items-center justify-center gap-3 bg-surface-container rounded-2xl border border-outline-variant/30 text-on-surface-variant">
            <span class="material-symbols-outlined text-4xl text-primary/60">bookmark_border</span>
            <p class="text-xs font-semibold">No saved journeys bookmarked.</p>
            <p class="text-[11px] text-tertiary">Bookmark experiences across the platform to quickly compare and review here.</p>
          </div>
        `;
      } else {
        savedTripsContainer.innerHTML = saved.map((trip, idx) => `
          <div class="clay-card p-3 rounded-2xl bg-surface-bright border border-outline-variant/40 flex items-center justify-between gap-3 shadow-xs">
            <div>
              <h4 class="text-xs font-bold text-on-surface">${trip.title}</h4>
              <p class="text-[10px] text-tertiary">${trip.route || 'Curated Itinerary'}</p>
            </div>
            <div class="flex items-center gap-1">
              <button onclick="window.reopenVoucherForPackage('${trip.title}')" class="p-1.5 rounded-lg bg-surface-container text-primary hover:bg-primary hover:text-white transition-colors cursor-pointer" title="View Voucher">
                <span class="material-symbols-outlined text-base">receipt_long</span>
              </button>
              <button onclick="window.removeSavedTripByIndex(${idx})" class="p-1.5 rounded-lg text-tertiary hover:text-red-600 transition-colors cursor-pointer" title="Remove">
                <span class="material-symbols-outlined text-base">close</span>
              </button>
            </div>
          </div>
        `).join('');
      }
    }
  }

  // Global helper functions attached to window for inline onclick handlers
  window.removeInquiryByIndex = function(index) {
    const list = getStoredInquiries();
    list.splice(index, 1);
    saveInquiriesToStorage(list);
  };

  window.removeSavedTripByIndex = function(index) {
    const list = getSavedTrips();
    list.splice(index, 1);
    saveTripsToStorage(list);
  };

  window.followUpWhatsApp = function(inquiryId, pkg) {
    const text = `*Fly Anytime — Follow Up: Inquiry ${inquiryId}* ✈️👑\n\n` +
      `Hello Royal Concierge, I am following up on my private inquiry for *${pkg}* (Ref: ${inquiryId}). Could you please share the latest flight slot clearance and briefing?`;
    window.open(`https://wa.me/919876543210?text=${encodeURIComponent(text)}`, '_blank');
  };

  window.reopenVoucherForPackage = function(pkgTitle) {
    portfolioDrawer?.classList.remove('drawer-open');
    portfolioDrawer?.classList.add('drawer-closed');
    document.body.style.overflow = '';
    openVoucher({
      title: pkgTitle,
      route: 'Curated Royal Circuit',
      aviation: 'Private Aircraft Saloon',
      duration: '7 Days / 6 Nights',
      price: 'Tariff Guidance ₹4,85,000'
    });
  };

  // Open & Close Portfolio Drawer
  openPortfolioBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      renderPortfolio();
      portfolioDrawer?.classList.remove('drawer-closed');
      portfolioDrawer?.classList.add('drawer-open');
      document.body.style.overflow = 'hidden';
    });
  });

  closePortfolioBtn?.addEventListener('click', () => {
    portfolioDrawer?.classList.remove('drawer-open');
    portfolioDrawer?.classList.add('drawer-closed');
    document.body.style.overflow = '';
  });

  portfolioDrawerBackdrop?.addEventListener('click', () => {
    portfolioDrawer?.classList.remove('drawer-open');
    portfolioDrawer?.classList.add('drawer-closed');
    document.body.style.overflow = '';
  });

  // Drawer Tabs Switching
  tabInquiriesBtn?.addEventListener('click', () => {
    tabInquiriesBtn.classList.add('bg-primary', 'text-on-primary');
    tabInquiriesBtn.classList.remove('bg-surface-container', 'text-on-surface-variant');
    tabSavedBtn?.classList.remove('bg-primary', 'text-on-primary');
    tabSavedBtn?.classList.add('bg-surface-container', 'text-on-surface-variant');
    inquiriesView?.classList.remove('hidden');
    savedView?.classList.add('hidden');
  });

  tabSavedBtn?.addEventListener('click', () => {
    tabSavedBtn.classList.add('bg-primary', 'text-on-primary');
    tabSavedBtn.classList.remove('bg-surface-container', 'text-on-surface-variant');
    tabInquiriesBtn?.classList.remove('bg-primary', 'text-on-primary');
    tabInquiriesBtn?.classList.add('bg-surface-container', 'text-on-surface-variant');
    savedView?.classList.remove('hidden');
    inquiriesView?.classList.add('hidden');
  });

  clearAllInquiriesBtn?.addEventListener('click', () => {
    if (confirm('Clear all stored inquiries from this browser?')) {
      localStorage.removeItem('fly_anytime_inquiries');
      renderPortfolio();
    }
  });

  // Seed demo inquiry if empty so traveler immediately sees the experience
  if (!localStorage.getItem('fly_anytime_inquiries_seeded')) {
    const sample = [
      {
        id: 'FA-98241',
        package: 'Royal Rajputana Odyssey',
        name: 'Maharaja Vikramaditya',
        phone: '+91 98765 43210',
        month: 'November 2025',
        preferences: 'Pilatus PC-24 Light Jet arrival into Udaipur, lake-facing Grand Suite.',
        status: 'Royal Concierge Assigned',
        date: '09 Oct 2025'
      }
    ];
    localStorage.setItem('fly_anytime_inquiries', JSON.stringify(sample));
    localStorage.setItem('fly_anytime_inquiries_seeded', 'true');
  }

  // Initial render of badges
  renderPortfolio();

  // 10. Multi-City Flight Circuit Engine
  const AIRPORT_METADATA = {
    'DEL': { city: 'New Delhi', code: 'DEL', state: 'National Capital', img: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=600&q=80' },
    'UDR': { city: 'Udaipur', code: 'UDR', state: 'Rajasthan', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCIkJrk4X-eNBj-GrmYsnkKvy09z9zNMQKPEEQUglm7xfKk48a68NMHkYw46cEx0QiZD7PHcnOvTpasVBdZ6P0BC4EvNWTu9nm741MTXOAj5rCQaeQ_yizL8CAb5ctTP11fvXXoTcxTtSDWyfcsollDuNCqTjTG-mvAcwIcwK6qtjn6ID0SYGowJ9HNqfQPhyVSCpcR6cx9yTEmJV13jLzmsBo0Txm8n3LYMYy_6Drxg4wwi-JftZVgow' },
    'JAI': { city: 'Jaipur', code: 'JAI', state: 'Rajasthan', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBlFq5P4zo_qdISRDmlMuIOWiPcKhe_zJAHU-UTu38etbR935nD1tEbAjVBl_S5Fhq_3UfC0-FXmarQfKBRmKmKbR26BrZhCv4SoHug3NCwoMs-uAblm7BLAZvSwOUaPPLA6OxNwWeQ9Fn2Jne-wBCSEYuSRWVJaXQuU6VXJOwnKBckKdZu6q7Oj90ZU9-Xz_iZxOtY6621fsyihlKJHTcFpj4TSYYA3KR5rwx5o3eQji2IiFT_dIus-g' },
    'VNS': { city: 'Varanasi', code: 'VNS', state: 'Uttar Pradesh', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAziqfiyy1THfuBNY89GGJWtTKp2mzAjRoREIN7LKX98Du8HYrAd6PLlMPR_1E7Rc2XOs_aFQ7xRH7h_uA3tgdvB45EuJ5df2qfo1bqDNXGHBRhREyOXZh6uCtj9li74yhpnvsyx5RPUxONV1IzwqPMFFoVPO0XXRliobY0e0aF0NPPoPW64UzfxF5MCVuVOiL2-hEZsalWsz4IU276dr1CGIrDsurLpoX3K1LAJcliPVcL1EOlxXCnrQ' },
    'IXL': { city: 'Leh Ladakh', code: 'IXL', state: 'Ladakh', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC2A2w7bsXHeJXTDxvJNspV02fM-FtuXIMZ_TIHHgQgcCaCwdSKEMxTZhOeCScg0s0gVwStDcNDN5BvK0ztpoz_GitHvmo59Sc5IYnFnGgg4vbIU86a5wkFKeiwfVXBCCijVWZwnyFQeGUAPxCWUKM--TJsDZEO0KEjCoHQfHs6yAOQSX1bUHmAQ6dTIwtDE2cXxX4nL-s4qj1rp7PFe6WvMLhOvRYWzsALIHYwrC_loWNeaw73Pv8azg' },
    'BOM': { city: 'Mumbai', code: 'BOM', state: 'Maharashtra', img: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=600&q=80' },
    'GOX': { city: 'Goa (Mopa)', code: 'GOX', state: 'Goa', img: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=600&q=80' },
    'BLR': { city: 'Bengaluru', code: 'BLR', state: 'Karnataka', img: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=600&q=80' },
    'COK': { city: 'Kochi', code: 'COK', state: 'Kerala', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAhQmbjpA9UQ6F1lMZMTg2GuxwINHGiApo4MFw4GwMYG5dN1RZageoIK3Uye9_ShKwx_59uuNpRaizLrmAQUcXys0yYn6yzLJsia5plKdupVt2rWByixoWDKpYPcBurht-Mhhsdp2ucuSmNbSUZdycsp1AZGZS02Gr3WHU3ZkIn-4aWIjLlK3wQz7tHHthfGVoI-uQr6xqtLTlXPE32d0ubHb1Xn8Im0gHUap0TCnUSaRKVZZDo9t3tmw' }
  };

  const MULTI_CITY_CIRCUITS = [
    {
      id: 'circuit-rajputana',
      name: 'Royal Rajputana Grand Triangle',
      stops: ['DEL', 'UDR', 'JAI', 'DEL'],
      nights: [0, 3, 2, 0],
      aircraft: 'light_jet',
      description: 'Private PC-24 charter connecting the imperial capital, Lake Pichola palace suites, and the Amber citadel in Pink City.'
    },
    {
      id: 'circuit-ghats-spirit',
      name: 'Heritage & Sacred Ghats Odyssey',
      stops: ['DEL', 'VNS', 'JAI', 'DEL'],
      nights: [0, 2, 3, 0],
      aircraft: 'midsize_jet',
      description: 'Sovereign Challenger 350 circuit from ancient Varanasi spiritual river rituals to royal Rajputana fortresses.'
    },
    {
      id: 'circuit-himalayan-desert',
      name: 'Himalayan Peaks & Thar Dunes Grand Circuit',
      stops: ['DEL', 'IXL', 'UDR', 'BOM'],
      nights: [0, 3, 3, 0],
      aircraft: 'midsize_jet',
      description: 'High-altitude Himalayan landings at 10,682 ft followed by desert palace waters and Arabian Sea arrival.'
    }
  ];

  let currentActiveCircuit = {
    stops: ['DEL', 'UDR', 'JAI', 'DEL'],
    nights: [0, 3, 2, 0],
    aircraft: 'light_jet'
  };

  function calculateMultiCityCircuit(stops, aircraftKey, nightsArr) {
    const ac = AIRCRAFT_DATA[aircraftKey] || AIRCRAFT_DATA['light_jet'];
    let totalKm = 0;
    let totalHours = 0;
    let hops = [];

    for (let i = 0; i < stops.length - 1; i++) {
      const from = stops[i];
      const to = stops[i + 1];
      const pair = `${from}-${to}`;
      const dist = AIRPORT_DISTANCES[pair] || 650;
      let legHours = (dist / ac.speed) + 0.25;
      if (legHours < 0.8) legHours = 0.8;
      totalKm += dist;
      totalHours += legHours;
      hops.push({ from, to, dist, legHours });
    }

    const totalNights = nightsArr ? nightsArr.reduce((a, b) => a + b, 0) : 5;
    const flightTariff = Math.round(totalHours * ac.rate);
    const layoverTariff = totalNights * 35000;
    const totalTariff = flightTariff + layoverTariff;

    const totalDays = totalNights + 1;
    const h = Math.floor(totalHours);
    const m = Math.round((totalHours - h) * 60);

    return {
      totalDistanceKm: totalKm,
      totalHours,
      formattedFlightTime: `${h} hrs ${m} mins aloft`,
      totalNights,
      totalDays: `${totalDays} Days / ${totalNights} Nights`,
      totalTariff,
      totalQuoteFormatted: '₹' + totalTariff.toLocaleString('en-IN'),
      aircraftName: ac.name,
      routeString: stops.map(s => AIRPORT_METADATA[s]?.city || s).join(' ➔ '),
      hops
    };
  }

  window.calculateMultiCityCircuit = calculateMultiCityCircuit;
  window.MULTI_CITY_CIRCUITS = MULTI_CITY_CIRCUITS;
  window.AIRPORT_METADATA = AIRPORT_METADATA;

  // Render Multi-City Stepper in flights.html
  const circuitStepperContainer = document.getElementById('circuitStepperContainer');
  const circuitDistanceEl = document.getElementById('circuitDistance');
  const circuitTimeEl = document.getElementById('circuitTime');
  const circuitDaysEl = document.getElementById('circuitDays');
  const circuitTariffEl = document.getElementById('circuitTariff');
  const circuitAircraftNameEl = document.getElementById('circuitAircraftName');
  const circuitPresetBtns = document.querySelectorAll('.circuit-preset-btn');
  const circuitAircraftSelect = document.getElementById('circuitAircraftSelect');
  const circuitWhatsAppBtn = document.getElementById('circuitWhatsAppBtn');
  const circuitVoucherBtn = document.getElementById('circuitVoucherBtn');

  function renderCircuitBuilder() {
    if (!circuitStepperContainer) return;
    const stats = calculateMultiCityCircuit(currentActiveCircuit.stops, currentActiveCircuit.aircraft, currentActiveCircuit.nights);

    if (circuitDistanceEl) circuitDistanceEl.textContent = `${stats.totalDistanceKm} km`;
    if (circuitTimeEl) circuitTimeEl.textContent = stats.formattedFlightTime;
    if (circuitDaysEl) circuitDaysEl.textContent = stats.totalDays;
    if (circuitTariffEl) circuitTariffEl.textContent = stats.totalQuoteFormatted;
    if (circuitAircraftNameEl) circuitAircraftNameEl.textContent = stats.aircraftName;

    // Render Nodes
    circuitStepperContainer.innerHTML = currentActiveCircuit.stops.map((code, idx) => {
      const meta = AIRPORT_METADATA[code] || { city: code, state: 'India', img: '' };
      const nights = currentActiveCircuit.nights[idx] || 0;
      const isLast = idx === currentActiveCircuit.stops.length - 1;
      return `
        <div class="flex-1 flex flex-col items-center relative z-10 group">
          <div class="circuit-stepper-node w-12 h-12 rounded-2xl bg-surface-bright border-2 border-primary flex items-center justify-center text-primary font-bold shadow-md cursor-pointer transition-transform">
            <span class="circuit-pulse-ring"></span>
            <span class="text-xs font-mono font-extrabold">${code}</span>
          </div>
          <div class="text-center mt-3">
            <p class="text-xs font-bold text-on-surface">${meta.city}</p>
            <p class="text-[10px] text-tertiary">${meta.state}</p>
            ${!isLast ? `
              <span class="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full bg-secondary-fixed/60 text-on-secondary-fixed text-[10px] font-extrabold">
                ${nights > 0 ? `${nights} Nights` : 'Direct Hop'}
              </span>
            ` : `
              <span class="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-extrabold border border-emerald-200">
                Return Base
              </span>
            `}
          </div>
        </div>
      `;
    }).join('');

    // Wire Export buttons
    if (circuitWhatsAppBtn) {
      circuitWhatsAppBtn.onclick = () => {
        const text = `*Fly Anytime — Bespoke Multi-City Circuit Request* ✈️👑\n\n` +
          `• *Expedition Route:* ${stats.routeString}\n` +
          `• *Total Distance:* ${stats.totalDistanceKm} km (${stats.formattedFlightTime})\n` +
          `• *Duration:* ${stats.totalDays}\n` +
          `• *Aviation Class:* ${stats.aircraftName}\n` +
          `• *Tariff Guidance:* ${stats.totalQuoteFormatted}\n\n` +
          `Please connect me with our Royal Flight Director to reserve airport slots and private aircraft availability.`;
        window.open(`https://wa.me/919876543210?text=${encodeURIComponent(text)}`, '_blank');
      };
    }

    if (circuitVoucherBtn) {
      circuitVoucherBtn.onclick = () => {
        openVoucher({
          title: 'Custom Multi-City Royal Circuit',
          route: stats.routeString,
          aviation: stats.aircraftName,
          duration: stats.totalDays,
          price: stats.totalQuoteFormatted
        });
      };
    }
  }

  // Preset Selection
  circuitPresetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      circuitPresetBtns.forEach(b => {
        b.classList.remove('bg-primary', 'text-on-primary', 'shadow-sm');
        b.classList.add('bg-surface-container', 'text-on-surface-variant');
      });
      btn.classList.add('bg-primary', 'text-on-primary', 'shadow-sm');
      btn.classList.remove('bg-surface-container', 'text-on-surface-variant');

      const presetId = btn.getAttribute('data-preset');
      const preset = MULTI_CITY_CIRCUITS.find(p => p.id === presetId);
      if (preset) {
        currentActiveCircuit.stops = [...preset.stops];
        currentActiveCircuit.nights = [...preset.nights];
        currentActiveCircuit.aircraft = preset.aircraft;
        if (circuitAircraftSelect) circuitAircraftSelect.value = preset.aircraft;
        renderCircuitBuilder();
      }
    });
  });

  circuitAircraftSelect?.addEventListener('change', (e) => {
    currentActiveCircuit.aircraft = e.target.value;
    renderCircuitBuilder();
  });

  // Initial render of circuit builder
  renderCircuitBuilder();
});
