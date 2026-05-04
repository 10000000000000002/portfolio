/* ═══════════════════════════════════════════════
   ADMIN PANEL — JavaScript
   ═══════════════════════════════════════════════ */

/* ─── Security constants ─── */
const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_DURATION   = 15 * 60 * 1000;  // 15 minutes
const SESSION_TIMEOUT    = 2 * 60 * 60 * 1000; // 2 hours

let currentTier      = 'foundation';
let currentModuleIdx = null;
let isDirty          = false;
let sessionTimer     = null;

/* ─── Password hashing (Web Crypto API) ─── */
async function hashPassword(password) {
  const buf = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(password)
  );
  return Array.from(new Uint8Array(buf))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

/* ─── Brute-force protection ─── */
function getLoginAttempts() {
  try {
    const data = JSON.parse(localStorage.getItem('tg_login_state') || '{}');
    return { attempts: data.attempts || 0, lockedUntil: data.lockedUntil || 0 };
  } catch { return { attempts: 0, lockedUntil: 0 }; }
}
function setLoginAttempts(attempts, lockedUntil = 0) {
  localStorage.setItem('tg_login_state', JSON.stringify({ attempts, lockedUntil }));
}
function resetLoginAttempts() {
  localStorage.removeItem('tg_login_state');
}

/* ─── Auth ─── */
document.getElementById('login-form').addEventListener('submit', async e => {
  e.preventDefault();
  const errorEl = document.getElementById('login-error');
  const { attempts, lockedUntil } = getLoginAttempts();

  /* Check lockout */
  if (Date.now() < lockedUntil) {
    const mins = Math.ceil((lockedUntil - Date.now()) / 60000);
    errorEl.textContent = `Too many failed attempts. Try again in ${mins} minute${mins !== 1 ? 's' : ''}.`;
    errorEl.style.display = 'block';
    return;
  }

  const pw       = document.getElementById('admin-pw').value;
  const inputHash = await hashPassword(pw);

  /* Get stored hash — first run seeds from default, never stores plaintext */
  let storedHash = localStorage.getItem('tg_admin_h');
  if (!storedHash) {
    /* First-time setup: hash the default password and store only the hash */
    storedHash = await hashPassword('TechGurukul@2025');
    localStorage.setItem('tg_admin_h', storedHash);
  }

  if (inputHash === storedHash) {
    resetLoginAttempts();
    sessionStorage.setItem('tg_admin', '1');
    sessionStorage.setItem('tg_admin_ts', String(Date.now()));
    document.getElementById('admin-login-overlay').style.display = 'none';
    document.getElementById('admin-pw').value = '';
    initAdmin();
  } else {
    const newAttempts = attempts + 1;
    if (newAttempts >= MAX_LOGIN_ATTEMPTS) {
      setLoginAttempts(newAttempts, Date.now() + LOCKOUT_DURATION);
      errorEl.textContent = `Account locked for 15 minutes after ${MAX_LOGIN_ATTEMPTS} failed attempts.`;
    } else {
      setLoginAttempts(newAttempts);
      const remaining = MAX_LOGIN_ATTEMPTS - newAttempts;
      errorEl.textContent = `Incorrect password. ${remaining} attempt${remaining !== 1 ? 's' : ''} remaining.`;
    }
    errorEl.style.display = 'block';
    document.getElementById('admin-pw').value = '';
    document.getElementById('admin-pw').focus();
  }
});

function logout() {
  clearTimeout(sessionTimer);
  sessionStorage.removeItem('tg_admin');
  sessionStorage.removeItem('tg_admin_ts');
  location.reload();
}

/* ─── Session timeout ─── */
function resetSessionTimer() {
  clearTimeout(sessionTimer);
  sessionTimer = setTimeout(() => {
    alert('Your admin session has expired after 2 hours of inactivity. Please log in again.');
    logout();
  }, SESSION_TIMEOUT);
}

/* ─── Boot ─── */
window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('year').textContent = new Date().getFullYear();

  if (sessionStorage.getItem('tg_admin') === '1') {
    /* Validate session age */
    const ts = parseInt(sessionStorage.getItem('tg_admin_ts') || '0', 10);
    if (Date.now() - ts > SESSION_TIMEOUT) {
      logout();
      return;
    }
    document.getElementById('admin-login-overlay').style.display = 'none';
    initAdmin();
    resetSessionTimer();
    /* Reset timer on any user interaction */
    document.addEventListener('keydown', resetSessionTimer, { passive: true });
    document.addEventListener('mousedown', resetSessionTimer, { passive: true });
  }
});

