/**
 * AI Travel Agent — script.js
 * Full interactive JavaScript: loader, navbar, animations,
 * testimonial slider, FAQ accordion, counter, filters, modals & chat
 */

/* ============================================================
   1. PAGE LOADER
   ============================================================ */
window.addEventListener('load', function () {
  const loader = document.getElementById('loader');
  // Let the bar fill animation play (~1.8s), then fade out
  setTimeout(function () {
    loader.classList.add('hidden');
    // Start counter animations after loader
    startCounters();
    // Trigger initial reveal for elements in viewport
    revealOnScroll();
  }, 2000);
});

/* ============================================================
   2. NAVBAR — sticky + transparent/white on scroll
   ============================================================ */
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', function () {
  // Navbar scroll style
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Back to top button
  const btt = document.getElementById('backToTop');
  if (window.scrollY > 400) {
    btt.classList.add('visible');
  } else {
    btt.classList.remove('visible');
  }

  // Active nav link based on scroll position
  updateActiveNav();

  // Reveal on scroll
  revealOnScroll();
});

// Smooth scroll for all anchor nav links
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Close mobile menu if open
      closeMobileMenu();
    }
  });
});

/**
 * Highlight active nav link based on current scroll position.
 */
function updateActiveNav() {
  const sections = ['home', 'about', 'services', 'destinations', 'packages', 'testimonials', 'contact'];
  const scrollPos = window.scrollY + 100;

  sections.forEach(function (id) {
    const section = document.getElementById(id);
    if (!section) return;
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const link = document.querySelector('.nav-link[href="#' + id + '"]');
    if (link) {
      if (scrollPos >= top && scrollPos < bottom) {
        navLinks.forEach(function (l) { l.classList.remove('active'); });
        link.classList.add('active');
      }
    }
  });
}

/* ============================================================
   3. HAMBURGER MENU (mobile)
   ============================================================ */
const hamburger = document.getElementById('hamburger');
const navLinksContainer = document.getElementById('navLinks');

hamburger.addEventListener('click', function () {
  hamburger.classList.toggle('open');
  navLinksContainer.classList.toggle('open');
});

function closeMobileMenu() {
  hamburger.classList.remove('open');
  navLinksContainer.classList.remove('open');
}

/* ============================================================
   4. SCROLL REVEAL ANIMATION
   ============================================================ */
function revealOnScroll() {
  const reveals = document.querySelectorAll('.reveal');
  reveals.forEach(function (el) {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      el.classList.add('visible');
    }
  });
}

/* ============================================================
   5. ANIMATED COUNTER (hero stats)
   ============================================================ */
function startCounters() {
  const counters = document.querySelectorAll('.stat-num');
  counters.forEach(function (counter) {
    const target = parseInt(counter.getAttribute('data-target'), 10);
    const duration = 1800;
    const step = Math.ceil(target / (duration / 16));
    let current = 0;

    const timer = setInterval(function () {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      counter.textContent = current.toLocaleString();
    }, 16);
  });
}

/* ============================================================
   6. HERO SEARCH — full destination database with fuzzy match
   ============================================================ */

