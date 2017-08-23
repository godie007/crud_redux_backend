'use strict'
// imports
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const logger = require('morgan')
const mongoose = require('mongoose')

// port use
const port = process.env.PORT || 3001

// put into the app
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(logger('dev'))
app.use(cors())

// mongoose promise
mongoose.Promise = global.Promise

// setup mongoose
app.db = mongoose.createConnection('mongodb://localhost/clinica')
app.db.on('error', console.error.bind(console, 'mongoose connection error: '))

// config data models
require('./models')(app, mongoose)

// setup routes
require('./router')(app)

// listen port
app.listen(port, () => {
  console.log(`API REST corriendo en http://localhost:${port}`)
})
