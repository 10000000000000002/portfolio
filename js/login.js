/* ═══════════════════════════════════════════════
   LOGIN / REGISTRATION — JavaScript
═══════════════════════════════════════════════ */

let currentPhone = '';

const ALL_STEPS = ['step-phone','step-register','step-enrolled','step-confirm','step-demo','step-demo-confirm'];

/* ─── Show a step, hide others ─── */
function showStep(id) {
  ALL_STEPS.forEach(s => {
    const el = document.getElementById(s);
    if (el) el.style.display = s === id ? 'block' : 'none';
  });
}

function goBack(stepId) {
  showStep(stepId);
}

/* ─── Step 1: Check phone ─── */
window.checkPhone = async function () {
  const input  = document.getElementById('phone-input');
  const errEl  = document.getElementById('phone-error');
  const btn    = document.getElementById('phone-btn-text');
  const phone  = input.value.trim();

  errEl.textContent = '';

  if (!/^\d{10}$/.test(phone)) {
    errEl.textContent = 'Please enter a valid 10-digit mobile number.';
    return;
  }

  currentPhone = '+91' + phone;
  btn.textContent = 'Checking…';
  document.querySelector('#step-phone .login-btn').disabled = true;

  const reg = await fsReadRegistration(currentPhone);

  btn.textContent = 'Continue';
  document.querySelector('#step-phone .login-btn').disabled = false;

  if (!reg) {
    /* New user — show registration form, pre-fill phone field */
    const phoneField = document.getElementById('reg-phone');
    if (phoneField) phoneField.value = phone; /* already stripped of +91 */
    showStep('step-register');
    document.getElementById('reg-name').focus();
    return;
  }

  /* Existing user — check each tier for verified status */
  const tiers = Object.keys(TIERS);
  const enrolledTiers = tiers.filter(t => reg[t] === 'verified');
  const pendingTiers  = tiers.filter(t => reg[t] === 'pending');

  /* Restore localStorage enrollments so they can access courses right away */
  enrolledTiers.forEach(t => localStorage.setItem(`tg_enrolled_${t}`, 'true'));

  /* Build dashboard */
  const name = reg.name || 'Student';
  document.getElementById('enrolled-greeting').textContent = `Welcome back, ${name}!`;

  const list = document.getElementById('enrolled-courses-list');

  if (!enrolledTiers.length && !pendingTiers.length) {
    document.getElementById('enrolled-subtext').textContent =
      'No active enrollments found. Browse courses and enroll below.';
    list.innerHTML = '';
  } else {
    document.getElementById('enrolled-subtext').textContent =
      'Your course enrollments:';

    list.innerHTML = [
      ...enrolledTiers.map(t => {
        const tier = TIERS[t];
        return `
          <div class="enrolled-course-card">
            <div class="enrolled-course-info">
              <span class="enrolled-course-name">${tier.label}</span>
              <span class="enrolled-course-status">
                <span class="status-dot-green"></span>
                <span style="color:#4ade80;">Active — ${tier.class}</span>
              </span>
            </div>
            <a href="post.html?tier=${t}&module=0" class="enrolled-go-btn">
              <i class="fas fa-play"></i> Start
            </a>
          </div>`;
      }),
      ...pendingTiers.map(t => {
        const tier = TIERS[t];
        return `
          <div class="enrolled-course-card pending-course-card">
            <div class="enrolled-course-info">
              <span class="enrolled-course-name">${tier.label}</span>
              <span class="enrolled-course-status">
                <span class="status-dot-amber"></span>
                <span style="color:var(--accent);">Payment verification pending</span>
              </span>
            </div>
          </div>`;
      }),
    ].join('');
  }

  showStep('step-enrolled');
};

