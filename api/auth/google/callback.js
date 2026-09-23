const crypto = require('crypto');
const { sql } = require('../../_db');
const { sendJson, getBearerToken } = require('../../_auth');

module.exports = async function handler(req, res) {
  // 0. HANDLE LOGOUT IF REQUEST METHOD IS POST OR QUERY/ACTION IS LOGOUT
  if (req.method === 'POST') {
    const token = getBearerToken(req);
    if (token) {
      try {
        await sql`DELETE FROM sessions WHERE token = ${token}`;
      } catch (e) {
        console.error('Logout error:', e);
      }
    }
    res.setHeader('Set-Cookie', 'pushkarik_session=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Lax');
    return sendJson(res, 200, { success: true, message: 'Logged out successfully' });
  }

  const url = new URL(req.url, `https://${req.headers.host || 'localhost'}`);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const error = url.searchParams.get('error');

  if (error) {
    res.writeHead(302, { Location: '/?auth_error=' + encodeURIComponent(error) });
    return res.end();
  }

  if (!code || !state) {
    res.writeHead(302, { Location: '/?auth_error=missing_code_or_state' });
    return res.end();
  }

  // 1. Verify and consume state to prevent CSRF / Replay attacks
  try {
    const stateRes = await sql`
      DELETE FROM oauth_states 
      WHERE state = ${state} AND expires_at > CURRENT_TIMESTAMP 
      RETURNING nonce;
    `;
    if (stateRes.rows.length === 0) {
      res.writeHead(302, { Location: '/?auth_error=invalid_or_expired_state' });
      return res.end();
    }
    const expectedNonce = stateRes.rows[0].nonce;

    // 2. Exchange authorization code for tokens
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const host = req.headers['x-forwarded-host'] || req.headers.host || 'localhost';
    const proto = req.headers['x-forwarded-proto'] || 'https';
    const redirectUri = `${proto}://${host}/api/auth/google/callback`;

    if (!clientId || !clientSecret) {
      console.error('Google OAuth credentials missing on server');
      res.writeHead(302, { Location: '/?auth_error=server_oauth_unconfigured' });
      return res.end();
    }

    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code'
      })
    });

    if (!tokenResponse.ok) {
      const errText = await tokenResponse.text();
      console.error('Token exchange error:', errText);
      res.writeHead(302, { Location: '/?auth_error=token_exchange_failed' });
      return res.end();
    }

    const tokenData = await tokenResponse.json();
    const idToken = tokenData.id_token;

    // 3. Verify ID Token claims
    const tokenInfoRes = await fetch('https://oauth2.googleapis.com/tokeninfo?id_token=' + encodeURIComponent(idToken));
    if (!tokenInfoRes.ok) {
      res.writeHead(302, { Location: '/?auth_error=invalid_id_token' });
      return res.end();
    }

    const claims = await tokenInfoRes.json();
    if (claims.aud !== clientId) {
      res.writeHead(302, { Location: '/?auth_error=invalid_audience' });
      return res.end();
    }
    if (claims.email_verified !== 'true' && claims.email_verified !== true) {
      res.writeHead(302, { Location: '/?auth_error=unverified_email' });
      return res.end();
    }

    const email = claims.email.toLowerCase().trim();
    const googleId = claims.sub;
    const name = claims.name || email.split('@')[0];
    const picture = claims.picture || 'https://lh3.googleusercontent.com/a/default-user';

    // 4. Find or create user in DB (Account linking by email)
    const ownerEmail = process.env.ADMIN_OWNER_EMAIL?.trim().toLowerCase();
    const isProjectOwner = Boolean(ownerEmail && email === ownerEmail);
    const assignedRole = isProjectOwner ? 'owner' : 'user';

    let userRes = await sql`SELECT * FROM users WHERE id = ${googleId} OR email = ${email} LIMIT 1`;
    let user = userRes.rows[0];

    if (!user) {
      // First time user: default role is always 'user' (never admin, unless verified owner)
      userRes = await sql`
        INSERT INTO users (id, email, balance, role)
        VALUES (${googleId}, ${email}, 10000, ${assignedRole})
        RETURNING *;
      `;
      user = userRes.rows[0];

      await sql`
        INSERT INTO inventory (user_id, item_id, status)
        VALUES (${googleId}, 'agent_1', 'ACTIVE');
      `;
    } else {
      // Account linking: update ID if user logged in by email previously
      if (user.id !== googleId) {
        await sql`UPDATE users SET id = ${googleId} WHERE email = ${email}`;
        user.id = googleId;
      }
      if (isProjectOwner && user.role !== 'owner') {
        await sql`UPDATE users SET role = 'owner' WHERE id = ${googleId}`;
        user.role = 'owner';
      }
    }

    // 5. Create secure server-side session in Postgres
    await sql`
      CREATE TABLE IF NOT EXISTS sessions (
        token VARCHAR(255) PRIMARY KEY,
        user_id VARCHAR(255) REFERENCES users(id) ON DELETE CASCADE,
        expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // 7-day session token
    const sessionToken = crypto.randomBytes(48).toString('hex');
    const sessionExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    await sql`
      INSERT INTO sessions (token, user_id, expires_at)
      VALUES (${sessionToken}, ${user.id}, ${sessionExpiresAt.toISOString()});
    `;

    // 6. Set HttpOnly, Secure, SameSite cookie and redirect home
    const isProduction = process.env.NODE_ENV === 'production' || host.includes('vercel.app');
    const cookieFlags = [
      `pushkarik_session=${sessionToken}`,
      `Path=/`,
      `Expires=${sessionExpiresAt.toUTCString()}`,
      `HttpOnly`,
      `SameSite=Lax`,
      isProduction ? 'Secure' : ''
    ].filter(Boolean).join('; ');

    res.setHeader('Set-Cookie', cookieFlags);
    
    // Also pass sessionToken in URL hash temporarily for SPA client state sync
    const clientUserPayload = encodeURIComponent(JSON.stringify({
      id: user.id,
      email: user.email,
      name: name,
      picture: picture,
      role: user.role,
      token: sessionToken
    }));

    res.writeHead(302, { Location: `/#session=${sessionToken}&user=${clientUserPayload}` });
    return res.end();

  } catch (err) {
    console.error('OAuth Callback Error:', err);
    res.writeHead(302, { Location: '/?auth_error=' + encodeURIComponent(err.message || 'oauth_internal_error') });
    return res.end();
  }
};
