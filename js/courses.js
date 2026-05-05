/* ═══════════════════════════════════════════════
   COURSES PAGE — JavaScript
   TIERS data is loaded from js/course-data.js
   ═══════════════════════════════════════════════ */

/* ─── CONFIG ─────────────────────────────────────────────────────────────────
   UPI_ID      : your UPI address shown in the QR modal
   RAZORPAY_LINKS : one payment link per course tier
     How to create:
       1. Log in at https://dashboard.razorpay.com
       2. Go to  Payment Links → Create Payment Link
       3. Set amount (₹799 for Foundation, etc.), add description
       4. Copy the link (looks like https://rzp.io/l/xxxxxxxx)
       5. Paste it below for the right tier
──────────────────────────────────────────────────────────────────────────── */
const UPI_ID = 'dimpaltomar1992@ybl';

const RAZORPAY_LINKS = {
  foundation:  '',   /* ← paste your Foundation  ₹799  link here */
  explorer:    '',   /* ← paste your Explorer    ₹1499 link here */
  expert:      '',   /* ← paste your Expert      ₹2499 link here */
  ai_engineer: '',   /* ← paste your AI Eng.     ₹3999 link here */
};

/* ─── State ─── */
let activeTier = null;

/* ─── Tier selection ─── */
function selectTier(tier) {
  activeTier = tier;
  const data = TIERS[tier];

  /* highlight active card */
  document.querySelectorAll('.tier-card').forEach(card => card.classList.remove('active'));
  document.getElementById('btn-' + tier).classList.add('active');

  /* show curriculum section */
  const section = document.getElementById('curriculum-section');
  section.style.display = 'block';
  section.scrollIntoView({ behavior: 'smooth', block: 'start' });

  /* render header */
  const regularCount = data.modules.filter(m => !m.isProject).length;
  document.getElementById('curriculum-header').innerHTML = `
    <div>
      <h2 class="curriculum-title">${data.class} — ${data.label} Track</h2>
      <p class="curriculum-subtitle">${regularCount} modules + 1 hands-on project · First 2 modules free</p>
    </div>
    <span class="curriculum-pill" style="background:${data.pill};">
      ${data.modules.length} Items
    </span>`;

  /* render modules */
  const grid = document.getElementById('modules-grid');
  let moduleIndex = 0;
  grid.innerHTML = data.modules.map((mod, i) => {
    if (mod.isProject) {
      /* project row — always locked unless enrolled */
      const locked = `<span class="badge-lock"><i class="fas fa-lock"></i></span>`;
      return `
    <div class="module-row project-module">
      <div class="module-num project-num"><i class="fas fa-star"></i></div>
      <div class="module-icon">${mod.icon}</div>
      <div class="module-info">
        <div class="module-title project-title">${mod.title}</div>
        <div class="module-meta">
          <span><i class="fas fa-clock"></i> ${mod.duration}</span>
          <span><i class="fas fa-layer-group"></i> ${mod.lessons} lessons</span>
          <span class="project-tag"><i class="fas fa-hammer"></i> Hands-on Project</span>
        </div>
      </div>
      <div class="module-status">${locked}</div>
    </div>`;
    }

    moduleIndex++;
    const free = moduleIndex <= 2;
    const rowCls = free ? 'module-row free-module' : 'module-row locked-module';
    const status = free
      ? `<span class="badge-free">FREE</span>
         <a href="post.html?tier=${tier}&module=${i}" class="btn-start">
           <i class="fas fa-play"></i> Start
         </a>`
      : `<span class="badge-lock"><i class="fas fa-lock"></i></span>`;

    return `
    <div class="${rowCls}">
      <div class="module-num">${String(moduleIndex).padStart(2, '0')}</div>
      <div class="module-icon">${mod.icon}</div>
      <div class="module-info">
        <div class="module-title">${mod.title}</div>
        <div class="module-meta">
          <span><i class="fas fa-clock"></i> ${mod.duration}</span>
          <span><i class="fas fa-layer-group"></i> ${mod.lessons} lessons</span>
        </div>
      </div>
      <div class="module-status">${status}</div>
    </div>`;
  }).join('');

  /* render unlock price */
  document.getElementById('unlock-price').innerHTML = `
    <span class="price-label">Full Course</span>
    <span class="price-original">${data.original}</span>
    <span class="price-final">${data.price}</span>
    <span class="price-note">one-time · lifetime access</span>`;
}

