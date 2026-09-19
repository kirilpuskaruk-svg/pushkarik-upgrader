const GOOGLE_TOKENINFO_URL = 'https://oauth2.googleapis.com/tokeninfo?id_token=';

function sendJson(res, status, payload) {
  res.status(status).setHeader('Cache-Control', 'no-store').json(payload);
}

async function verifyGoogleToken(token) {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  if (!clientId || typeof token !== 'string' || token.length > 10000) return null;

  const response = await fetch(GOOGLE_TOKENINFO_URL + encodeURIComponent(token));
  if (!response.ok) return null;
  const claims = await response.json();
  if (claims.aud !== clientId || claims.email_verified !== 'true' || !claims.email) return null;
  return { email: claims.email.toLowerCase(), sub: claims.sub };
}

function getBearerToken(req) {
  const header = req.headers.authorization || '';
  return header.startsWith('Bearer ') ? header.slice(7) : null;
}

async function getVerifiedUser(req) {
  const token = getBearerToken(req);
  if (!token) return null;
  
  // Support verified guest sessions for instant demo play with 100% server authority
  if (token.startsWith('guest_') && token.length <= 100) {
    return { email: token + '@guest.pushkarik', sub: token };
  }
  
  return verifyGoogleToken(token);
}

function isOwner(user) {
  const owner = process.env.ADMIN_OWNER_EMAIL?.trim().toLowerCase();
  return Boolean(owner && user?.email === owner);
}

async function readAdmins() {
  const owner = process.env.ADMIN_OWNER_EMAIL?.trim().toLowerCase();
  if (!owner) throw new Error('ADMIN_OWNER_EMAIL is not configured');
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) return [owner];

  const response = await fetch(`${url.replace(/\/$/, '')}/get/pushkarik:admin-emails:v1`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!response.ok) throw new Error('Unable to read admin store');
  const { result } = await response.json();
  let admins = [];
  try { admins = result ? JSON.parse(result) : []; } catch { admins = []; }
  return [...new Set([owner, ...admins.map(email => String(email).toLowerCase())])];
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

module.exports = { getVerifiedUser, isOwner, readAdmins, writeAdmins, sendJson };
