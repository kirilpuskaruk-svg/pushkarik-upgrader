const crypto = require('crypto');
const { sql } = require('../_db');
const { sendJson } = require('../_auth');

module.exports = async function handler(req, res) {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  if (!clientId) {
    return sendJson(res, 500, { error: 'GOOGLE_CLIENT_ID is not configured on server' });
  }

  const host = req.headers['x-forwarded-host'] || req.headers.host || 'localhost';
  const proto = req.headers['x-forwarded-proto'] || 'https';
  const redirectUri = `${proto}://${host}/api/auth/google/callback`;

  // Generate cryptographically secure state & nonce
  const state = crypto.randomBytes(32).toString('hex');
  const nonce = crypto.randomBytes(32).toString('hex');

  // Store state in DB with 10-minute expiry
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS oauth_states (
        state VARCHAR(255) PRIMARY KEY,
        nonce VARCHAR(255),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        expires_at TIMESTAMP WITH TIME ZONE NOT NULL
      );
    `;
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
    await sql`INSERT INTO oauth_states (state, nonce, expires_at) VALUES (${state}, ${nonce}, ${expiresAt.toISOString()})`;
  } catch (err) {
    console.error('Failed to store OAuth state:', err);
  }

  const googleAuthUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
  googleAuthUrl.searchParams.set('client_id', clientId);
  googleAuthUrl.searchParams.set('redirect_uri', redirectUri);
  googleAuthUrl.searchParams.set('response_type', 'code');
  googleAuthUrl.searchParams.set('scope', 'openid email profile');
  googleAuthUrl.searchParams.set('state', state);
  googleAuthUrl.searchParams.set('nonce', nonce);
  googleAuthUrl.searchParams.set('access_type', 'offline');
  googleAuthUrl.searchParams.set('prompt', 'select_account');

  res.writeHead(302, { Location: googleAuthUrl.toString() });
  res.end();
};