// Extended destination database — covers popular searches including India
var allDestinations = [
  { name: 'Paris', country: 'France', region: 'Europe', emoji: '🗼', price: '$899', days: '7 Days', tags: ['paris','france','eiffel','europe','romantic','honeymoon'] },
  { name: 'Dubai', country: 'UAE', region: 'Middle East', emoji: '🌆', price: '$799', days: '5 Days', tags: ['dubai','uae','emirates','desert','luxury','shopping'] },
  { name: 'Bali', country: 'Indonesia', region: 'Asia', emoji: '🌺', price: '$649', days: '6 Days', tags: ['bali','indonesia','beach','surf','temple','tropical'] },
  { name: 'Switzerland', country: 'Switzerland', region: 'Europe', emoji: '🏔️', price: '$1299', days: '8 Days', tags: ['switzerland','alps','snow','ski','zurich','geneva','interlaken'] },
  { name: 'Maldives', country: 'Maldives', region: 'Indian Ocean', emoji: '🐠', price: '$1599', days: '7 Days', tags: ['maldives','overwater','bungalow','coral','snorkelling','island'] },
  { name: 'Japan', country: 'Japan', region: 'Asia', emoji: '🌸', price: '$1099', days: '9 Days', tags: ['japan','tokyo','kyoto','cherry','blossom','fuji','anime','asia'] },
  { name: 'Goa', country: 'India', region: 'South Asia', emoji: '🏖️', price: '$349', days: '5 Days', tags: ['goa','india','beach','party','nightlife','portuguese','south asia'] },
  { name: 'Rajasthan', country: 'India', region: 'South Asia', emoji: '🏰', price: '$399', days: '7 Days', tags: ['rajasthan','india','jaipur','jodhpur','udaipur','palace','desert','camel','heritage'] },
  { name: 'Kerala', country: 'India', region: 'South Asia', emoji: '🌿', price: '$379', days: '6 Days', tags: ['kerala','india','backwaters','houseboat','spice','tea','munnar','south asia'] },
  { name: 'Agra', country: 'India', region: 'South Asia', emoji: '🕌', price: '$299', days: '3 Days', tags: ['agra','india','taj mahal','mughal','wonder','heritage'] },
  { name: 'Himachal Pradesh', country: 'India', region: 'South Asia', emoji: '⛰️', price: '$449', days: '7 Days', tags: ['himachal','manali','shimla','india','mountains','snow','trekking','adventure'] },
  { name: 'New York', country: 'USA', region: 'North America', emoji: '🗽', price: '$1199', days: '7 Days', tags: ['new york','nyc','usa','america','statue of liberty','times square','broadway'] },
  { name: 'London', country: 'UK', region: 'Europe', emoji: '🎡', price: '$1099', days: '7 Days', tags: ['london','uk','england','buckingham','big ben','europe','thames'] },
  { name: 'Singapore', country: 'Singapore', region: 'Asia', emoji: '🦁', price: '$799', days: '5 Days', tags: ['singapore','gardens','merlion','marina bay','asia','city'] },
  { name: 'Thailand', country: 'Thailand', region: 'Asia', emoji: '🐘', price: '$699', days: '8 Days', tags: ['thailand','bangkok','phuket','pattaya','temple','beach','asia','elephant'] },
  { name: 'Greece', country: 'Greece', region: 'Europe', emoji: '🏛️', price: '$1149', days: '9 Days', tags: ['greece','santorini','athens','mykonos','aegean','mediterranean','europe'] },
  { name: 'Italy', country: 'Italy', region: 'Europe', emoji: '🍕', price: '$1249', days: '10 Days', tags: ['italy','rome','venice','florence','colosseum','pizza','europe'] },
  { name: 'Australia', country: 'Australia', region: 'Oceania', emoji: '🦘', price: '$1499', days: '12 Days', tags: ['australia','sydney','melbourne','opera house','reef','outback'] },
  { name: 'New Zealand', country: 'New Zealand', region: 'Oceania', emoji: '🥝', price: '$1699', days: '11 Days', tags: ['new zealand','auckland','hobbiton','fjord','adventure','bungee'] },
  { name: 'Canada', country: 'Canada', region: 'North America', emoji: '🍁', price: '$1399', days: '10 Days', tags: ['canada','toronto','vancouver','niagara','rockies','aurora'] },
  { name: 'Sri Lanka', country: 'Sri Lanka', region: 'South Asia', emoji: '🌊', price: '$499', days: '7 Days', tags: ['sri lanka','colombo','sigiriya','kandy','tea','beach','south asia'] },
  { name: 'Nepal', country: 'Nepal', region: 'South Asia', emoji: '🏔️', price: '$549', days: '8 Days', tags: ['nepal','kathmandu','everest','trek','himalaya','adventure','south asia'] },
  { name: 'Egypt', country: 'Egypt', region: 'Africa', emoji: '🐪', price: '$799', days: '7 Days', tags: ['egypt','cairo','pyramids','sphinx','nile','pharaoh','desert'] },
  { name: 'South Africa', country: 'South Africa', region: 'Africa', emoji: '🦁', price: '$1199', days: '10 Days', tags: ['south africa','safari','cape town','johannesburg','kruger'] },
  { name: 'Turkey', country: 'Turkey', region: 'Europe/Asia', emoji: '🕌', price: '$899', days: '8 Days', tags: ['turkey','istanbul','cappadocia','balloon','bosphorus','hagia','europe'] },
  { name: 'Morocco', country: 'Morocco', region: 'Africa', emoji: '🪔', price: '$749', days: '7 Days', tags: ['morocco','marrakech','sahara','desert','medina','casablanca','africa'] },
  { name: 'Spain', country: 'Spain', region: 'Europe', emoji: '💃', price: '$1099', days: '9 Days', tags: ['spain','barcelona','madrid','sagrada','gaudi','flamenco','europe'] },
  { name: 'Vietnam', country: 'Vietnam', region: 'Asia', emoji: '🛵', price: '$599', days: '9 Days', tags: ['vietnam','hanoi','hoi an','halong','bay','street food','asia'] },
  { name: 'Philippines', country: 'Philippines', region: 'Asia', emoji: '🏝️', price: '$649', days: '8 Days', tags: ['philippines','palawan','boracay','island','beach','asia'] },
  { name: 'Bhutan', country: 'Bhutan', region: 'South Asia', emoji: '🏯', price: '$1299', days: '7 Days', tags: ['bhutan','thimphu','paro','monastery','happiness','himalaya','south asia'] }
];

function searchDestinations(query) {
  var q = query.toLowerCase().trim();
  if (!q) return [];
  // Match if any tag or name/country/region includes the query string
  return allDestinations.filter(function (d) {
    return (
      d.name.toLowerCase().includes(q) ||
      d.country.toLowerCase().includes(q) ||
      d.region.toLowerCase().includes(q) ||
      d.tags.some(function (t) { return t.includes(q); })
    );
  });
}

