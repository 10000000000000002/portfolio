/* ─── Navbar: scroll effect + active link tracking ─── */
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');

function onScroll() {
  // Solid background once past 80px
  navbar.classList.toggle('scrolled', window.scrollY > 80);

  // Highlight the nav link whose section is in view
  let current = '';
  document.querySelectorAll('section[id]').forEach(section => {
    if (window.scrollY >= section.offsetTop - 140) current = section.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll(); // run once on load

/* ─── Mobile hamburger menu ─── */
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  const open = navLinksEl.classList.toggle('open');
  hamburger.classList.toggle('open', open);
  hamburger.setAttribute('aria-expanded', open);
  document.body.style.overflow = open ? 'hidden' : '';
});

// Close menu when a link is clicked
navLinksEl.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinksEl.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', false);
    document.body.style.overflow = '';
  });
});

/* ─── Smooth scroll with navbar offset ─── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = navbar.offsetHeight + 12;
    window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
  });
});

/* ─── EmailJS config ───────────────────────────────────────────
   SETUP (one-time, ~3 minutes):
   1. Sign up free at https://www.emailjs.com
   2. Add Service → Gmail → connect duke.lavlesh@gmail.com → copy Service ID
   3. Email Templates → Create Template → copy Template ID
      Template variables used: {{from_name}}, {{from_email}}, {{subject}}, {{message}}
   4. Account → API Keys → copy Public Key
   5. Replace the three placeholder strings below with your real values
   ─────────────────────────────────────────────────────────────── */
const EMAILJS_PUBLIC_KEY  = 'm9NmKXIdcJOW9V8Gg';    // ✓ correct
const EMAILJS_SERVICE_ID  = 'service_kg85q49';         // ✓ correct
const EMAILJS_TEMPLATE_ID = 'template_jrustd3';       // ✓ correct

emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

/* ─── Contact form handler ─── */
const form      = document.getElementById('contact-form');
const formMsg   = document.getElementById('form-status');
const submitBtn = form.querySelector('button[type="submit"]');

/** @param {string} html @param {'success'|'error'|''} type */
function setMsg(html, type) {
  formMsg.innerHTML   = html;
  formMsg.className   = type ? `form-note ${type}` : 'form-note';
}

form.addEventListener('submit', async e => {
  e.preventDefault();

  const name    = form.name.value.trim();
  const email   = form.email.value.trim();
  const subject = form.subject.value;
  const message = form.message.value.trim();

  if (!name || !email || !subject || !message) {
    setMsg('<i class="fas fa-exclamation-circle"></i> Please fill in all fields.', 'error');
    return;
  }

  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending…';
  setMsg('', '');

  try {
    /* global emailjs */
    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
      from_name:  name,
      from_email: email,
      subject:    `[TechGurukul] ${subject}`,
      message:    message,
      reply_to:   email
    });

    setMsg('<i class="fas fa-check-circle"></i> Your request has been sent successfully! I\'ll get back to you soon.', 'success');
    form.reset();
  } catch (_err) {
    setMsg('<i class="fas fa-exclamation-circle"></i> Something went wrong. Email directly: <a href="mailto:duke.lavlesh@gmail.com">duke.lavlesh@gmail.com</a>', 'error');
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
  }
});

/* ─── Footer year ─── */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
