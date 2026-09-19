const { sql } = require('./_db');
const crypto = require('crypto');

const GOOGLE_TOKENINFO_URL = 'https://oauth2.googleapis.com/tokeninfo?id_token=';

function sendJson(res, status, payload) {
  res.status(status).setHeader('Cache-Control', 'no-store').json(payload);
}

function parseCookies(req) {
  const list = {};
  const rc = req.headers.cookie;
  if (!rc) return list;
  rc.split(';').forEach(cookie => {
    const parts = cookie.split('=');
    list[parts.shift().trim()] = decodeURI(parts.join('='));
  });
  return list;
}

function getBearerToken(req) {
  const header = req.headers.authorization || '';
  if (header.startsWith('Bearer ')) {
    return header.slice(7).trim();
  }
  const cookies = parseCookies(req);
  if (cookies.pushkarik_session) {
    return cookies.pushkarik_session;
  }
  return null;
}

async function verifyGoogleToken(token) {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  if (!clientId || typeof token !== 'string' || token.length > 10000) return null;

  try {
    const response = await fetch(GOOGLE_TOKENINFO_URL + encodeURIComponent(token));
    if (!response.ok) return null;
    const claims = await response.json();
    
    // Strict Claims & Audience & Expiry verification
    if (claims.aud !== clientId) return null;
    if (claims.email_verified !== 'true' && claims.email_verified !== true) return null;
    if (!claims.email || !claims.sub) return null;
    
    // Verify issuer
    const validIssuers = ['accounts.google.com', 'https://accounts.google.com'];
    if (claims.iss && !validIssuers.includes(claims.iss)) return null;

    return { 
      email: claims.email.toLowerCase().trim(), 
      sub: claims.sub,
      name: claims.name || claims.email.split('@')[0],
      picture: claims.picture || ''
    };
  } catch (err) {
    console.error('Google token verification error:', err);
    return null;
  }
}

async function getVerifiedUser(req) {
  const token = getBearerToken(req);
  if (!token) return null;

  // 1. Check if token is a server-side session token
  try {
    const sessionRes = await sql`
      SELECT s.token, s.user_id, s.expires_at, u.email, u.role, u.balance
      FROM sessions s
      JOIN users u ON s.user_id = u.id
      WHERE s.token = ${token} AND s.expires_at > CURRENT_TIMESTAMP
      LIMIT 1
    `;
    if (sessionRes.rows.length > 0) {
      const s = sessionRes.rows[0];
      return {
        sub: s.user_id,
        email: s.email.toLowerCase().trim(),
        role: s.role,
        balance: s.balance,
        isSession: true
      };
    }
  } catch (e) {
    // sessions table might not exist yet if not initialized
  }

  // 2. Verified Google ID Token
  const googleClaims = await verifyGoogleToken(token);
  if (googleClaims) {
    return googleClaims;
  }

  // 3. Guest Token (restricted to ordinary player role only, NEVER admin)
  if (token.startsWith('guest_') && token.length <= 100) {
    return { 
      email: token + '@guest.pushkarik', 
      sub: token, 
      role: 'user',
      isGuest: true 
    };
  }

  return null;
}

function isOwner(user) {
  if (!user || !user.email) return false;
  const owner = process.env.ADMIN_OWNER_EMAIL?.trim().toLowerCase();
  return Boolean(owner && user.email.toLowerCase() === owner);
}

async function isAdmin(user) {
  if (!user) return false;
  if (isOwner(user)) return true;
  
  // Check Database role
  try {
    if (user.sub) {
      const res = await sql`SELECT role, email FROM users WHERE id = ${user.sub} LIMIT 1`;
      if (res.rows.length > 0) {
        const dbRole = res.rows[0].role;
        if (dbRole === 'owner' || dbRole === 'admin') return true;
      }
    }
  } catch (e) {
    console.error('Error querying user role from DB:', e);
  }

  // Check KV / delegated admins
  try {
    const admins = await readAdmins();
    if (admins.includes(user.email.toLowerCase())) return true;
  } catch (e) {}

  return false;
}

async function readAdmins() {
  const owner = process.env.ADMIN_OWNER_EMAIL?.trim().toLowerCase();
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) return owner ? [owner] : [];

  try {
    const response = await fetch(`${url.replace(/\/$/, '')}/get/pushkarik:admin-emails:v1`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!response.ok) return owner ? [owner] : [];
    const { result } = await response.json();
    let admins = [];
    try { admins = result ? JSON.parse(result) : []; } catch { admins = []; }
    return [...new Set([owner, ...admins.map(email => String(email).toLowerCase())])].filter(Boolean);
  } catch (e) {
    return owner ? [owner] : [];
  }
}

async function writeAdmins(admins) {
  const owner = process.env.ADMIN_OWNER_EMAIL?.trim().toLowerCase();
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) throw new Error('KV storage is not configured');
  const value = JSON.stringify([...new Set(admins.map(email => String(email).toLowerCase()))].filter(email => email !== owner));
  const response = await fetch(`${url.replace(/\/$/, '')}/set/pushkarik:admin-emails:v1/${encodeURIComponent(value)}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!response.ok) throw new Error('Unable to write admin store');
}

module.exports = { 
  getVerifiedUser, 
  isOwner, 
  isAdmin, 
  readAdmins, 
  writeAdmins, 
  sendJson,
  parseCookies 
};