function handleSearch() {
  var query = document.getElementById('heroSearch').value.trim();
  if (!query) {
    showToast('Please enter a destination to search.');
    return;
  }
  var results = searchDestinations(query);
  showSearchResults(query, results);
}

function showSearchResults(query, results) {
  var box = document.getElementById('searchResults');
  if (!box) return;

  if (results.length === 0) {
    // Not in database — show "we can plan it" card
    box.innerHTML =
      '<div class="sr-header"><i class="fas fa-search"></i> No exact match for "<strong>' + query + '</strong>"</div>' +
      '<div class="sr-item sr-custom">' +
        '<div class="sr-emoji">✈️</div>' +
        '<div class="sr-info">' +
          '<strong>Plan a custom trip to ' + query + '</strong>' +
          '<span>Our AI can plan any destination! Chat with AI or fill the contact form.</span>' +
        '</div>' +
        '<div class="sr-actions">' +
          '<button class="sr-btn sr-btn-primary" onclick="closeSearchResults();toggleChat()">Chat with AI</button>' +
          '<button class="sr-btn sr-btn-outline" onclick="closeSearchResults();scrollToSection(\'contact\')">Book Now</button>' +
        '</div>' +
      '</div>';
    box.classList.add('open');
    return;
  }

  var html = '<div class="sr-header"><i class="fas fa-map-marker-alt"></i> ' + results.length + ' destination' + (results.length > 1 ? 's' : '') + ' found for "<strong>' + query + '</strong>"</div>';
  results.slice(0, 5).forEach(function (d) {
    var isKnown = destData.hasOwnProperty(d.name);
    html +=
      '<div class="sr-item">' +
        '<div class="sr-emoji">' + d.emoji + '</div>' +
        '<div class="sr-info">' +
          '<strong>' + d.name + ', ' + d.country + '</strong>' +
          '<span>' + d.region + ' &nbsp;·&nbsp; ' + d.days + ' &nbsp;·&nbsp; From ' + d.price + '</span>' +
        '</div>' +
        '<div class="sr-actions">' +
          (isKnown
            ? '<button class="sr-btn sr-btn-primary" onclick="closeSearchResults();exploreDest(\'' + d.name + '\')">Explore</button>'
            : '<button class="sr-btn sr-btn-primary" onclick="closeSearchResults();toggleChat()">Plan with AI</button>') +
          '<button class="sr-btn sr-btn-outline" onclick="closeSearchResults();scrollToSection(\'contact\')">Book</button>' +
        '</div>' +
      '</div>';
  });
  if (results.length > 5) {
    html += '<div class="sr-more">+ ' + (results.length - 5) + ' more results — <a onclick="closeSearchResults();scrollToSection(\'destinations\')" style="cursor:pointer;color:#3b82f6">view all destinations</a></div>';
  }

  box.innerHTML = html;
  box.classList.add('open');
}

function closeSearchResults() {
  var box = document.getElementById('searchResults');
  if (box) box.classList.remove('open');
}

// Close search results when clicking outside
document.addEventListener('click', function (e) {
  var wrapper = document.querySelector('.hero-search');
  if (wrapper && !wrapper.contains(e.target)) {
    closeSearchResults();
  }
});

// Live search on input (show suggestions while typing)
document.addEventListener('DOMContentLoaded', function () {
  var searchInput = document.getElementById('heroSearch');
  if (searchInput) {
    searchInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') handleSearch();
      if (e.key === 'Escape') closeSearchResults();
    });
    searchInput.addEventListener('input', function () {
      var q = this.value.trim();
      if (q.length >= 2) {
        var results = searchDestinations(q);
        showSearchResults(q, results);
      } else {
        closeSearchResults();
      }
    });
  }
});

/* ============================================================
   7. TESTIMONIALS SLIDER
   ============================================================ */
let currentSlide = 0;
const totalSlides = 5;
let autoSlideTimer = null;

// Build slider dots
(function initSlider() {
  const dotsContainer = document.getElementById('sliderDots');
  if (!dotsContainer) return;
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('button');
    dot.classList.add('dot');
    dot.setAttribute('aria-label', 'Slide ' + (i + 1));
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', function () {
      goToSlide(i);
    });
    dotsContainer.appendChild(dot);
  }
  startAutoSlide();
})();

function getSlideWidth() {
  const card = document.querySelector('.testi-card');
  if (!card) return 400;
  return card.offsetWidth + 24; // card width + gap
}

function goToSlide(index) {
  currentSlide = index;
  const track = document.getElementById('testimonialsTrack');
  if (!track) return;
  track.style.transform = 'translateX(-' + (currentSlide * getSlideWidth()) + 'px)';

  // Update dots
  document.querySelectorAll('.dot').forEach(function (d, i) {
    d.classList.toggle('active', i === currentSlide);
  });
}

function slideTestimonials(dir) {
  currentSlide = (currentSlide + dir + totalSlides) % totalSlides;
  goToSlide(currentSlide);
  resetAutoSlide();
}

