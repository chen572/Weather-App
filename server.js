const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')
require('dotenv').config()

const app = express()
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/WeatherAppDB', { useFindAndModify: false })
const router = require('./server/routes/Router')

app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

app.use('/', router)

const { PORT } = process.env
app.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}`)
})