/* eslint-disable no-tabs */
require('dotenv').config()

const { env } = process

module.exports = {
	name: env.APP_NAME,
	baseUrl: env.APP_BASE_URL,
	port: env.APP_PORT,
	databases: {
		postgres: {
			user: env.PG_USERNAME,
			password: env.PG_PASSWORD,
			host: env.PG_HOST,
			port: env.PG_PORT,
			db_name: env.PG_DATABASE,
			url: env.PG_URL,
		},
	},

}
