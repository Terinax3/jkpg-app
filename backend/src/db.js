// Connection layer - Connects Node/Express to PostrgreSQL

const { Pool } = require("pg");

// If DATABASE_URL exists (common on hosting), use it.
// Otherwise, pg will read PGHOST/PGPORT/PGUSER/PGPASSWORD/PGDATABASE from .env automatically.
const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || "appuser",
  password: process.env.DB_PASSWORD || "apppass",
  database: process.env.DB_NAME || "jkpgcity",
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
