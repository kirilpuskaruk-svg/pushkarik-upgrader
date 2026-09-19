if (!process.env.POSTGRES_URL) {
  process.env.POSTGRES_URL = 
    process.env.STORAGE_URL || 
    process.env.DATABASE_URL || 
    process.env.POSTGRES_PRISMA_URL || 
    process.env.POSTGRES_URL_NON_POOLING;
}

const { sql } = require('@vercel/postgres');

module.exports = { sql };