/* ─── Payment modal ─── */
function openPayment() {
  if (!activeTier) return;
  const data = TIERS[activeTier];

  document.getElementById('modal-course-name').textContent =
    `${data.class} · ${data.label} Track — Complete Course`;
  document.getElementById('modal-original').textContent = data.original;
  document.getElementById('modal-price').textContent = data.price;

  /* always start on step 1 */
  showEnrollStep();

  const overlay = document.getElementById('modal-overlay');
  const modal = document.getElementById('payment-modal');
  requestAnimationFrame(() => {
    overlay.classList.add('open');
    modal.classList.add('open');
  });
  document.body.style.overflow = 'hidden';
}

function closePayment() {
  const overlay = document.getElementById('modal-overlay');
  const modal = document.getElementById('payment-modal');
  overlay.classList.remove('open');
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

/* ─── Razorpay: open payment link ─── */
function openRazorpay() {
  if (!activeTier) return;
  const link = RAZORPAY_LINKS[activeTier];

  if (!link) {
    /* No link set yet — fall through to UPI QR as fallback */
    showUpiStep();
    return;
  }

  /* Open Razorpay payment page in a new tab */
  window.open(link, '_blank', 'noopener,noreferrer');

  /* After a short delay, show the "already paid" notice inside the modal */
  setTimeout(() => {
    const btn = document.getElementById('rzp-pay-btn');
    if (btn) {
      btn.innerHTML = `<i class="fas fa-check-circle" style="color:#4ade80;margin-right:8px;"></i>
        Payment page opened — complete payment there, then wait for your activation code.`;
      btn.classList.add('rzp-done');
      btn.onclick = null;
    }
  }, 800);
}

/* ─── Step switching ─── */
function showUpiStep() {
  if (!activeTier) return;
  const data = TIERS[activeTier];

  document.getElementById('upi-amount-display').textContent = data.price;
  document.getElementById('upi-id-text').textContent = UPI_ID;

  document.getElementById('modal-step-1').style.display = 'none';
  document.getElementById('modal-step-2').style.display = 'block';

  /* scroll modal to top */
  document.getElementById('payment-modal').scrollTop = 0;
}

function showEnrollStep() {
  document.getElementById('modal-step-2').style.display = 'none';
  document.getElementById('modal-step-1').style.display = 'block';
  document.getElementById('payment-modal').scrollTop = 0;
}

/* ─── Copy UPI ID ─── */
function copyUpiId() {
  navigator.clipboard.writeText(UPI_ID).then(() => {
    const btn = document.getElementById('upi-copy-btn');
    btn.classList.add('copied');
    btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
    setTimeout(() => {
      btn.classList.remove('copied');
      btn.innerHTML = '<i class="fas fa-copy"></i> Copy';
    }, 2000);
  }).catch(() => {
    alert('Could not copy automatically. UPI ID: ' + UPI_ID);
  });
}

/* ─── Notify after payment ─── */
function handlePayment() {
  if (!activeTier) return;
  const data = TIERS[activeTier];
  const subject = encodeURIComponent(`[TechGurukul] Payment Done — ${data.label} (${data.class})`);
  const body = encodeURIComponent(
    `Hi Lavlesh,\n\nI have completed the UPI payment for the ${data.label} AI Course (${data.class}).\n\nAmount paid: ${data.price}\nUPI ID paid to: ${UPI_ID}\n\nPlease verify and activate my access.\n\nThank you!`
  );
  window.open(`mailto:duke.lavlesh@gmail.com?subject=${subject}&body=${body}`, '_blank');
  closePayment();
}

/* close modal on Escape */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closePayment();
});

/* ─── Mobile hamburger (courses page has its own navbar instance) ─── */
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.getElementById('nav-links');

if (hamburger && navLinksEl) {
  hamburger.addEventListener('click', () => {
    const open = navLinksEl.classList.toggle('open');
    hamburger.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  navLinksEl.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinksEl.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', false);
      document.body.style.overflow = '';
    });
  });
}

/* ─── Footer year ─── */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ─── Auto-select tier + open payment if ?enroll=TIER in URL ─── */
document.addEventListener('DOMContentLoaded', () => {
  const enrollParam = new URLSearchParams(window.location.search).get('enroll');
  if (enrollParam && TIERS[enrollParam]) {
    selectTier(enrollParam);
    /* small delay so the curriculum section finishes rendering */
    setTimeout(openPayment, 300);
  }
});
