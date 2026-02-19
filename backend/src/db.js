// Connection layer - Connects Node/Express to PostrgreSQL

const { Pool } = require("pg");

// If DATABASE_URL exists (common on hosting), use it.
// Otherwise, pg will read PGHOST/PGPORT/PGUSER/PGPASSWORD/PGDATABASE from .env automatically.
const pool = process.env.DATABASE_URL
  ? new Pool({ connectionString: process.env.DATABASE_URL })
  : new Pool();

module.exports = {
  query: (text, params) => pool.query(text, params),
};