function initAdmin() {
  renderTierTabs();
  selectTierTab('foundation');
  renderPostsTable();

  document.getElementById('editor-textarea').addEventListener('input', () => {
    isDirty = true;
    updateStatusBar('unsaved');
    updateWordCount();
  });
}

/* ─── Tier tabs ─── */
function renderTierTabs() {
  const container = document.getElementById('admin-tier-tabs');
  container.innerHTML = Object.entries(TIERS).map(([key, tier]) => `
    <button class="admin-tier-tab${key === currentTier ? ' active' : ''}"
            onclick="selectTierTab('${key}')">
      ${tier.label}
    </button>`).join('');
}

function selectTierTab(key) {
  if (isDirty && currentModuleIdx !== null) {
    if (!confirm('You have unsaved changes. Switch anyway?')) return;
  }
  currentTier      = key;
  currentModuleIdx = null;
  isDirty          = false;

  document.querySelectorAll('.admin-tier-tab').forEach(t => {
    t.classList.toggle('active', t.textContent.trim() === TIERS[key].label);
  });

  renderModuleList();
  showNoSelection();
}

/* ─── Module list ─── */
function renderModuleList() {
  const posts   = getPosts();
  const modules = TIERS[currentTier].modules;

  document.getElementById('admin-module-list').innerHTML = modules.map((mod, i) => {
    const hasContent = !!posts[`${currentTier}_${i}`];
    return `
    <div class="admin-module-item${i === currentModuleIdx ? ' active' : ''}${hasContent ? ' has-content' : ''}"
         onclick="selectModule(${i})">
      <span class="admin-mod-num">${mod.isProject ? '★' : String(i + 1).padStart(2,'0')}</span>
      <span class="admin-mod-icon">${mod.icon}</span>
      <span class="admin-mod-title">${mod.title}</span>
      <span class="admin-mod-dot" title="${hasContent ? 'Has content' : 'Empty'}"></span>
    </div>`;
  }).join('');
}

/* ─── Select module ─── */
function selectModule(idx) {
  if (isDirty && currentModuleIdx !== null && !confirm('Unsaved changes. Continue?')) return;

  currentModuleIdx = idx;
  isDirty = false;

  const mod      = TIERS[currentTier].modules[idx];
  const postKey  = `${currentTier}_${idx}`;
  const postData = getPosts()[postKey] || { content: '', status: 'draft', updatedAt: null };

  document.getElementById('admin-no-selection').style.display = 'none';
  const editor = document.getElementById('admin-editor');
  editor.style.display = 'flex';

  document.getElementById('editor-module-title').textContent =
    `${mod.icon} ${mod.title}`;
  document.getElementById('editor-module-meta').textContent =
    `${TIERS[currentTier].label} · ${mod.isProject ? 'Final Project' : `Module ${idx + 1}`}`;

  document.getElementById('editor-textarea').value = postData.content || '';
  updateStatusBar(postData.status === 'published' ? 'published' : postData.content ? 'saved' : 'unsaved');
  updateWordCount();
  renderModuleList();
  switchTab('write');
}

/* ─── Write / Preview tabs ─── */
function switchTab(tab) {
  document.querySelectorAll('.editor-tab').forEach(t => {
    t.classList.toggle('active', t.dataset.tab === tab);
  });

  const writeArea   = document.getElementById('editor-write-area');
  const previewArea = document.getElementById('editor-preview-area');

  if (tab === 'write') {
    writeArea.style.display   = 'flex';
    previewArea.style.display = 'none';
  } else {
    writeArea.style.display = 'none';
    const content = document.getElementById('editor-textarea').value;
    marked.setOptions({ breaks: true, gfm: true });
    /* DOMPurify strips any injected scripts from rendered markdown */
    previewArea.innerHTML     = DOMPurify.sanitize(
      marked.parse(content || '*No content yet — switch to Write tab to add content.*')
    );
    previewArea.style.display = 'block';
  }
}

