// Requires the pg library: npm i pg
const { Pool } = require('pg');

// Requires dotenv for environment variable management: npm i dotenv
require('dotenv').config();

// Destructure environment variables
const { DB_HOST, DB_USER, DB_PASS, DB_NAME, DB_PORT } = process.env;

// Validate required environment variables
if (!DB_HOST || !DB_USER || !DB_PASS || !DB_NAME || !DB_PORT) {
    console.error("Missing one or more required database environment variables.");
    process.exit(1); // Exit the application with an error code
}

// Create a new Pool instance with connection settings
const DB = new Pool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    port: DB_PORT,
    max: 10, // Maximum number of connections in the pool
    idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
    connectionTimeoutMillis: 2000, // Wait 2 seconds before timing out on connection attempts
    allowExitOnIdle: true,
});

// Handle connection errors
DB.on('error', (err) => {
    console.error("Unexpected error on idle client", err);
    process.exit(-1);
});

module.exports = {
    DB,
};