function startAutoSlide() {
  autoSlideTimer = setInterval(function () {
    currentSlide = (currentSlide + 1) % totalSlides;
    goToSlide(currentSlide);
  }, 4500);
}

function resetAutoSlide() {
  clearInterval(autoSlideTimer);
  startAutoSlide();
}

// Pause on hover
(function () {
  const slider = document.querySelector('.testimonials-slider');
  if (slider) {
    slider.addEventListener('mouseenter', function () { clearInterval(autoSlideTimer); });
    slider.addEventListener('mouseleave', startAutoSlide);
  }
})();

/* ============================================================
   8. FAQ ACCORDION
   ============================================================ */
document.querySelectorAll('.faq-question').forEach(function (btn) {
  btn.addEventListener('click', function () {
    const item = this.closest('.faq-item');
    const isOpen = item.classList.contains('open');

    // Close all
    document.querySelectorAll('.faq-item').forEach(function (el) {
      el.classList.remove('open');
    });

    // Toggle clicked
    if (!isOpen) {
      item.classList.add('open');
    }
  });
});

/* ============================================================
   9. PACKAGE FILTER
   ============================================================ */
document.querySelectorAll('.filter-btn').forEach(function (btn) {
  btn.addEventListener('click', function () {
    // Update active state
    document.querySelectorAll('.filter-btn').forEach(function (b) { b.classList.remove('active'); });
    this.classList.add('active');

    const filter = this.getAttribute('data-filter');
    const cards = document.querySelectorAll('.pkg-card');

    cards.forEach(function (card) {
      if (filter === 'all' || card.getAttribute('data-pkg') === filter) {
        card.style.display = 'flex';
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(function () {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
          card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        }, 50);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.95)';
        card.style.transition = 'opacity 0.3s, transform 0.3s';
        setTimeout(function () { card.style.display = 'none'; }, 300);
      }
    });
  });
});

/* ============================================================
   10. DESTINATION EXPLORE MODAL
   ============================================================ */
var destData = {
  'Paris': {
    img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=500&q=80',
    emoji: '🗼',
    tagline: 'The City of Love & Light',
    highlights: ['Eiffel Tower at sunset', 'Louvre Museum', 'Seine River cruise', 'Versailles Palace', 'Montmartre art district'],
    price: '$899',
    days: '7 Days'
  },
  'Dubai': {
    img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=500&q=80',
    emoji: '🌆',
    tagline: 'Luxury Meets Desert Magic',
    highlights: ['Burj Khalifa sky deck', 'Desert safari', 'Dubai Mall & Fountain', 'Palm Jumeirah', 'Gold Souk tour'],
    price: '$799',
    days: '5 Days'
  },
  'Bali': {
    img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=500&q=80',
    emoji: '🌺',
    tagline: 'Island of Gods',
    highlights: ['Ubud rice terraces', 'Tanah Lot temple', 'Seminyak beach', 'Kuta surf lessons', 'Mount Batur sunrise trek'],
    price: '$649',
    days: '6 Days'
  },
  'Switzerland': {
    img: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=500&q=80',
    emoji: '🏔️',
    tagline: 'Alpine Paradise',
    highlights: ['Jungfraujoch – Top of Europe', 'Interlaken adventure', 'Lucerne old town', 'Geneva lake cruise', 'Grindelwald skiing'],
    price: '$1299',
    days: '8 Days'
  },
  'Maldives': {
    img: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=500&q=80',
    emoji: '🐠',
    tagline: 'Heaven on Earth',
    highlights: ['Overwater bungalow stay', 'Coral reef snorkelling', 'Sunset dolphin cruise', 'Spa & wellness retreat', 'Private beach dining'],
    price: '$1599',
    days: '7 Days'
  },
  'Japan': {
    img: 'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=500&q=80',
    emoji: '🌸',
    tagline: 'Where Tradition Meets Future',
    highlights: ['Cherry blossom viewing', 'Mount Fuji day trip', 'Kyoto temples', 'Shibuya Crossing', 'Tsukiji fish market'],
    price: '$1099',
    days: '9 Days'
  }
};