/* ─── Markdown toolbar ─── */
function insertMd(type) {
  const ta    = document.getElementById('editor-textarea');
  const start = ta.selectionStart;
  const end   = ta.selectionEnd;
  const sel   = ta.value.substring(start, end);

  let before = '', after = '', prefix = '';

  switch (type) {
    case 'h2':        prefix = '## '; break;
    case 'h3':        prefix = '### '; break;
    case 'bold':      before = '**';  after = '**'; break;
    case 'italic':    before = '*';   after = '*'; break;
    case 'bi':        before = '***'; after = '***'; break;
    case 'code':      before = '`';   after = '`'; break;
    case 'codeblock': before = '\n```\n'; after = '\n```\n'; break;
    case 'quote':     prefix = '> '; break;
    case 'ul':        prefix = '- '; break;
    case 'ol':        prefix = '1. '; break;
    case 'hr':        before = '\n\n---\n\n'; break;
    case 'link':      before = '['; after = '](https://)'; break;
    case 'table':
      before = '\n| Column 1 | Column 2 | Column 3 |\n|----------|----------|----------|\n| Cell     | Cell     | Cell     |\n';
      break;
  }

  let newText, newStart, newEnd;

  if (prefix) {
    const lineStart = ta.value.lastIndexOf('\n', start - 1) + 1;
    newText  = ta.value.substring(0, lineStart) + prefix + ta.value.substring(lineStart);
    newStart = newEnd = start + prefix.length;
  } else {
    newText  = ta.value.substring(0, start) + before + sel + after + ta.value.substring(end);
    newStart = start + before.length;
    newEnd   = newStart + sel.length;
  }

  ta.value          = newText;
  ta.selectionStart = newStart;
  ta.selectionEnd   = newEnd;
  ta.focus();

  isDirty = true;
  updateStatusBar('unsaved');
  updateWordCount();
}

/* ─── Save / Publish ─── */
function savePost(status) {
  if (currentModuleIdx === null) { showToast('Select a module first', true); return; }

  const content  = document.getElementById('editor-textarea').value.trim();
  const postKey  = `${currentTier}_${currentModuleIdx}`;
  const posts    = getPosts();
  const existing = posts[postKey] || {};

  posts[postKey] = {
    content,
    status,
    tier:        currentTier,
    moduleIndex: currentModuleIdx,
    updatedAt:   new Date().toISOString(),
    publishedAt: status === 'published'
      ? (existing.publishedAt || new Date().toISOString())
      : existing.publishedAt || null,
  };

  try {
    localStorage.setItem('tg_posts', JSON.stringify(posts));
    localStorage.setItem(`tg_post_${postKey}`, JSON.stringify(posts[postKey]));
  } catch (e) {
    if (e.name === 'QuotaExceededError' || e.code === 22) {
      showToast('✗ Storage full — images are too large. Try compressing them.', true);
    } else {
      showToast('✗ Save failed: ' + e.message, true);
    }
    return;
  }

  isDirty = false;
  updateStatusBar(status === 'published' ? 'published' : 'saved');
  renderModuleList();
  renderPostsTable();
  showToast(status === 'published' ? '✓ Published!' : '✓ Draft saved');
}

