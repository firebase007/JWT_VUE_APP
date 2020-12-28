/* eslint-disable consistent-return */
/* eslint-disable no-tabs */
// import { createRequire } from 'module';
// const require = createRequire(import.meta.url);
const bcrypt = require('bcryptjs')
const Response = require('./response.js')
const dbQuery = require('../db/dbQuery.js')

const Joi = require('@hapi/joi')

/**
   * isValidEmail helper method
   * @param {string} email
   * @returns {Boolean} True or False
   */
const isValidEmail = (email) => {
	const regEx = /\S+@\S+\.\S+/
	return regEx.test(email)
}

/**
   * validatePassword helper method
   * @param {string} password
   * @returns {Boolean} True or False
   */
const validatePassword = (password) => {
	if (password.length <= 5 || password === '') {
		return false
	} return true
}
/**
   * isEmpty helper method
   * @param {string, integer} input
   * @returns {Boolean} True or False
   */
const isEmpty = (input) => {
	if (input === undefined || input === '') {
		return true
	}
	if (input.replace(/\s/g, '').length) {
		return false
	} return true
}

/**
   * empty helper method
   * @param {string, integer} input
   * @returns {Boolean} True or False
   */
const empty = (input) => {
	if (input === undefined || input === '') {
		return true
	}
}

const createUser = async (req, res, next) => {
	const schema = Joi.object({
		firstName: Joi.string().required(),
		lastName: Joi.string().required(),
		email: Joi.string().email().required(),
		password: Joi.string().required(),
	})

	const result = schema.validate(req.body)

	if (result.error) return Response.sendErrorResponse({ res, message: result.error.details[0].message.replace(/['"]/g, ''), statusCode: 422 })

	const emailCheck = 'SELECT * FROM users WHERE email = $1'

	// check if email exists already
	const { rows } = await dbQuery.query(emailCheck, [req.body.email])
	const dbResponse = rows[0]
	if (dbResponse) return Response.sendErrorResponse({ res, message: 'This email address already exists, kindly provide a new email address' })
	return next()
}

/**
   * comparePassword
   * @param {string} hashPassword
   * @param {string} password
   * @returns {Boolean} return True or False
   */
const comparePassword = (hashedPassword, password) => bcrypt.compareSync(password, hashedPassword)

module.exports = {
	isValidEmail,
	validatePassword,
	isEmpty,
	empty,
	createUser,
	comparePassword,
}