function exploreDest(name) {
  const data = destData[name];
  if (!data) return;

  const highlightItems = data.highlights.map(function (h) {
    return '<li><i class="fas fa-check" style="color:#10b981;margin-right:8px"></i>' + h + '</li>';
  }).join('');

  document.getElementById('modalContent').innerHTML =
    '<div class="modal-content-inner">' +
      '<div style="border-radius:12px;overflow:hidden;height:200px;margin-bottom:24px">' +
        '<img src="' + data.img + '" alt="' + name + '" style="width:100%;height:100%;object-fit:cover" />' +
      '</div>' +
      '<div class="modal-icon">' + data.emoji + '</div>' +
      '<h3>' + name + '</h3>' +
      '<p style="color:#3b82f6;font-weight:600;margin-bottom:16px">' + data.tagline + '</p>' +
      '<ul style="text-align:left;margin-bottom:24px;display:flex;flex-direction:column;gap:8px;font-size:0.9rem">' + highlightItems + '</ul>' +
      '<div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">' +
        '<div style="background:#f0f4ff;padding:12px 24px;border-radius:10px;text-align:center">' +
          '<div style="font-size:0.75rem;color:#64748b;margin-bottom:2px">Starting From</div>' +
          '<div style="font-size:1.3rem;font-weight:800;color:#1d4ed8">' + data.price + '</div>' +
        '</div>' +
        '<div style="background:#f0fdf4;padding:12px 24px;border-radius:10px;text-align:center">' +
          '<div style="font-size:0.75rem;color:#64748b;margin-bottom:2px">Duration</div>' +
          '<div style="font-size:1.3rem;font-weight:800;color:#10b981">' + data.days + '</div>' +
        '</div>' +
      '</div>' +
      '<button class="btn btn-primary" style="margin-top:24px;width:100%;justify-content:center" onclick="closeModal();scrollToSection(\'contact\')">' +
        '<i class="fas fa-paper-plane"></i> Book This Trip' +
      '</button>' +
    '</div>';

  openModal();
}

function openModal() {
  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

// Close modal on Escape key
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') closeModal();
});

/* ============================================================
   11. PACKAGE BOOKING HANDLER
   ============================================================ */
function bookPackage(name) {
  // Pre-fill contact form with package name and scroll there
  const messageField = document.getElementById('message');
  if (messageField) {
    messageField.value = 'I am interested in the ' + name + ' package. Please provide more details and availability.';
  }
  scrollToSection('contact');
  showToast(name + ' selected! Complete the form below.');
}

/* ============================================================
   12. CONTACT FORM HANDLER — Formspree real email delivery
   ============================================================
   SETUP (2 steps, totally free, no account needed first):
   1. Go to https://formspree.io/new — enter YOUR email address
      (the email where YOU want to receive enquiries)
   2. Copy the form endpoint, e.g:
         https://formspree.io/f/xyzabcde
   3. Replace FORMSPREE_ENDPOINT below with that URL
   That's it — both you AND the user get an email instantly!
   ============================================================ */
var FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';
// ↑ Replace YOUR_FORM_ID with your actual id from formspree.io

function handleContactForm(e) {
  e.preventDefault();

  var form        = e.target;
  var btn         = document.getElementById('submitBtn');
  var successBox  = document.getElementById('formSuccess');
  var errorBox    = document.getElementById('formError');
  var emailInput  = document.getElementById('email');
  var nameInput   = document.getElementById('name');

  // ── Validation ──────────────────────────────────────────────
  var userName    = nameInput.value.trim();
  var userEmail   = emailInput.value.trim();
  var destination = document.getElementById('destination').value.trim();
  var msgText     = document.getElementById('message').value.trim();

  if (!userName || !userEmail || !destination) {
    showToast('Please fill in Name, Email and Destination.');
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail)) {
    showToast('Please enter a valid email address.');
    emailInput.focus();
    return;
  }

  // ── Loading state ───────────────────────────────────────────
  var originalHTML = btn.innerHTML;
  btn.innerHTML    = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  btn.disabled     = true;
  successBox.style.display = 'none';
  errorBox.style.display   = 'none';

  // ── Build form data for Formspree ───────────────────────────
  var formData = new FormData();
  formData.append('name',        userName);
  formData.append('email',       userEmail);
  formData.append('destination', destination);
  formData.append('message',     msgText || '(No message provided)');
  formData.append('_subject',    '✈️ New Travel Registration — ' + destination + ' — ' + userName);
  formData.append('_replyto',    userEmail);   // Reply-to set to user's email

  // ── Check if Formspree is configured ────────────────────────
  if (FORMSPREE_ENDPOINT.indexOf('YOUR_FORM_ID') !== -1) {
    // DEMO MODE — show success card without actually sending
    setTimeout(function () {
      btn.innerHTML = originalHTML;
      btn.disabled  = false;
      form.reset();
      document.getElementById('confirmedEmail').textContent = userEmail;
      successBox.style.display = 'flex';
      successBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      showToast('✅ Registered! (Set up Formspree to send real emails)');
      setTimeout(function () { successBox.style.display = 'none'; }, 12000);
    }, 1200);
    return;
  }

  // ── Send to Formspree (fetch API) ────────────────────────────
  fetch(FORMSPREE_ENDPOINT, {
    method:  'POST',
    body:    formData,
    headers: { 'Accept': 'application/json' }
  })
  .then(function (res) {
    if (res.ok) {
      // ── SUCCESS — real email sent ──────────────────────────
      btn.innerHTML = originalHTML;
      btn.disabled  = false;
      form.reset();
      document.getElementById('confirmedEmail').textContent = userEmail;
      successBox.style.display = 'flex';
      successBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      showToast('✅ Registered! Confirmation email sent to your inbox.');
      setTimeout(function () { successBox.style.display = 'none'; }, 14000);
    } else {
      return res.json().then(function (data) { throw data; });
    }
  })
  .catch(function (err) {
    // ── ERROR ────────────────────────────────────────────────
    btn.innerHTML = originalHTML;
    btn.disabled  = false;
    var msg = (err && err.errors)
      ? err.errors.map(function (x) { return x.message; }).join(', ')
      : 'Please try again.';
    document.getElementById('formErrorMsg').innerHTML =
      msg + ' &mdash; or email us at <a href="mailto:hello@aitravelagent.com">hello@aitravelagent.com</a>';
    errorBox.style.display = 'flex';
    errorBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    showToast('Email delivery failed. Please try again.');
    setTimeout(function () { errorBox.style.display = 'none'; }, 8000);
  });
}