/* ─── Export / Import ─── */
function exportPosts() {
  const posts = getPosts();
  if (!Object.keys(posts).length) { showToast('No posts to export', true); return; }

  const blob = new Blob([JSON.stringify(posts, null, 2)], { type: 'application/json' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = `techgurukul-posts-${new Date().toISOString().slice(0,10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('✓ Posts exported as JSON');
}

function importPosts() {
  document.getElementById('import-file-input').click();
}

document.getElementById('import-file-input').addEventListener('change', e => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    try {
      const data    = JSON.parse(ev.target.result);
      const merged  = { ...getPosts(), ...data };
      localStorage.setItem('tg_posts', JSON.stringify(merged));
      /* sync individual post keys */
      Object.entries(data).forEach(([k, v]) => localStorage.setItem(`tg_post_${k}`, JSON.stringify(v)));
      renderModuleList();
      renderPostsTable();
      showToast(`✓ Imported ${Object.keys(data).length} posts`);
    } catch {
      showToast('✗ Invalid JSON file', true);
    }
  };
  reader.readAsText(file);
  e.target.value = '';
});

/* ─── Posts table ─── */
function renderPostsTable() {
  const posts   = getPosts();
  const entries = Object.entries(posts).filter(([,p]) => p && p.content);
  const tbody   = document.getElementById('posts-table-body');

  if (!entries.length) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;color:var(--text-muted);padding:28px;">No posts yet — select a module and start writing!</td></tr>`;
    return;
  }

  tbody.innerHTML = entries.map(([key, post]) => {
    const tierObj = TIERS[post.tier];
    const mod     = tierObj?.modules[post.moduleIndex];
    if (!tierObj || !mod) return '';
    const date  = post.updatedAt ? new Date(post.updatedAt).toLocaleDateString('en-IN') : '—';
    const words = (post.content || '').split(/\s+/).filter(Boolean).length;
    return `
    <tr>
      <td style="font-size:1.1rem;">${mod.icon}</td>
      <td>${mod.title}</td>
      <td><span style="background:${tierObj.pill};-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;font-weight:700;">${tierObj.label}</span></td>
      <td><span class="post-status-badge ${post.status}">${post.status}</span></td>
      <td style="color:var(--text-muted);">${words} words · ${date}</td>
      <td>
        <button class="table-action-btn" onclick="editPost('${post.tier}',${post.moduleIndex})">
          <i class="fas fa-edit"></i> Edit
        </button>
        <button class="table-action-btn" onclick="previewPost('${post.tier}',${post.moduleIndex})" title="Open in reader">
          <i class="fas fa-eye"></i>
        </button>
        <button class="table-action-btn delete" onclick="deletePost('${key}')">
          <i class="fas fa-trash"></i>
        </button>
      </td>
    </tr>`;
  }).join('');
}

function editPost(t, idx) {
  if (t !== currentTier) selectTierTab(t);
  selectModule(idx);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function previewPost(t, idx) {
  window.open(`post.html?tier=${t}&module=${idx}`, '_blank');
}

function deletePost(key) {
  if (!confirm('Delete this post permanently?')) return;
  const posts = getPosts();
  delete posts[key];
  localStorage.setItem('tg_posts', JSON.stringify(posts));
  localStorage.removeItem(`tg_post_${key}`);
  renderModuleList();
  renderPostsTable();
  showToast('Post deleted');
}

/* ─── Helpers ─── */
function getPosts() {
  return JSON.parse(localStorage.getItem('tg_posts') || '{}');
}

function showNoSelection() {
  document.getElementById('admin-no-selection').style.display = 'flex';
  document.getElementById('admin-editor').style.display       = 'none';
}

function updateStatusBar(state) {
  document.getElementById('status-dot').className = `status-dot ${state}`;
  document.getElementById('status-text').textContent = {
    saved:     'Draft saved',
    published: 'Published',
    unsaved:   'Unsaved changes',
  }[state] || state;
}

function updateWordCount() {
  const words = document.getElementById('editor-textarea').value
    .split(/\s+/).filter(Boolean).length;
  document.getElementById('char-count').textContent = `${words} words`;
}

/* ═══════════════════════════════════════════════
   IMAGE INSERTION
   ═══════════════════════════════════════════════ */

/* ─── Popover open / close ─── */
function toggleImgPopover(e) {
  e.stopPropagation();
  const pop = document.getElementById('img-popover');
  pop.classList.toggle('open');
  if (pop.classList.contains('open')) {
    switchImgTab('url');
    document.getElementById('img-url-input').focus();
  }
}

function closeImgPopover() {
  document.getElementById('img-popover').classList.remove('open');
  resetUploadPreview();
}

document.addEventListener('click', e => {
  const pop = document.getElementById('img-popover');
  if (pop && pop.classList.contains('open') && !pop.contains(e.target)) {
    closeImgPopover();
  }
});

/* ─── URL / Upload tabs ─── */
function switchImgTab(tab) {
  document.getElementById('img-tab-url').classList.toggle('active', tab === 'url');
  document.getElementById('img-tab-upload').classList.toggle('active', tab === 'upload');
  document.getElementById('img-panel-url').style.display    = tab === 'url'    ? 'block' : 'none';
  document.getElementById('img-panel-upload').style.display = tab === 'upload' ? 'block' : 'none';
}

/* ─── Insert from URL ─── */
function insertImageFromUrl() {
  const url = document.getElementById('img-url-input').value.trim();
  const alt = document.getElementById('img-alt-input').value.trim() || 'image';
  if (!url) { showToast('Please enter an image URL', true); return; }
  insertImageMarkdown(url, alt);
  document.getElementById('img-url-input').value = '';
  document.getElementById('img-alt-input').value = '';
  closeImgPopover();
}

/* Allow Enter key in URL field to trigger insert */
document.addEventListener('DOMContentLoaded', () => {
  const urlInput = document.getElementById('img-url-input');
  if (urlInput) {
    urlInput.addEventListener('keydown', e => { if (e.key === 'Enter') insertImageFromUrl(); });
  }

  /* ─── File input change ─── */
  const fileInput = document.getElementById('img-file-input');
  if (fileInput) {
    fileInput.addEventListener('change', e => {
      const file = e.target.files[0];
      if (file) processImageFile(file);
      e.target.value = '';
    });
  }
});

/* ─── Drag & drop ─── */
function imgDragOver(e) {
  e.preventDefault();
  document.getElementById('img-drop-zone').classList.add('drag-over');
}
function imgDragLeave(e) {
  document.getElementById('img-drop-zone').classList.remove('drag-over');
}
function imgDrop(e) {
  e.preventDefault();
  document.getElementById('img-drop-zone').classList.remove('drag-over');
  const file = e.dataTransfer.files[0];
  if (file && file.type.startsWith('image/')) processImageFile(file);
  else showToast('Please drop an image file', true);
}

/* ─── Compress image via Canvas (max 1200px wide, 0.78 JPEG quality) ─── */
function compressImage(dataUrl) {
  return new Promise(resolve => {
    const img = new Image();
    img.onload = () => {
      const MAX = 1200;
      let w = img.width, h = img.height;
      if (w > MAX) { h = Math.round(h * MAX / w); w = MAX; }
      const canvas = document.createElement('canvas');
      canvas.width  = w;
      canvas.height = h;
      canvas.getContext('2d').drawImage(img, 0, 0, w, h);
      resolve(canvas.toDataURL('image/jpeg', 0.78));
    };
    img.onerror = () => resolve(dataUrl); /* fallback: use original */
    img.src = dataUrl;
  });
}

/* ─── Process image file → compress → show preview ─── */
function processImageFile(file) {
  if (!file.type.startsWith('image/')) { showToast('Only image files allowed', true); return; }
  if (file.size > 10 * 1024 * 1024) { showToast('Image too large (max 10 MB)', true); return; }

  const reader = new FileReader();
  reader.onload = async ev => {
    const compressed = await compressImage(ev.target.result);
    document.getElementById('img-upload-thumb').src          = compressed;
    document.getElementById('img-upload-thumb').dataset.src  = compressed;
    document.getElementById('img-drop-zone').style.display        = 'none';
    document.getElementById('img-upload-preview').style.display   = 'block';
  };
  reader.readAsDataURL(file);
}

function resetUploadPreview() {
  document.getElementById('img-upload-thumb').src         = '';
  document.getElementById('img-upload-thumb').dataset.src = '';
  document.getElementById('img-drop-zone').style.display       = 'flex';
  document.getElementById('img-upload-preview').style.display  = 'none';
  document.getElementById('img-upload-alt').value = '';
}

/* ─── Insert uploaded image ─── */
function insertUploadedImage() {
  const src = document.getElementById('img-upload-thumb').dataset.src;
  const alt = document.getElementById('img-upload-alt').value.trim() || 'image';
  if (!src) { showToast('No image loaded', true); return; }
  insertImageMarkdown(src, alt);
  closeImgPopover();
  showToast('✓ Image inserted');
}

/* ─── Core: insert markdown at cursor ─── */
function insertImageMarkdown(src, alt) {
  const ta    = document.getElementById('editor-textarea');
  const start = ta.selectionStart;
  const md    = `\n![${alt}](${src})\n`;
  ta.value    = ta.value.substring(0, start) + md + ta.value.substring(start);
  ta.selectionStart = ta.selectionEnd = start + md.length;
  ta.focus();
  isDirty = true;
  updateStatusBar('unsaved');
  updateWordCount();
}

/* ─── Clipboard paste (Ctrl+V image) ─── */
document.addEventListener('DOMContentLoaded', () => {
  const ta = document.getElementById('editor-textarea');
  if (!ta) return;
  ta.addEventListener('paste', e => {
    const items = e.clipboardData?.items;
    if (!items) return;
    for (const item of items) {
      if (item.type.startsWith('image/')) {
        e.preventDefault();
        const file = item.getAsFile();
        if (!file) return;
        if (file.size > 10 * 1024 * 1024) { showToast('Pasted image too large (max 10 MB)', true); return; }
        showToast('Compressing image…');
        const reader = new FileReader();
        reader.onload = async ev => {
          const compressed = await compressImage(ev.target.result);
          insertImageMarkdown(compressed, 'pasted-image');
          showToast('✓ Image pasted & inserted');
        };
        reader.readAsDataURL(file);
        break;
      }
    }
  });
});

function showToast(msg, isError = false) {
  const t = document.getElementById('admin-toast');
  t.textContent     = msg;
  t.style.background  = isError ? 'rgba(248,113,113,0.15)' : 'rgba(74,222,128,0.12)';
  t.style.borderColor = isError ? 'rgba(248,113,113,0.4)'  : 'rgba(74,222,128,0.35)';
  t.style.color       = isError ? '#f87171'                : '#4ade80';
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}
