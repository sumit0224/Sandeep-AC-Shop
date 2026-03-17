/* ── NAVBAR ── */
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);

    let current = '';
    sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    navLinks.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
});

/* ── HAMBURGER ── */
const ham = document.getElementById('hamburger');
const mm = document.getElementById('mobileMenu');
document.getElementById('menuClose').addEventListener('click', closeMobileMenu);
ham.addEventListener('click', () => {
    ham.classList.toggle('open');
    mm.classList.toggle('open');
    document.body.style.overflow = mm.classList.contains('open') ? 'hidden' : '';
});
function closeMobileMenu() {
    ham.classList.remove('open');
    mm.classList.remove('open');
    document.body.style.overflow = '';
}

/* ── SCROLL REVEAL ── */
const revealEls = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); } });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
revealEls.forEach(el => revealObs.observe(el));

/* ── COUNTER ANIMATION ── */
function animateCounter(el) {
    const target = parseInt(el.dataset.target);
    const duration = 1800;
    const start = performance.now();
    const update = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target);
        if (progress < 1) requestAnimationFrame(update);
        else el.textContent = target;
    };
    requestAnimationFrame(update);
}
const counterObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.querySelectorAll('.counter').forEach(animateCounter);
            counterObs.unobserve(e.target);
        }
    });
}, { threshold: 0.5 });
document.querySelectorAll('#stats .stats-grid').forEach(el => counterObs.observe(el));

/* ── FAQ ACCORDION ── */
function toggleFaq(el) {
    const item = el.parentElement;
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
}

/* ── SERVICE TABS ── */
function switchTab(btn, panelId) {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(panelId).classList.add('active');
}

/* ── ZONE TABS ── */
function switchZone(btn, zoneId) {
    document.querySelectorAll('.zone-tab').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.area-pills').forEach(p => p.style.display = 'none');
    btn.classList.add('active');
    document.getElementById(zoneId).style.display = 'flex';
}

/* ── REVIEWS DATA ── */
const reviewsData = [
    { name: 'Rahul S.', text: 'Best AC spare parts shop in Sector 149. All parts available at affordable prices. Highly recommended.', rating: 5, initial: 'RS' },
    { name: 'Amit K.', text: 'Technicians get all parts here quickly. Genuine products and very helpful staff. My go-to shop.', rating: 5, initial: 'AK' },
    { name: 'Priya M.', text: 'Found my AC compressor here when no other shop had it. Open on Sunday too. Great service!', rating: 5, initial: 'PM' },
    { name: 'Suresh T.', text: 'I am an AC technician and I buy all my spare parts from here. Best prices and genuine quality.', rating: 5, initial: 'ST' },
    { name: 'Deepak V.', text: 'PCB board for my Daikin AC was available immediately. Staff was knowledgeable and helpful.', rating: 5, initial: 'DV' },
    { name: 'Meena R.', text: 'Open late till 9PM which is very convenient. Got the capacitor I needed on the same day.', rating: 5, initial: 'MR' },
    { name: 'Vijay P.', text: 'Running a repair shop and always get bulk parts from here. Great pricing for technicians.', rating: 5, initial: 'VP' },
    { name: 'Anita B.', text: 'Very professional shop. They helped me identify the right part for my Samsung AC. Perfect service.', rating: 5, initial: 'AB' },
    { name: 'Ravi G.', text: 'Sector 149 best shop for AC spare parts. Everything genuine, prices are fair, staff is helpful.', rating: 5, initial: 'RG' },
    { name: 'Kavita L.', text: 'Fast service and genuine parts. My AC technician always recommends this shop. Very trustworthy.', rating: 5, initial: 'KL' },
];

function buildReviews() {
    const track = document.getElementById('reviewsTrack');
    const allReviews = [...reviewsData, ...reviewsData]; // duplicate for infinite
    allReviews.forEach(r => {
        const card = document.createElement('div');
        card.className = 'review-card';
        card.innerHTML = `
      <div class="review-stars">${'<span class="star">★</span>'.repeat(r.rating)}</div>
      <p class="review-text">${r.text}</p>
      <div class="review-author">
        <div class="review-avatar">${r.initial}</div>
        <div>
          <div class="review-name">${r.name}</div>
          <div class="review-date">Google Review · 5★</div>
        </div>
      </div>`;
        track.appendChild(card);
    });
}
buildReviews();

