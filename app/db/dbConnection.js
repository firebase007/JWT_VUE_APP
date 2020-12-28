/* eslint-disable no-tabs */
/* eslint-disable no-console */
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const pool = require('./pool.js')

pool.on('connect', () => {
	console.log('connected to the db')
})

/**
 * Create User Table
 */
const createUserTable = () => {
	const userCreateQuery = `CREATE TABLE IF NOT EXISTS users
  (id SERIAL PRIMARY KEY, 
  email VARCHAR(100) UNIQUE NOT NULL, 
  firstName VARCHAR(100), 
  lastName VARCHAR(100), 
  password VARCHAR(100) NOT NULL,
  createdOn DATE NOT NULL)`

	pool.query(userCreateQuery)
		.then((res) => {
			console.log(res, 'success response ------------')
			pool.end()
		})
		.catch((err) => {
			console.log(err, 'err response -------------')
			pool.end()
		})
}

/**
 * Drop User Table
 */
const dropUserTable = () => {
	const usersDropQuery = 'DROP TABLE IF EXISTS users'
	pool.query(usersDropQuery)
		.then((res) => {
			console.log(res, 'response')
			pool.end()
		})
		.catch((err) => {
			console.log(err, 'error')
			pool.end()
		})
}

pool.on('remove', () => {
	console.log('client removed')
	process.exit(0)
})

export {
	createUserTable,
	dropUserTable,
}

require('make-runnable')