/* ============================================================
   13. NEWSLETTER HANDLER
   ============================================================ */
function handleNewsletter(e) {
  e.preventDefault();
  const input = e.target.querySelector('input');
  const btn = e.target.querySelector('button');
  const email = input.value.trim();

  if (!email) return;

  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
  btn.disabled = true;

  setTimeout(function () {
    btn.innerHTML = '<i class="fas fa-check"></i> Subscribed!';
    input.value = '';
    showToast('Welcome aboard! You have subscribed to our newsletter.');
    setTimeout(function () {
      btn.innerHTML = 'Subscribe';
      btn.disabled = false;
    }, 3000);
  }, 1200);
}

/* ============================================================
   14. SCROLL TO SECTION HELPER
   ============================================================ */
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

/* ============================================================
   15. BACK TO TOP
   ============================================================ */
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ============================================================
   16. TOAST NOTIFICATION
   ============================================================ */
let toastTimer = null;

function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function () {
    toast.classList.remove('show');
  }, 3500);
}

/* ============================================================
   17. OPEN AI CHAT (watsonx)
   ============================================================ */
/* ============================================================
   17. AI CHAT PANEL — open/close + smart conversation engine
   ============================================================ */
var chatOpen = false;
var chatInitialised = false;

function toggleChat() {
  if (chatOpen) {
    closeChat();
  } else {
    openChat();
  }
}

function openChat() {
  var panel  = document.getElementById('aiChatPanel');
  var btn    = document.getElementById('aiChatBtn');
  var icon   = document.getElementById('aiChatBtnIcon');
  var tip    = document.getElementById('aiChatTooltip');
  if (!panel) return;

  panel.classList.add('open');
  chatOpen = true;
  if (icon)  { icon.className = 'fas fa-times ai-chat-icon'; }
  if (tip)   { tip.style.display = 'none'; }
  if (btn)   { btn.querySelector('.ai-chat-label').textContent = 'Close'; }

  // Focus input
  setTimeout(function () {
    var inp = document.getElementById('aiChatInput');
    if (inp) inp.focus();
  }, 300);

  // First-time: try to hand off to watsonx launcher if it exists
  if (!chatInitialised) {
    chatInitialised = true;
    tryWatsonxHandoff();
  }
}

function closeChat() {
  var panel = document.getElementById('aiChatPanel');
  var icon  = document.getElementById('aiChatBtnIcon');
  var tip   = document.getElementById('aiChatTooltip');
  var btn   = document.getElementById('aiChatBtn');
  if (!panel) return;

  panel.classList.remove('open');
  chatOpen = false;
  if (icon) { icon.className = 'fas fa-robot ai-chat-icon'; }
  if (tip)  { tip.style.display = ''; }
  if (btn)  { btn.querySelector('.ai-chat-label').textContent = 'Chat with AI'; }
}

// Try to click the watsonx-injected launcher (it appends its own floating button)
function tryWatsonxHandoff() {
  var selectors = [
    '[id*="WxoChatLauncher"]',
    '[class*="WxoChatLauncher"]',
    '[class*="wxo-chat"]',
    '[id*="wxo"]',
    '[aria-label*="watsonx"]',
    '[aria-label*="Watson"]'
  ];
  var el = null;
  selectors.forEach(function (s) {
    if (!el) el = document.querySelector(s);
  });
  if (el) {
    // Watsonx is loaded — hide their floating button (we have our own), click to open
    el.style.display = 'none'; // hide their launcher, we manage open/close
  }
}

