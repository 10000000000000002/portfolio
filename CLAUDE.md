# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**TechGurukul** — a static HTML/CSS/JS portfolio and AI course platform. No build step, no framework, no package manager. Open any `.html` file directly in a browser or serve with any static file server.

```
python -m http.server 8080   # then open http://localhost:8080
```

## Architecture

### Pages and their controllers

| Page | JS controller | Purpose |
|------|--------------|---------|
| `index.html` | `js/main.js` | Landing page, contact form (EmailJS) |
| `courses.html` | `js/courses.js` | Course catalog, payment modal |
| `post.html` | `js/post.js` | Course content viewer (URL: `?tier=TIER&module=INDEX`) |
| `login.html` | `js/login.js` | Student registration / demo booking |
| `admin.html` | `js/admin.js` | Content editor, enrollment codes, registrations |

### Shared data layer

**`js/course-data.js`** — single source of truth for all course tiers. Exports `TIERS` object loaded by every page. Never duplicate tier metadata anywhere else.

```js
TIERS[tierKey] = {
  label, class, color, pill, price, original,
  modules: [{ icon, title, duration, lessons, isProject? }]
}
// Keys: "foundation" | "explorer" | "expert" | "ai_engineer"
```

**`js/firebase-config.js`** — Firebase init + Firestore helpers used by all pages:
- `fsRead/fsWrite/fsDelete/fsReadAll` → `posts` collection (doc ID: `"TIER_INDEX"`)
- `fsReadRegistration/fsWriteRegistration/fsVerifyRegistration/fsDeleteRegistration` → `registrations` collection (doc ID: phone number `"+91XXXXXXXXXX"`)
- All functions return `null`/`false` silently if Firebase is not configured — never throw.

**`js/seed-posts.js`** — hardcoded fallback Markdown content for free modules. **Critical**: backtick characters inside template literal strings must be escaped as `` \` `` or the entire file silently fails to parse, making `SEED_POSTS` undefined.

### Content priority (post.js)

```
Firestore (fsRead) → localStorage (tg_post_POSTKEY) → SEED_POSTS
```

Admin saves write to both localStorage and Firestore. On admin panel load, Firestore syncs into localStorage.

### Enrollment gating (post.js)

Modules `0` and `1` of every tier are free. Modules `2+` require one of:
- `localStorage.getItem("tg_enrolled_TIER") === "true"` — set after Firestore payment verification or activation code
- Valid SHA-256 activation code matching `tg_grant_hash_TIER`

When a student hits a locked module: `showLocked(state)` renders an overlay. `state` is `"not-registered"` or `"pending"` (checked from Firestore via `fsReadRegistration`).

### Student session

Stored in **`sessionStorage`** (clears on tab close):
- `tg_student_name` — display name
- `tg_student_phone` — `+91XXXXXXXXXX`

Navbar chip on `post.html` and `courses.html` injects from sessionStorage via inline `<script>` at bottom of each page. Login redirects to `courses.html` after success; `login.html?mode=dashboard` shows the enrollment card.

### Admin panel

Password stored as SHA-256 hash in `tg_admin_h` localStorage. Default: `TechGurukul@2025`. Session in `sessionStorage` with 2-hour timeout and brute-force lockout (5 attempts → 15 min).

Enrollment codes: admin generates → SHA-256 stored as `tg_grant_hash_TIER`, plaintext as `tg_grant_plain_TIER` → copy and send to student → student enters on locked page → `tg_enrolled_TIER=true` set on match.

### localStorage key reference

| Key | Value |
|-----|-------|
| `tg_enrolled_TIER` | `"true"` when student has access |
| `tg_grant_hash_TIER` | SHA-256 hex of activation code |
| `tg_grant_plain_TIER` | Plaintext activation code (admin only) |
| `tg_posts` | JSON index of all admin-saved posts |
| `tg_post_TIER_INDEX` | Individual post `{ content, status, tier, moduleIndex, updatedAt }` |
| `tg_reading_mode` | `"dark"` or `"light"` |
| `tg_trans_POSTKEY_LANG` | Cached Google Translate output (plain string) |
| `tg_admin_h` | SHA-256 of admin password |
| `tg_login_state` | `{ attempts, lockedUntil }` brute-force state |

## Key Constraints

**CSP is enforced on every page.** Adding a new CDN script or API call requires updating the `Content-Security-Policy` meta tag on that page. Firebase domains needed: `https://www.gstatic.com` in `script-src`, `https://*.googleapis.com https://*.firebaseio.com https://*.firebase.google.com wss://*.firebaseio.com` in `connect-src`.

**`seed-posts.js` backtick rule.** Any Markdown content added to `SEED_POSTS` that contains inline code (`` `code` ``) must escape the backticks as `` \`code\` `` — they live inside JS template literals.

**Module dot indicator in admin sidebar** checks both `getPosts()[key]` (localStorage) and `SEED_POSTS[key]` — both must be checked when determining if a module has content.

## Firestore Collections

| Collection | Doc ID | Fields |
|------------|--------|--------|
| `posts` | `TIER_INDEX` | `content` (Markdown), `status`, `tier`, `moduleIndex`, `updatedAt`, `publishedAt` |
| `registrations` | `+91PHONE` | `name`, `phone`, `registeredAt`, `[tierKey]: "pending"\|"verified"`, `demoRequest?`, `demoCourse?`, `demoDatetime?` |

## Deployment

Hosted on **GitHub Pages** at `https://10000000000000002.github.io/portfolio`. Push to `main` → auto-deploys via `.github/workflows/static.yml`. Custom domain configured in repo Settings → Pages.
