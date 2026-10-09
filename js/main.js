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
      planModal?.classList.remove('hidden');
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
    const alertBox = document.getElementById('modalSuccessAlert');
    if (alertBox) {
      alertBox.classList.remove('hidden');
      setTimeout(() => {
        alertBox.classList.add('hidden');
        planModal?.classList.add('hidden');
        document.body.style.overflow = '';
        planForm.reset();
      }, 2500);
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
    'BOM-GOX': 430,  'GOX-BOM': 430,
    'BOM-UDR': 620,  'UDR-BOM': 620,
    'BOM-BLR': 840,  'BLR-BOM': 840,
    'BOM-COK': 1060, 'COK-BOM': 1060,
    'BLR-COK': 360,  'COK-BLR': 360,
    'JAI-UDR': 330,  'UDR-JAI': 330,
    'BOM-JAI': 950,  'JAI-BOM': 950
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

    voucherModal.classList.remove('hidden');
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
});