// Smart local AI responses for common travel questions
var aiResponses = {
  greet:     ['Hi there! 👋 I\'m your AI Travel Assistant. Where would you like to go?', 'Hello! 🌍 Ready to plan your dream trip? Tell me your destination!', 'Hey! ✈️ I\'m here to help you plan the perfect journey. What\'s on your travel bucket list?'],
  flight:    ['Great choice! For flights I recommend booking 6–8 weeks in advance for the best prices. I can help you compare airlines and find deals. Which route are you considering?', 'Flights can be tricky! Economy class is most affordable, but for long-hauls consider premium economy. Tell me your departure city and destination and I\'ll guide you!'],
  hotel:     ['Hotels are my speciality! 🏨 For budget stays, try 3-star options near city centres. For luxury, I recommend 5-star resorts with all-inclusive packages. Which destination?', 'I can suggest hotels for any budget. Are you looking for a beach resort, city hotel, or boutique stay?'],
  visa:      ['Visa requirements vary by nationality and destination. For most countries, you\'ll need a valid passport (6+ months), photos, bank statements and hotel booking proof. Which country are you applying for? I\'ll give you the exact checklist!', 'Getting a visa can be easy with the right documents! Many countries now offer e-Visa or visa-on-arrival. Tell me your destination and I\'ll check the requirements for you.'],
  budget:    ['Smart budgeting! 💰 A typical 7-day trip including flights and hotels can range from $500 (budget) to $5000+ (luxury). I\'ll help you plan within your budget. What\'s your approximate budget range?', 'Budget travel tip: fly mid-week, book 2+ months ahead, choose local guesthouses, eat at local restaurants. What\'s your budget and destination?'],
  package:   ['We have three packages: 🌱 Basic ($499), ⭐ Premium ($1,199) and 👑 Luxury ($3,499). All include flights, hotel and transfers. Which one interests you?', 'Our packages are fully customisable! Basic for 5 days, Premium for 8 days, Luxury for 14 days. All include insurance. Want me to break down what\'s included?'],
  india:     ['India is incredible! 🇮🇳 Popular destinations include Rajasthan (palaces & desert), Kerala (backwaters), Goa (beaches), Agra (Taj Mahal) and Himachal Pradesh (mountains). Which region interests you?', 'India has something for everyone! Heritage sites, beaches, mountains, backwaters and spices. I recommend 10–14 days to cover multiple regions. What\'s your starting city?'],
  bali:      ['Bali is magical! 🌺 Best time is April–September. Must-sees: Ubud rice terraces, Tanah Lot temple, Seminyak beach. Our Bali package starts at $649/person for 6 days. Interested?'],
  paris:     ['Paris — the City of Love! 🗼 Best time is April–October. Must-sees: Eiffel Tower, Louvre, Versailles, Montmartre. Our Paris package starts at $899. Want to explore it?'],
  dubai:     ['Dubai is stunning! 🌆 Best time is November–March. Must-sees: Burj Khalifa, desert safari, Palm Jumeirah. Package from $799 for 5 days. Shall I give you full details?'],
  japan:     ['Japan is breathtaking! 🌸 Best time for cherry blossoms is March–May. Must-sees: Tokyo, Kyoto, Fuji, Nara. Our Japan package starts at $1099 for 9 days. Interested?'],
  maldives:  ['Maldives is pure paradise! 🐠 Best time is November–April. Overwater bungalows, crystal lagoons, coral reefs. Package from $1,599 for 7 days. Want to know more?'],
  insurance: ['Travel insurance is a must! 🛡️ Our comprehensive policy covers medical emergencies, trip cancellation, lost baggage, and evacuation. It\'s included in Premium and Luxury packages. Need a standalone quote?'],
  weather:   ['Weather varies by destination and season! To get the best experience: Bali (Apr–Sep), Dubai (Nov–Mar), Japan (Mar–May), Maldives (Nov–Apr), Paris (Apr–Oct), Switzerland (Dec–Mar). Which destination would you like weather info for?'],
  food:      ['Food is a huge part of travel! 🍜 Each destination has iconic dishes: Japan (sushi/ramen), Italy (pizza/pasta), India (curry/biryani), Thailand (pad thai/mango rice), Morocco (tagine/couscous). Which cuisine excites you most?'],
  default:   ['That\'s a great question! 🤔 Let me help you. Could you tell me more about your destination and travel dates so I can give you the best advice?', 'I\'m here to help plan your perfect trip! Tell me your destination, budget and travel dates and I\'ll create a personalised itinerary for you.', 'Interesting! For the most accurate answer, please share your destination and I\'ll provide detailed information about flights, hotels, visa and local tips.']
};

function getAiResponse(msg) {
  var m = msg.toLowerCase();
  if (/^(hi|hello|hey|hola|namaste|greet|good morning|good afternoon|good evening)/i.test(m)) return rand(aiResponses.greet);
  if (/flight|fly|airline|airport/i.test(m))         return rand(aiResponses.flight);
  if (/hotel|resort|stay|accommodation|room/i.test(m)) return rand(aiResponses.hotel);
  if (/visa|passport|document|permit/i.test(m))        return rand(aiResponses.visa);
  if (/budget|cheap|affordable|cost|price|money|expensive/i.test(m)) return rand(aiResponses.budget);
  if (/package|plan|itinerary|tour/i.test(m))          return rand(aiResponses.package);
  if (/india|goa|kerala|rajasthan|agra|mumbai|delhi|himachal|jaipur|varanasi/i.test(m)) return rand(aiResponses.india);
  if (/bali|indonesia/i.test(m))       return rand(aiResponses.bali);
  if (/paris|france/i.test(m))         return rand(aiResponses.paris);
  if (/dubai|uae|emirates/i.test(m))   return rand(aiResponses.dubai);
  if (/japan|tokyo|kyoto/i.test(m))    return rand(aiResponses.japan);
  if (/maldives/i.test(m))             return rand(aiResponses.maldives);
  if (/insurance|insure|medical/i.test(m)) return rand(aiResponses.insurance);
  if (/weather|season|best time|when to/i.test(m)) return rand(aiResponses.weather);
  if (/food|eat|cuisine|restaurant|dish/i.test(m)) return rand(aiResponses.food);
  // Generic destination catch — check allDestinations
  var matched = allDestinations.find(function (d) {
    return m.includes(d.name.toLowerCase()) || d.tags.some(function (t) { return m.includes(t); });
  });
  if (matched) {
    return '✈️ ' + matched.emoji + ' **' + matched.name + ', ' + matched.country + '** is a wonderful choice! It\'s a ' + matched.days + ' trip starting from ' + matched.price + '/person. Click the Explore button on the destination card or fill our contact form to book. Want more details?';
  }
  return rand(aiResponses.default);
}