/* ── GALLERY LIGHTBOX ── */
const galleryImages = [
    'https://lh3.googleusercontent.com/gps-cs-s/AHVAwepYj2yoULegYNU9Ev0sARcrIgncQY4ji8Exzol3d9WEq-DTo9DJC2AtvmY81GgpeBu09LE5BtnqPMWMBkUSBaiwHDJp6jKp6vyhWqFH7NI_WFM5GinN33F3Ddr2NcE3LyKilQhV3syKEkJW',
    'https://lh3.googleusercontent.com/gps-cs-s/AHVAwepqSDv4YIvBxUgrfP7ChQ-JWvp30sCrdR5OuXhS16xqFYmihfqoRBxsPXgbrwPNVS1JyeLLCbFJS_TEtdP3WToV0AWISM-jG-cgty3V0jBUjEzFki3hKlK6e_h91iFmUXS4OQsdINclvO89',
    'https://lh3.googleusercontent.com/gps-cs-s/AHVAwernr5AhWYAgyKUqbIMxBG9XO8SWIs_BLjOPHd3tWmKEXAT9PR9KDlEyz8xphOCafA92Tl3pwljSbbjS9P5vENc90YPjfbCvOJqgzyUlJpH3wJf4KsRkabM5qBJtX-upo729zcI3HikT7DNn',
    'https://lh3.googleusercontent.com/gps-cs-s/AHVAweqnhmW-fiu_hcjiKgyrn-kTcvK65n6rPNmw9Wft1XBPyUjm-rifAB-zT2-drNGXd2tmSXjtCgu1swn7o0FooFljRFZTg78QztObxwqLbQU-S920zO50NLw4-WTTRJdrbDSjrJ2ogKTlKjo',
    'https://lh3.googleusercontent.com/gps-cs-s/AHVAwerKjBSMuiT1x0EBivhS5flLBBdlNQVUhY1rblvWvkbwm4klUzAgo54aXBJqG68B6GrX0CLDdFIltpZMO0NXZy__EUSZLR3W3FQ_wMjTHw3vHVfqa_JZsi7JmgxjA6Gu4fwX2O9j0CrG8nQA',
    'https://lh3.googleusercontent.com/gps-cs-s/AHVAweoIMIW2bZuubPIslbHmigLoV9Dsqh8f68BZDSu91DHDn3I8FLuXAL8-R8xQrc8BS9QJ_uwcfrF5DVFdrLD3Me_4IHgcCdC5YRTnhrWV30q9Erkd1jPiSd8efB3Kz5RfiTQdh8mcqVUAvHPm',
    'https://lh3.googleusercontent.com/gps-cs-s/AHVAwequmEdc4aFP9dXOocUFhSRywZrLVuRo4laOP1GEvyUrT94j7pPJFBrTbXgGESJyasYacmS8wk4DvlroyqSnfMWwr8y4wftSHFqyV-oSynM73j08GyWQLm_SVW131OpBNRxZMiQFlkrwdJoG',
    'https://lh3.googleusercontent.com/gps-cs-s/AHVAweoUKr1yEF5XZlW51AvsO6VOLldCB_XYLP5Y2jMD8xHYw3Nfm_Ul0RzmxEOIJaTfSVFWXeEngxRk_qNuXq3690Sw6Q3iFD0EDBAXCNmu7it7J6uT-_h10tJVpJ6X6mq0Y2j-Dj08LLqx18g',
];
let currentImg = 0;

function openLightbox(idx) {
    currentImg = idx;
    document.getElementById('lightbox-img').src = galleryImages[idx];
    document.getElementById('lightbox').classList.add('open');
    document.body.style.overflow = 'hidden';
}
function closeLightbox() {
    document.getElementById('lightbox').classList.remove('open');
    document.body.style.overflow = '';
}
function changeLightbox(dir) {
    currentImg = (currentImg + dir + galleryImages.length) % galleryImages.length;
    document.getElementById('lightbox-img').src = galleryImages[currentImg];
}
document.getElementById('lightbox').addEventListener('click', (e) => {
    if (e.target === document.getElementById('lightbox')) closeLightbox();
});
document.addEventListener('keydown', (e) => {
    if (document.getElementById('lightbox').classList.contains('open')) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') changeLightbox(-1);
        if (e.key === 'ArrowRight') changeLightbox(1);
    }
});

/* ── ENQUIRY FORM ── */
function sendEnquiry() {
    const name = document.getElementById('fname').value.trim();
    const phone = document.getElementById('fphone').value.trim();
    const part = document.getElementById('fpart').value.trim();
    if (!name || !phone) { alert('Please enter your name and phone number.'); return; }
    const msg = encodeURIComponent(`Hi! I am ${name}. My phone number is ${phone}. I would like to enquire about: ${part || 'AC service/parts'}. Please call me back with the best quote.`);
    window.open(`https://wa.me/919716613961?text=${msg}`, '_blank');
}

/* ── SMOOTH SCROLL FOR NAV ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
        const target = document.querySelector(a.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

/* ── GA4 TRACKING ── */
function trackEvent(name, params) {
    if (typeof gtag !== 'undefined') gtag('event', name, params);
}
document.querySelectorAll('a[href^="tel:"]').forEach(a => a.addEventListener('click', () => trackEvent('call_click', { shop: 'Sandeep AC Spare Parts' })));
document.querySelectorAll('a[href*="wa.me"]').forEach(a => a.addEventListener('click', () => trackEvent('whatsapp_click', { shop: 'Sandeep AC Spare Parts' })));
document.querySelectorAll('a[href*="maps"]').forEach(a => a.addEventListener('click', () => trackEvent('directions_click', { shop: 'Sandeep AC Spare Parts' })));


// <!-- GA4: Replace G-XXXXXXXXXX with your actual GA4 Measurement ID -->
// <!-- <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
// <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-XXXXXXXXXX');</script> -->

// <!-- Microsoft Clarity: Replace with your Clarity Project ID -->
// <!-- <script type="text/javascript">(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "YOUR_CLARITY_ID");</script> -->
