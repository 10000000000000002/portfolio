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

  /* Widen card for dashboard, reset for other steps */
  const card = document.querySelector('.login-card');
  if (card) card.classList.toggle('dashboard-mode', id === 'step-enrolled');
}

function goBack(stepId) { showStep(stepId); }

/* ─── Session helpers ─── */
function saveSession(name, phone) {
  sessionStorage.setItem('tg_student_name',  name);
  sessionStorage.setItem('tg_student_phone', phone);
}

function getSession() {
  return {
    name:  sessionStorage.getItem('tg_student_name'),
    phone: sessionStorage.getItem('tg_student_phone'),
  };
}

window.studentLogout = function () {
  sessionStorage.removeItem('tg_student_name');
  sessionStorage.removeItem('tg_student_phone');
  window.location.href = 'courses.html';
};

/* ─── Initials from name ─── */
function getInitials(name) {
  return (name || '?')
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map(w => w[0].toUpperCase())
    .join('');
}

/* ─── First name only ─── */
function firstName(name) {
  return (name || 'Student').trim().split(/\s+/)[0].toUpperCase();
}

/* ─── Build dashboard ─── */
function renderDashboard(name, phone, enrolledTiers, pendingTiers) {
  /* Save session so navbar can show name */
  saveSession(name, phone);

  /* Restore localStorage enrollments */
  enrolledTiers.forEach(t => localStorage.setItem(`tg_enrolled_${t}`, 'true'));

  /* Avatar & header */
  document.getElementById('dash-avatar').textContent = getInitials(name);
  document.getElementById('dash-name').textContent   = firstName(name);
  document.getElementById('dash-phone').textContent  = phone;

  /* Stats */
  const totalModules = enrolledTiers.reduce((sum, t) => sum + (TIERS[t]?.modules?.length || 0), 0);
  document.getElementById('dash-stats').innerHTML = `
    <div class="dash-stat-item">
      <span class="dash-stat-value">${enrolledTiers.length + pendingTiers.length}</span>
      <span class="dash-stat-label">Enrolled</span>
    </div>
    <div class="dash-stat-item">
      <span class="dash-stat-value">${enrolledTiers.length}</span>
      <span class="dash-stat-label">Active</span>
    </div>
    <div class="dash-stat-item">
      <span class="dash-stat-value">${totalModules}</span>
      <span class="dash-stat-label">Modules</span>
    </div>`;

  /* Course cards */
  const list = document.getElementById('enrolled-courses-list');

  if (!enrolledTiers.length && !pendingTiers.length) {
    list.innerHTML = `
      <div style="margin:0 32px 16px;padding:24px;text-align:center;background:rgba(255,255,255,0.03);
                  border:1px dashed var(--border);border-radius:14px;">
        <i class="fas fa-graduation-cap" style="font-size:1.6rem;color:var(--text-muted);margin-bottom:10px;display:block;"></i>
        <p style="color:var(--text-muted);font-size:0.88rem;margin:0;">
          No active courses yet. Browse courses, complete payment, and we'll activate your access.
        </p>
      </div>`;
    return;
  }

  list.innerHTML = [
    ...enrolledTiers.map(t => {
      const tier = TIERS[t];
      return `
        <div class="enrolled-course-card active-card">
          <div class="enrolled-course-info">
            <p class="enrolled-course-track">${tier.class}</p>
            <p class="enrolled-course-title">${tier.label}</p>
            <div class="enrolled-course-meta">
              <span><i class="fas fa-layer-group"></i> ${tier.modules.length} modules</span>
              <span><i class="fas fa-clock"></i> Self-paced</span>
            </div>
          </div>
          <div class="enrolled-course-actions">
            <span class="badge-active"><i class="fas fa-circle" style="font-size:6px;"></i> Active</span>
            <a href="post.html?tier=${t}&module=0" class="enrolled-go-btn">
              <i class="fas fa-play"></i> Continue
            </a>
          </div>
        </div>`;
    }),
    ...pendingTiers.map(t => {
      const tier = TIERS[t];
      return `
        <div class="enrolled-course-card">
          <div class="enrolled-course-info">
            <p class="enrolled-course-track">${tier.class}</p>
            <p class="enrolled-course-title">${tier.label}</p>
            <div class="enrolled-course-meta">
              <span><i class="fas fa-layer-group"></i> ${tier.modules.length} modules</span>
            </div>
          </div>
          <div class="enrolled-course-actions">
            <span class="badge-pending"><i class="fas fa-clock"></i> Pending</span>
          </div>
        </div>`;
    }),
  ].join('');

  showStep('step-enrolled');
}

