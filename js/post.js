/* ═══════════════════════════════════════════════
   POST PAGE — JavaScript
   ═══════════════════════════════════════════════ */

const params  = new URLSearchParams(window.location.search);
const tier    = params.get('tier');
const modIdx  = parseInt(params.get('module'), 10);

/* ─── HTML escape helper — prevents XSS when inserting text into innerHTML ─── */
function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/* ─── Safe localStorage JSON parse ─── */
function safeGetJSON(key, fallback = null) {
  try { return JSON.parse(localStorage.getItem(key) || 'null') ?? fallback; }
  catch { return fallback; }
}
function safeSetJSON(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); return true; }
  catch { return false; }
}

/* Redirect on bad params */
if (!tier || !TIERS[tier] || isNaN(modIdx) || modIdx < 0 || modIdx >= TIERS[tier].modules.length) {
  window.location.href = 'courses.html';
} else {
  const tierData   = TIERS[tier];
  const mod        = tierData.modules[modIdx];
  const postKey    = `${tier}_${modIdx}`;
  const isFree     = modIdx < 2 && !mod.isProject;
  const isAdmin    = sessionStorage.getItem('tg_admin') === '1';
  const isEnrolled = localStorage.getItem(`tg_enrolled_${tier}`) === 'true';
  const canAccess  = isFree || isAdmin || isEnrolled;

  /* ─── Language list ─── */
  const LANGUAGES = [
    { code: 'en',  name: 'English',    native: 'English',    flag: '🇬🇧' },
    { code: 'hi',  name: 'Hindi',      native: 'हिन्दी',      flag: '🇮🇳' },
    { code: 'mr',  name: 'Marathi',    native: 'मराठी',       flag: '🇮🇳' },
    { code: 'te',  name: 'Telugu',     native: 'తెలుగు',      flag: '🇮🇳' },
    { code: 'ta',  name: 'Tamil',      native: 'தமிழ்',       flag: '🇮🇳' },
    { code: 'gu',  name: 'Gujarati',   native: 'ગુજરાતી',     flag: '🇮🇳' },
    { code: 'kn',  name: 'Kannada',    native: 'ಕನ್ನಡ',       flag: '🇮🇳' },
    { code: 'or',  name: 'Odia',       native: 'ଓଡ଼ିଆ',       flag: '🇮🇳' },
    { code: 'ml',  name: 'Malayalam',  native: 'മലയാളം',      flag: '🇮🇳' },
  ];

  let currentLang      = 'en';
  let originalMarkdown = '';

  /* ─── Theme ─── */
  function applyTheme(mode) {
    document.body.classList.toggle('light-mode', mode === 'light');
    const label = document.getElementById('theme-label');
    if (label) {
      label.innerHTML = mode === 'light'
        ? '<i class="fas fa-sun"></i> Light'
        : '<i class="fas fa-moon"></i> Dark';
    }
  }

  window.toggleTheme = function () {
    const next = document.body.classList.contains('light-mode') ? 'dark' : 'light';
    localStorage.setItem('tg_reading_mode', next);
    applyTheme(next);
  };

  /* ─── DOMContentLoaded ─── */
  document.addEventListener('DOMContentLoaded', () => {
    /* restore saved theme before first paint */
    applyTheme(localStorage.getItem('tg_reading_mode') || 'dark');

    setupNavbar();
    populateBanner();
    populateNav();

    if (canAccess) {
      loadContent().then(() => {
        initRating();
        buildLangDropdown();
      });
    } else {
      showLocked();
    }

    document.getElementById('year').textContent = new Date().getFullYear();

    /* close lang dropdown on outside click */
    document.addEventListener('click', e => {
      const sel = document.getElementById('lang-selector');
      if (sel && !sel.contains(e.target)) closeLangDropdown();
    });
  });

  /* ─── Banner ─── */
  function populateBanner() {
    const pill = document.getElementById('post-tier-pill');
    pill.textContent = `${tierData.class} · ${tierData.label}`;
    pill.style.background = tierData.pill;

    const totalRegular = tierData.modules.filter(m => !m.isProject).length;
    document.getElementById('post-module-label').textContent = mod.isProject
      ? 'Final Project'
      : `Module ${modIdx + 1} of ${totalRegular}`;

    document.getElementById('breadcrumb-tier').textContent = tierData.label;
    document.getElementById('post-icon').textContent  = mod.icon;
    document.getElementById('post-title').textContent = mod.title;
    document.getElementById('post-duration').textContent = mod.duration;
    document.getElementById('post-lessons').textContent  = `${mod.lessons} lessons`;

    document.getElementById('post-banner').style.borderBottomColor = tierData.color;
    document.title = `${mod.title} — TechGurukul`;
  }

  /* ─── Prev / Next navigation ─── */
  function populateNav() {
    const mods = tierData.modules;

    if (modIdx > 0) {
      const prev = mods[modIdx - 1];
      document.getElementById('post-nav-prev').innerHTML = `
        <a href="post.html?tier=${escHtml(tier)}&module=${modIdx - 1}" class="post-nav-btn prev">
          <i class="fas fa-arrow-left"></i>
          <span>
            <small>Previous</small>
            <strong>${escHtml(prev.icon)} ${escHtml(prev.title)}</strong>
          </span>
        </a>`;
    }

    if (modIdx < mods.length - 1) {
      const next = mods[modIdx + 1];
      document.getElementById('post-nav-next').innerHTML = `
        <a href="post.html?tier=${escHtml(tier)}&module=${modIdx + 1}" class="post-nav-btn next">
          <i class="fas fa-arrow-right"></i>
          <span>
            <small>Next</small>
            <strong>${escHtml(next.icon)} ${escHtml(next.title)}</strong>
          </span>
        </a>`;
    }
  }

  /* ─── Load post content ─── */
  async function loadContent() {
    const area    = document.getElementById('post-content-area');
    const langSel = document.getElementById('lang-selector');

    /* 1. Firestore — cloud DB, survives any browser/device data clearing */
    let cloudPost = null;
    try {
      cloudPost = await fsRead(postKey); /* from firebase-config.js — null if not configured */
    } catch { /* Firebase not set up or offline — fall through */ }

    /* 2. localStorage (synced from Firestore on admin load, or direct admin saves) */
    const stored = safeGetJSON(`tg_post_${postKey}`);

    /* 3. Built-in seed content */
    const seed = (typeof SEED_POSTS !== 'undefined' && SEED_POSTS[postKey]) || null;

    const postData = cloudPost || stored || seed;

    if (!postData) {
      area.innerHTML = `
        <div class="post-empty">
          <div class="post-empty-icon"><i class="fas fa-pencil-alt"></i></div>
          <h3>Content Coming Soon</h3>
          <p>This module is being prepared by the instructor. Check back soon!</p>
        </div>`;
      document.getElementById('rating-section').style.display = 'none';
      if (langSel) langSel.style.display = 'none';
      return;
    }

    /* content found — make sure lang selector is visible */
    if (langSel) langSel.style.display = '';

    originalMarkdown = postData.content || '';

    const wordCount = originalMarkdown.split(/\s+/).filter(Boolean).length;
    const readMins  = Math.max(1, Math.ceil(wordCount / 200));
    document.getElementById('post-readtime').textContent = `${readMins} min read`;

    if (postData.updatedAt) {
      document.getElementById('post-date').textContent =
        new Date(postData.updatedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    }

    marked.setOptions({ breaks: true, gfm: true });
    area.innerHTML = DOMPurify.sanitize(marked.parse(originalMarkdown));
    area.classList.add('post-content');
  }

  /* ─── Locked overlay ─── */
  function showLocked() {
    const ls = document.getElementById('lang-selector');
    if (ls) ls.style.display = 'none';
    document.getElementById('post-content-area').innerHTML = `
      <div class="locked-overlay">
        <div class="locked-icon"><i class="fas fa-lock"></i></div>
        <h3>This Module is Locked</h3>
        <p>Enroll in the full <strong>${escHtml(tierData.label)}</strong> course to access all modules and the hands-on project.</p>
        <a href="courses.html?enroll=${escHtml(tier)}" class="btn btn-primary" style="margin-bottom:12px;">
          <i class="fas fa-bolt"></i> Enroll Now — ${escHtml(tierData.price)}
        </a>
        <div class="unlock-code-section">
          <p class="unlock-code-hint"><i class="fas fa-check-circle" style="color:#4ade80;"></i> Already paid? Enter your activation code:</p>
          <div class="unlock-code-row">
            <input type="text" id="unlock-code-input" class="unlock-code-input"
                   placeholder="e.g. TECHG-FOUN-A3K7P2" maxlength="32"
                   oninput="this.value=this.value.toUpperCase()" />
            <button class="btn btn-outline unlock-code-btn" onclick="activateCode()">
              <i class="fas fa-unlock-alt"></i> Activate
            </button>
          </div>
          <p class="unlock-code-error" id="unlock-code-error" style="display:none;"></p>
        </div>
      </div>`;
    document.getElementById('rating-section').style.display = 'none';
  }

  /* ─── Activation code entry ─── */
  window.activateCode = async function () {
    const input  = document.getElementById('unlock-code-input');
    const errEl  = document.getElementById('unlock-code-error');
    const code   = (input.value || '').trim().toUpperCase();

    if (!code) {
      showCodeError('Please enter your activation code.');
      return;
    }

    /* Hash the entered code and compare to the stored grant key for this tier */
    const inputHash   = await hashStr(code);
    const storedHash  = localStorage.getItem(`tg_grant_hash_${tier}`);

    if (!storedHash) {
      showCodeError('No activation code has been set for this course yet. Please contact the instructor.');
      return;
    }

    if (inputHash === storedHash) {
      localStorage.setItem(`tg_enrolled_${tier}`, 'true');
      /* Show success flash then reload */
      document.querySelector('.locked-overlay').innerHTML = `
        <div class="unlock-success">
          <div class="unlock-success-icon"><i class="fas fa-check-circle"></i></div>
          <h3>Course Unlocked!</h3>
          <p>Welcome to the <strong>${escHtml(tierData.label)}</strong> track. Loading your content…</p>
        </div>`;
      setTimeout(() => location.reload(), 1500);
    } else {
      showCodeError('Invalid code. Please check the code you received and try again.');
      input.select();
    }
  };

  function showCodeError(msg) {
    const el = document.getElementById('unlock-code-error');
    if (el) { el.textContent = msg; el.style.display = 'block'; }
  }

  async function hashStr(str) {
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
    return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
  }

  /* ═══════════════════════════════════════════════
     LANGUAGE / TRANSLATION
  ═══════════════════════════════════════════════ */

  function buildLangDropdown() {
    const dropdown = document.getElementById('lang-dropdown');
    if (!dropdown) return;

    dropdown.innerHTML = LANGUAGES.map(lang => `
      <button class="lang-option${lang.code === 'en' ? ' active' : ''}"
              data-code="${lang.code}"
              onclick="switchLanguage('${lang.code}')">
        <span class="lang-flag">${lang.flag}</span>
        <span class="lang-native">${lang.native}</span>
        <span class="lang-english">${lang.name}</span>
      </button>
    `).join('');
  }

  window.toggleLangDropdown = function (e) {
    e.stopPropagation();
    const sel = document.getElementById('lang-selector');
    if (sel) sel.classList.toggle('open');
  };

  function closeLangDropdown() {
    const sel = document.getElementById('lang-selector');
    if (sel) sel.classList.remove('open');
  }

  window.switchLanguage = async function (code) {
    closeLangDropdown();
    if (code === currentLang) return;

    /* update active state in dropdown */
    document.querySelectorAll('.lang-option').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.code === code);
    });

    const lang = LANGUAGES.find(l => l.code === code);

    if (code === 'en') {
      currentLang = 'en';
      document.getElementById('lang-current-text').textContent = 'English';
      hideTranslationNotice();
      /* restore original markdown */
      marked.setOptions({ breaks: true, gfm: true });
      const area = document.getElementById('post-content-area');
      area.innerHTML = DOMPurify.sanitize(marked.parse(originalMarkdown));
      area.classList.add('post-content');
      return;
    }

    /* update button label immediately */
    document.getElementById('lang-current-text').textContent = lang.native;

    /* check cache */
    const cacheKey = `tg_trans_${postKey}_${code}`;
    const cached   = localStorage.getItem(cacheKey);  /* plain string, not JSON */

    if (cached) {
      currentLang = code;
      renderTranslated(cached);
      showTranslationNotice(lang.name, true);
      return;
    }

    /* show loading */
    showTranslationLoader();

    try {
      const translated = await translateMarkdown(originalMarkdown, code);
      /* save to cache */
      try { localStorage.setItem(cacheKey, translated); } catch (_) { /* quota — skip cache */ }
      currentLang = code;
      renderTranslated(translated);
      showTranslationNotice(lang.name, false);
    } catch (err) {
      hideTranslationLoader();
      document.getElementById('lang-current-text').textContent = 'English';
      document.querySelectorAll('.lang-option').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.code === 'en');
      });
      alert('Translation failed. Please check your internet connection and try again.');
    }
  };

  function renderTranslated(markdown) {
    hideTranslationLoader();
    marked.setOptions({ breaks: true, gfm: true });
    const area = document.getElementById('post-content-area');
    area.innerHTML = DOMPurify.sanitize(marked.parse(markdown));
    area.classList.add('post-content');
  }

  function showTranslationNotice(langName, fromCache) {
    const notice = document.getElementById('translation-notice');
    const badge  = document.getElementById('translation-cached-badge');
    document.getElementById('translation-lang-name').textContent = langName;
    if (badge) badge.style.display = fromCache ? 'inline-flex' : 'none';
    if (notice) notice.style.display = 'flex';
  }

  function hideTranslationNotice() {
    const notice = document.getElementById('translation-notice');
    if (notice) notice.style.display = 'none';
  }

  function showTranslationLoader() {
    const area = document.getElementById('post-content-area');
    area.classList.add('content-translating');
    area.insertAdjacentHTML('afterbegin', `
      <div class="translation-loader" id="translation-loader">
        <div class="translation-loader-spinner"></div>
        <span>Translating content…</span>
      </div>`);
  }

  function hideTranslationLoader() {
    const loader = document.getElementById('translation-loader');
    if (loader) loader.remove();
    document.getElementById('post-content-area').classList.remove('content-translating');
  }

  /* ─── Translate markdown preserving code blocks ─── */
  async function translateMarkdown(text, targetLang) {
    /* Extract fenced code blocks and replace with placeholders */
    const codeBlocks = [];
    const withPlaceholders = text.replace(/```[\s\S]*?```/g, match => {
      codeBlocks.push(match);
      return `\x00CODE_BLOCK_${codeBlocks.length - 1}\x00`;
    });

    /* Split into paragraphs (blank-line separated) */
    const paragraphs = withPlaceholders.split(/\n{2,}/);

    /* Translate each paragraph (skip code placeholders) */
    const translated = await Promise.all(paragraphs.map(async para => {
      if (/\x00CODE_BLOCK_\d+\x00/.test(para)) return para; /* skip */
      if (!para.trim()) return para;
      try {
        return await callTranslateAPI(para, targetLang);
      } catch (_) {
        return para; /* on failure return original */
      }
    }));

    /* Restore code blocks */
    let result = translated.join('\n\n');
    result = result.replace(/\x00CODE_BLOCK_(\d+)\x00/g, (_, i) => codeBlocks[parseInt(i, 10)]);
    return result;
  }

  async function callTranslateAPI(text, targetLang) {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
    const res  = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    /* response[0] is array of [translated, original, ...] pairs */
    return data[0].map(item => item[0]).join('');
  }

  /* ─── Star rating ─── */
  function initRating() {
    const allRatings = safeGetJSON('tg_ratings',    {});
    const myRatings  = safeGetJSON('tg_my_ratings', {});
    const rData      = allRatings[postKey] || { total: 0, count: 0 };
    const myVal      = myRatings[postKey]  || 0;

    renderAvg(rData);

    if (myVal > 0) {
      showSubmitted(myVal);
      return;
    }

    const row = document.getElementById('stars-input-row');
    row.innerHTML = [1,2,3,4,5].map(n =>
      `<button class="star-btn" data-val="${n}">★</button>`
    ).join('');

    row.querySelectorAll('.star-btn').forEach(btn => {
      const val = parseInt(btn.dataset.val, 10);
      btn.addEventListener('mouseover', () => highlightStars(val));
      btn.addEventListener('mouseout',  () => highlightStars(0));
      btn.addEventListener('click',     () => submitRating(val));
    });
  }

  function highlightStars(n) {
    document.querySelectorAll('.star-btn').forEach(btn => {
      btn.style.color = parseInt(btn.dataset.val, 10) <= n ? 'var(--accent)' : 'var(--border)';
      btn.style.transform = parseInt(btn.dataset.val, 10) <= n ? 'scale(1.2)' : 'scale(1)';
    });
  }

  function submitRating(n) {
    const allRatings = safeGetJSON('tg_ratings',    {});
    const myRatings  = safeGetJSON('tg_my_ratings', {});

    if (!allRatings[postKey]) allRatings[postKey] = { total: 0, count: 0 };
    allRatings[postKey].total += n;
    allRatings[postKey].count += 1;
    myRatings[postKey] = n;

    safeSetJSON('tg_ratings',    allRatings);
    safeSetJSON('tg_my_ratings', myRatings);

    renderAvg(allRatings[postKey]);
    showSubmitted(n);
  }

  function renderAvg(rData) {
    const avg = rData.count > 0 ? (rData.total / rData.count).toFixed(1) : '—';
    document.getElementById('rating-avg-score').textContent = avg;
    document.getElementById('rating-avg-count').textContent =
      `${rData.count} rating${rData.count !== 1 ? 's' : ''}`;

    const filled = Math.round(rData.count > 0 ? rData.total / rData.count : 0);
    document.getElementById('rating-stars-display').innerHTML = [1,2,3,4,5].map(n =>
      `<i class="${n <= filled ? 'fas' : 'far'} fa-star" style="color:${n <= filled ? 'var(--accent)' : 'var(--border)'}"></i>`
    ).join('');
  }

  function showSubmitted(n) {
    document.getElementById('stars-input-row').innerHTML = `
      <div class="rating-submitted">
        <i class="fas fa-check-circle"></i>
        You rated this module ${n} star${n !== 1 ? 's' : ''} — thank you!
      </div>`;
  }

  /* ─── Navbar hamburger ─── */
  function setupNavbar() {
    const hamburger  = document.getElementById('hamburger');
    const navLinksEl = document.getElementById('nav-links');
    if (!hamburger || !navLinksEl) return;

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
}
