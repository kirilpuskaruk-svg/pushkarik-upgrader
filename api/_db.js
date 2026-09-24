let hasPostgres = Boolean(
  process.env.POSTGRES_URL || 
  process.env.STORAGE_URL || 
  process.env.DATABASE_URL || 
  process.env.POSTGRES_PRISMA_URL || 
  process.env.POSTGRES_URL_NON_POOLING
);

let sql;
if (hasPostgres) {
  try {
    sql = require('@vercel/postgres').sql;
  } catch (e) {
    hasPostgres = false;
  }
}

if (!hasPostgres) {
  // Safe mock for demo environments without Postgres provisioned
  sql = async function mockSql() {
    return { rows: [] };
  };
}

module.exports = { sql, hasPostgres };

