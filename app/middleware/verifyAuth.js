/* eslint-disable no-tabs */
/* eslint-disable no-unused-vars */
const  dotenv = require('dotenv')
const Response = require('../helpers/response.js')
const Utils = require('../helpers/utils.js')

dotenv.config()

const authenticate = () => {
	console.log('got here')
	return (req, res, next) => {
		try {
			let token = req.headers['x-access-token'] || req.headers.authorization || req.body.token
			console.log(token, 'token')
			if (!token) throw new Error('No token provided.')
			if (token.startsWith('Bearer ')) token = token.slice(7, token.length)

			if (!token || token === '' || token === 'undefined') throw new Error('No token provided.')

			const user = Utils.verifyJWT(token)

			if (!user) throw new Error('Failed to authenticate token. ')

			res.user = user.data
			delete user.data.password
			res.token = token
			return next()
		} catch (e) {
			return Response.sendErrorResponse({ res, message: 'Failed to authenticate token', statusCode: 401 })
		}
	}
}

const decodeHeader = (req, res, next) => {
	let token = req.headers['x-access-token'] || req.headers.authorization || req.body.token
	console.log(token, '------------------')
	if (!token) {
		return Response.sendErrorResponse({ res, message: 'No token provided', statusCode: 401 })
	}
	if (token.startsWith('Bearer ')) {
		// Remove Bearer from string
		token = token.slice(7, token.length)
		if (!token || token === '') Response.sendErrorResponse({ res, message: 'No token provided', statusCode: 401 })
	}
	const decoded = Utils.verifyJWT(token)
	if (!decoded) Response.sendErrorResponse({ res, message: 'invalid signature', statusCode: 403 })
	if (decoded) res.user = decoded

	res.token = token
	return next()
}

module.exports = { authenticate, decodeHeader }
