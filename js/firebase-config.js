/* ═══════════════════════════════════════════════
   FIREBASE CONFIGURATION
   ───────────────────────────────────────────────
   SETUP STEPS (one-time):
   1. Go to https://console.firebase.google.com
   2. Click "Add project" → give it a name (e.g. techgurukul) → Continue
   3. Disable Google Analytics (not needed) → Create project
   4. Click "</> Web" icon to add a web app → Register app
   5. Copy the firebaseConfig values shown → paste below
   6. Left menu: Build → Firestore Database → Create database
      → Start in test mode → Choose a region → Enable
   7. Left menu: Firestore → Rules → replace with:
      rules_version = '2';
      service cloud.firestore {
        match /databases/{database}/documents {
          match /{document=**} {
            allow read: if true;
            allow write: if true;
          }
        }
      }
      → Publish
═══════════════════════════════════════════════ */

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyAGG9XERQG1LHZcwdXSXANJJEXWTLr8iUA",
  authDomain: "techgurukul-15e87.firebaseapp.com",
  projectId: "techgurukul-15e87",
  storageBucket: "techgurukul-15e87.firebasestorage.app",
  messagingSenderId: "576816097688",
  appId: "1:576816097688:web:efd8f0fd7ceebf1eb2e3ed"
};

/* ─── Internal state ─── */
const _fbReady = FIREBASE_CONFIG.apiKey !== 'PASTE_API_KEY_HERE' &&
  FIREBASE_CONFIG.apiKey !== '';
let _db = null;

function getDb() {
  if (!_fbReady) return null;
  if (_db) return _db;
  try {
    if (!firebase.apps.length) firebase.initializeApp(FIREBASE_CONFIG);
    _db = firebase.firestore();
    return _db;
  } catch (e) {
    console.error('Firebase init failed:', e);
    return null;
  }
}

/* ─── Read one post ─── */
async function fsRead(postKey) {
  const db = getDb();
  if (!db) return null;
  try {
    const snap = await db.collection('posts').doc(postKey).get();
    return snap.exists ? snap.data() : null;
  } catch { return null; }
}

/* ─── Read all posts ─── */
async function fsReadAll() {
  const db = getDb();
  if (!db) return null;
  try {
    const snap = await db.collection('posts').get();
    const out = {};
    snap.forEach(d => { out[d.id] = d.data(); });
    return out;
  } catch { return null; }
}

/* ─── Write one post ─── */
async function fsWrite(postKey, data) {
  const db = getDb();
  if (!db) return false;
  try {
    await db.collection('posts').doc(postKey).set(data);
    return true;
  } catch (e) {
    console.error('Firestore write failed:', e);
    return false;
  }
}

/* ─── Delete one post ─── */
async function fsDelete(postKey) {
  const db = getDb();
  if (!db) return;
  try { await db.collection('posts').doc(postKey).delete(); } catch { }
}
