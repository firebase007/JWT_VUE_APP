// import { Pool } from 'pg'
// import * as pg from 'pg'
// const { Pool } = pg
// const { createRequire } = require('module');
// const require = createRequire(import.meta.url);

const pg = require('pg')

const dotenv = require('dotenv')

dotenv.config()
console.log(process.env.DATABASE_URL, 'DATABASE_URL')
const databaseConfig = { connectionString: process.env.DATABASE_URL , ssl: {
    rejectUnauthorized: false
  }}
const pool = new pg.Pool(databaseConfig)

module.exports =  pool
