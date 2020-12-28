/* eslint-disable indent */

const express = require('express')
const { registerUser, loginUser, me } = require('../controller/users.js')

const  {
 createUser,
} = require( '../helpers/validation.js')

const {
  decodeHeader,
 } = require( '../middleware/verifyAuth.js')

const router = express.Router()

// user Routes
router.post('/auth/signup', createUser, registerUser)
router.post('/auth/login', loginUser)
router.get('/me', decodeHeader, me)

module.exports = router