/* ─── Step 1: Check phone ─── */
window.checkPhone = async function () {
  const input = document.getElementById('phone-input');
  const errEl = document.getElementById('phone-error');
  const btn   = document.getElementById('phone-btn-text');
  const phone = input.value.trim();

  errEl.textContent = '';

  if (!/^\d{10}$/.test(phone)) {
    errEl.textContent = 'Please enter a valid 10-digit mobile number.';
    return;
  }

  currentPhone     = '+91' + phone;
  btn.textContent  = 'Checking…';
  document.querySelector('#step-phone .login-btn').disabled = true;

  const reg = await fsReadRegistration(currentPhone);

  btn.textContent  = 'Continue';
  document.querySelector('#step-phone .login-btn').disabled = false;

  if (!reg) {
    const phoneField = document.getElementById('reg-phone');
    if (phoneField) phoneField.value = phone;
    showStep('step-register');
    document.getElementById('reg-name').focus();
    return;
  }

  const tiers         = Object.keys(TIERS);
  const enrolledTiers = tiers.filter(t => reg[t] === 'verified');
  const pendingTiers  = tiers.filter(t => reg[t] === 'pending');

  /* Save session first so the chip shows on redirect */
  saveSession(reg.name || 'Student', currentPhone);

  /* Restore localStorage enrollments */
  enrolledTiers.forEach(t => localStorage.setItem(`tg_enrolled_${t}`, 'true'));

  /* If coming from a specific page, go back there; otherwise go to courses */
  const returnTo = new URLSearchParams(window.location.search).get('from');
  window.location.href = returnTo || 'courses.html';
};

/* ─── Step 2: Register ─── */
window.registerStudent = async function () {
  const nameEl   = document.getElementById('reg-name');
  const courseEl = document.getElementById('reg-course');
  const errEl    = document.getElementById('reg-error');
  const btn      = document.getElementById('reg-btn-text');

  errEl.textContent = '';

  const name   = nameEl.value.trim();
  const course = courseEl.value;

  const phoneField = document.getElementById('reg-phone');
  if (!currentPhone && phoneField && phoneField.value.trim()) {
    currentPhone = '+91' + phoneField.value.trim();
  }

  if (!currentPhone) { errEl.textContent = 'Please enter your phone number.';      return; }
  if (!name)         { errEl.textContent = 'Please enter your full name.';          return; }
  if (!course)       { errEl.textContent = 'Please select the course you want.';    return; }

  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving…';
  document.querySelector('#step-register .login-btn').disabled = true;

  let existing = await fsReadRegistration(currentPhone) || {};

  const data = {
    name,
    phone: currentPhone,
    registeredAt: existing.registeredAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...existing,
    [course]: existing[course] || 'pending',
  };

  const ok = await fsWriteRegistration(currentPhone, data);

  btn.innerHTML = '<i class="fas fa-user-plus"></i> Register';
  document.querySelector('#step-register .login-btn').disabled = false;

  if (!ok) {
    localStorage.setItem(`tg_reg_${currentPhone}`, JSON.stringify(data));
    showToastLogin('Registration saved locally — Firebase not configured');
  }

  showStep('step-confirm');
};

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

  if (!name)   { errEl.textContent = 'Please enter your full name.';        return; }
  if (!course) { errEl.textContent = 'Please select an interested course.'; return; }

  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Booking…';
  document.querySelector('#step-demo .login-btn').disabled = true;

  const phone = currentPhone || 'not provided';
  const data  = {
    name, phone,
    demoRequest:  true,
    demoCourse:   course,
    demoDatetime: datetime || 'flexible',
    registeredAt: new Date().toISOString(),
  };

  if (phone !== 'not provided') {
    const existing = await fsReadRegistration(phone) || {};
    await fsWriteRegistration(phone, { ...existing, ...data });
  } else {
    await fsWriteRegistration('demo_' + Date.now(), data);
  }

  btn.innerHTML = '<i class="fas fa-calendar-check"></i> Book Demo Class';
  document.querySelector('#step-demo .login-btn').disabled = false;

  const el = document.getElementById('demo-confirm-phone');
  if (el) el.textContent = phone !== 'not provided' ? phone : name;

  showStep('step-demo-confirm');
};

/* ─── Toast ─── */
function showToastLogin(msg) {
  const t = document.getElementById('login-toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

/* ─── Init ─── */
document.addEventListener('DOMContentLoaded', () => {
  const mode    = new URLSearchParams(window.location.search).get('mode');
  const session = getSession();

  /* If already logged in — redirect to courses (or show dashboard if explicitly opened) */
  if (session.name && session.phone && mode !== 'register' && mode !== 'demo') {
    if (mode === 'dashboard') {
      /* Explicit dashboard request — re-fetch and show */
      fsReadRegistration(session.phone).then(reg => {
        if (!reg) { showStep('step-phone'); return; }
        currentPhone = session.phone;
        const tiers         = Object.keys(TIERS);
        const enrolledTiers = tiers.filter(t => reg[t] === 'verified');
        const pendingTiers  = tiers.filter(t => reg[t] === 'pending');
        renderDashboard(reg.name || session.name, session.phone, enrolledTiers, pendingTiers);
      });
    } else {
      /* Already logged in — go straight to courses */
      const returnTo = new URLSearchParams(window.location.search).get('from');
      window.location.href = returnTo || 'courses.html';
    }
    return;
  }

  if (mode === 'register') {
    showStep('step-register');
    document.getElementById('reg-name').focus();
  } else if (mode === 'demo') {
    showStep('step-demo');
    document.getElementById('demo-name').focus();
  } else {
    showStep('step-phone');
    document.getElementById('phone-input').focus();
  }

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
