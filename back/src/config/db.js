
// requiere instalar: npm i pg
const { Pool } = require('pg')

// en la raiz del proyecto se generar archivo .env, con la data de las variables de entorno
// requiere instalar: npm i dotenv
// deconstruye las variables de entorno
//variables de entorno con dotenv
require('dotenv').config()
const {DB_HOST, DB_USER, DB_PASS, DB_NAME} = process.env;

const DB = new Pool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    allowExitOnIdle: true
})

module.exports = {
    DB
}