function rand(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

function appendMessage(who, text) {
  var msgs    = document.getElementById('aiMessages');
  var welcome = document.getElementById('aiWelcome');
  if (!msgs) return;

  // Hide welcome on first real message exchange
  if (welcome) welcome.style.display = 'none';
  msgs.style.display = 'flex';

  var div = document.createElement('div');
  div.className = 'ai-msg ' + (who === 'user' ? 'ai-msg-user' : 'ai-msg-bot');
  // Simple markdown-style bold: **text** → <strong>
  var formatted = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  div.innerHTML = (who === 'bot' ? '<div class="ai-msg-avatar"><i class="fas fa-robot"></i></div>' : '') + '<div class="ai-msg-bubble">' + formatted + '</div>';
  msgs.appendChild(div);

  // Scroll to bottom
  var body = document.getElementById('aiChatBody');
  if (body) body.scrollTop = body.scrollHeight;
}

function sendAiMessage() {
  var inp = document.getElementById('aiChatInput');
  if (!inp) return;
  var msg = inp.value.trim();
  if (!msg) return;

  inp.value = '';
  appendMessage('user', msg);

  // Typing indicator
  var typingId = 'typing-' + Date.now();
  var msgs = document.getElementById('aiMessages');
  var welcome = document.getElementById('aiWelcome');
  if (welcome) welcome.style.display = 'none';
  if (msgs) {
    msgs.style.display = 'flex';
    var typing = document.createElement('div');
    typing.id = typingId;
    typing.className = 'ai-msg ai-msg-bot ai-typing';
    typing.innerHTML = '<div class="ai-msg-avatar"><i class="fas fa-robot"></i></div><div class="ai-msg-bubble"><span class="dot-1">●</span><span class="dot-2">●</span><span class="dot-3">●</span></div>';
    msgs.appendChild(typing);
    var body = document.getElementById('aiChatBody');
    if (body) body.scrollTop = body.scrollHeight;
  }

  // Simulate AI thinking delay
  setTimeout(function () {
    var el = document.getElementById(typingId);
    if (el) el.remove();
    appendMessage('bot', getAiResponse(msg));
  }, 900 + Math.random() * 600);
}

function sendSuggestion(btn) {
  var text = btn.textContent.replace(/[\u{1F300}-\u{1FAD6}]/gu, '').trim();
  var inp = document.getElementById('aiChatInput');
  if (inp) { inp.value = text; }
  sendAiMessage();
}

/* ============================================================
   18. HERO PARALLAX EFFECT
   ============================================================ */
window.addEventListener('scroll', function () {
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    const scrolled = window.scrollY;
    heroBg.style.transform = 'scale(1.05) translateY(' + (scrolled * 0.25) + 'px)';
  }
});

/* ============================================================
   19. SERVICE CARD STAGGER DELAY
   ============================================================ */
(function setRevealDelays() {
  document.querySelectorAll('.services-grid .reveal').forEach(function (el, i) {
    el.style.transitionDelay = (i * 0.08) + 's';
  });
  document.querySelectorAll('.destinations-grid .reveal').forEach(function (el, i) {
    el.style.transitionDelay = (i * 0.08) + 's';
  });
  document.querySelectorAll('.packages-grid .reveal').forEach(function (el, i) {
    el.style.transitionDelay = (i * 0.1) + 's';
  });
})();

/* ============================================================
   20. WINDOW RESIZE — recalculate slider
   ============================================================ */
window.addEventListener('resize', function () {
  goToSlide(currentSlide);
});

/* ============================================================
   21. INITIAL SETUP ON DOM READY
   ============================================================ */
document.addEventListener('DOMContentLoaded', function () {
  // Trigger reveal check immediately after DOM is ready (for elements already in view)
  setTimeout(revealOnScroll, 100);

  // Hero background scale-in
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    setTimeout(function () { heroBg.style.transform = 'scale(1)'; }, 100);
  }

  // Open first FAQ by default for discoverability
  const firstFaq = document.querySelector('.faq-item');
  if (firstFaq) firstFaq.classList.add('open');

  // Close mobile menu when a link is clicked
  navLinksContainer.querySelectorAll('.nav-link').forEach(function (link) {
    link.addEventListener('click', closeMobileMenu);
  });
});
