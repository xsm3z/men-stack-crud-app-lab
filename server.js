require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const MONGO_URI = process.env.MONGO_URI
const Note = require('./models/car')
const logger = require('morgan')

app.use(express.json())
app.use(logger('dev'))

mongoose.connect(MONGO_URI)

mongoose.connection.once('open', () => {
  console.log('Connection with mongo is established')
})

mongoose.connection.on('error', () => {
  console.error('Mongo is trippin')
})


// create


// read


// index and show 


// update 


// delete

app.listen(3000, () => {
  console.log('Application accepting requests on port 3000')
})