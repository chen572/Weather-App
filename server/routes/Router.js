const express = require('express')
const router = express.Router()
const City = require('../models/City')
const rq = require('request-promise')

const { API_KEY } = process.env
const baseURL = 'https://api.openweathermap.org/data/2.5/weather'

router.get('/city/:cityName', (req, res) => {
    const { cityName } = req.params
    rq({
        uri: baseURL,
        qs: {
            q: cityName,
            appid: API_KEY
        }
    })
        .then(data => { res.send(data) })
        .catch(err => { res.send(JSON.parse(err.error)) })
})

router.get('/cities', (req, res) => {
    City
        .find({})
        .exec((e, d) => { e ? res.send(e) : res.send(d) })
})

router.post('/city', (req, res) => {
    const { name, temperature, condition, conditionPic } = req.body
    const c = new City({
        name,
        temperature,
        condition,
        conditionPic
    })
    c
        .save()
        .then((d) => { res.send({ city: d, msg: 'Saved' }) })
        .catch((e) => { res.send(e) })
})

router.delete('/city/:cityName', (req, res) => {
    const { cityName } = req.params
    City
        .findOneAndDelete({ name: cityName })
        .exec((e, d) => { e ? res.send(e) : res.send({ city: d, msg: 'Deleted' }) })
})

module.exports = router