const { sql } = require('../_db');
const { getVerifiedUser, sendJson } = require('../_auth');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return sendJson(res, 405, { error: 'Method not allowed' });

  try {
    const googleUser = await getVerifiedUser(req);
    if (!googleUser) return sendJson(res, 401, { error: 'Unauthorized' });
    const { sub: googleId } = googleUser;

    const { itemDbIds, targetStatus, idempotencyKey } = req.body; // targetStatus: 'VAULT' or 'ACTIVE'
    if (!itemDbIds || !Array.isArray(itemDbIds) || !targetStatus || !idempotencyKey) {
      return sendJson(res, 400, { error: 'Missing parameters' });
    }

    if (targetStatus !== 'VAULT' && targetStatus !== 'ACTIVE') {
      return sendJson(res, 400, { error: 'Invalid target status' });
    }

    const idempotencyCheck = await sql`SELECT id FROM transactions WHERE idempotency_key = ${idempotencyKey}`;
    if (idempotencyCheck.rows.length > 0) return sendJson(res, 409, { error: 'Transaction already processed' });

    // Update multiple items
    if (itemDbIds.length > 0) {
      // In PostgreSQL we can use ANY($1)
      const allowedSourceStatus = targetStatus === 'VAULT' ? 'ACTIVE' : 'VAULT';
      
      // We must construct parameterized query or use loop.
      // Since it's a few items, we can just do a loop or string format, but loop with parameterized is safer.
      for (const id of itemDbIds) {
        await sql`
          UPDATE inventory 
          SET status = ${targetStatus} 
          WHERE id = ${id} AND user_id = ${googleId} AND status = ${allowedSourceStatus}
        `;
      }
    }

    await sql`INSERT INTO transactions (user_id, action, idempotency_key) VALUES (${googleId}, 'VAULT_TRANSFER', ${idempotencyKey})`;

    return sendJson(res, 200, { success: true });

  } catch (error) {
    console.error('Vault Error:', error);
    return sendJson(res, 500, { error: 'Internal Server Error' });
  }
};