/* ─── Step 2: Register new student ─── */
window.registerStudent = async function () {
  const nameEl   = document.getElementById('reg-name');
  const courseEl = document.getElementById('reg-course');
  const errEl    = document.getElementById('reg-error');
  const btn      = document.getElementById('reg-btn-text');

  errEl.textContent = '';

  const name   = nameEl.value.trim();
  const course = courseEl.value;

  /* Phone may come from step-1 or from the inline field (direct Register click) */
  const phoneField = document.getElementById('reg-phone');
  if (!currentPhone && phoneField && phoneField.value.trim()) {
    currentPhone = '+91' + phoneField.value.trim();
  }

  if (!currentPhone) { errEl.textContent = 'Please enter your phone number.'; return; }
  if (!name)         { errEl.textContent = 'Please enter your full name.';     return; }
  if (!course)       { errEl.textContent = 'Please select the course you want.'; return; }

  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving…';
  document.querySelector('#step-register .login-btn').disabled = true;

  let existing = await fsReadRegistration(currentPhone) || {};

  const data = {
    name,
    phone: currentPhone,
    registeredAt: existing.registeredAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    /* Keep existing tier statuses; add new interested tier as 'pending' */
    ...existing,
    [course]: existing[course] || 'pending',
  };

  const ok = await fsWriteRegistration(currentPhone, data);

  btn.innerHTML = '<i class="fas fa-user-plus"></i> Register';
  document.querySelector('#step-register .login-btn').disabled = false;

  if (!ok) {
    /* Firebase not configured — store locally and show confirm */
    localStorage.setItem(`tg_reg_${currentPhone}`, JSON.stringify(data));
    showToastLogin('Registration saved locally — Firebase not configured');
  }

  showStep('step-confirm');
};

/* ─── Toast ─── */
function showToastLogin(msg) {
  const t = document.getElementById('login-toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

/* ─── Book Demo Class ─── */
window.bookDemo = async function () {
  const nameEl     = document.getElementById('demo-name');
  const courseEl   = document.getElementById('demo-course');
  const datetimeEl = document.getElementById('demo-datetime');
  const errEl      = document.getElementById('demo-error');
  const btn        = document.getElementById('demo-btn-text');

  errEl.textContent = '';

  const name     = nameEl.value.trim();
  const course   = courseEl.value;
  const datetime = datetimeEl.value.trim();

  if (!name)   { errEl.textContent = 'Please enter your full name.';       return; }
  if (!course) { errEl.textContent = 'Please select an interested course.'; return; }

  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Booking…';
  document.querySelector('#step-demo .login-btn').disabled = true;

  const phone = currentPhone || 'not provided';
  const data  = {
    name,
    phone,
    demoRequest: true,
    demoCourse:  course,
    demoDatetime: datetime || 'flexible',
    registeredAt: new Date().toISOString(),
  };

  /* Save as registration with demoRequest flag */
  if (phone !== 'not provided') {
    const existing = await fsReadRegistration(phone) || {};
    await fsWriteRegistration(phone, { ...existing, ...data });
  } else {
    /* No phone yet — save under a temp key */
    await fsWriteRegistration('demo_' + Date.now(), data);
  }

  btn.innerHTML = '<i class="fas fa-calendar-check"></i> Book Demo Class';
  document.querySelector('#step-demo .login-btn').disabled = false;

  const confirmPhone = document.getElementById('demo-confirm-phone');
  if (confirmPhone) confirmPhone.textContent = phone !== 'not provided' ? phone : name;

  showStep('step-demo-confirm');
};

/* ─── Init ─── */
document.addEventListener('DOMContentLoaded', () => {
  const mode = new URLSearchParams(window.location.search).get('mode');

  if (mode === 'register') {
    /* Skip phone step — go straight to register form (phone optional) */
    showStep('step-register');
    document.getElementById('reg-name').focus();
  } else if (mode === 'demo') {
    showStep('step-demo');
    document.getElementById('demo-name').focus();
  } else {
    showStep('step-phone');
    document.getElementById('phone-input').focus();
  }

  /* Enter key shortcuts */
  document.getElementById('phone-input').addEventListener('keydown', e => {
    if (e.key === 'Enter') window.checkPhone();
  });
  document.getElementById('reg-name').addEventListener('keydown', e => {
    if (e.key === 'Enter') window.registerStudent();
  });
  document.getElementById('demo-name').addEventListener('keydown', e => {
    if (e.key === 'Enter') window.bookDemo();
  });
});
