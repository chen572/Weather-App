const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const path = require('path')
require('dotenv').config()

const app = express()
mongoose.connect('mongodb://localhost/WeatherAppDB')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const { PORT } = process.env || 3000
app.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}`)
})