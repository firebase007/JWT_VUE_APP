/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-tabs */

import express from 'express'
import 'babel-polyfill'
import cors from 'cors'
import usersRoute from '../app/route/user.js'

import path from 'path'


const __dirname = path.resolve();

const app = express()

// Add  cors middleware
app.use(cors())

// Add middleware for parsing JSON and urlencoded data
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Serve static files from the Vue app
app.use(express.static(path.join(`${__dirname}/client/dist`)))

// The "catchall" handler: for any request that doesn't
// match one above, send back Vue's index.html file.
app.get('/*', (req, res) => {
	res.sendFile(path.join(`${__dirname}/client/dist/index.html`))
})

app.use('/api/v1', usersRoute)

app.get('/', (req, res) => {
	res.status(200).send('Welcome to the JWT authentication App with Node and Vue.js')
})

// catch 404 and forward to error handler
app.use((req, res, next) => {
	const err = new Error('Not Found')
	console.log(err)
	err.status = 404
	res.send('Route not found')
	next(err)
})

console.log(process.env.PORT, 'APP-PORT')

const server = app.listen(process.env.PORT || 3000).on('listening', () => {
	console.log(`App live and listening on port: ${process.env.PORT}` || 3000)
})


export default app
