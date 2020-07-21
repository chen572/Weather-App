const express = require('express')
const router = express.Router()
const City = require('../models/City')
const rq = require('request-promise')

const { API_KEY } = process.env
const baseURL = 'https://api.openweathermap.org/data/2.5/weather'

router.get('/city/:cityName', (req, res) => {
    const { cityName } = req.params
    const { lat, long } = req.query
    if (lat && long) {
        rq({
            uri: baseURL,
            qs: {
                lat,
                lon: long,
                appid: API_KEY,
                units: 'metric'
            },
            json: true
        })
            .then(data => {
                res.send({
                    name: data.name,
                    temperature: Math.floor(data.main.temp),
                    condition: data.weather[0].main,
                    conditionPic: data.weather[0].icon,
                    saved: false
                })
            })
            .catch(err => { res.end() })
    }
    rq({
        uri: baseURL,
        qs: {
            q: cityName,
            appid: API_KEY,
            units: 'metric'
        },
        json: true
    })
        .then(data => {
            res.send({
                name: data.name,
                temperature: Math.floor(data.main.temp),
                condition: data.weather[0].main,
                conditionPic: data.weather[0].icon,
                saved: false
            })
        })
        .catch(err => { res.end() })
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
        conditionPic,
        saved: true
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

router.put('/city/:cityName', async (req, res) => {
    const { cityName } = req.params
    let update =
        await rq({
            uri: baseURL,
            qs: {
                q: cityName,
                appid: API_KEY,
                units: 'metric'
            },
            json: true
        })

    update = {
        name: update.name,
        temperature: Math.floor(update.main.temp),
        condition: update.weather[0].main,
        conditionPic: update.weather[0].icon,
        saved: true
    }
    City
        .findOneAndUpdate({ name: cityName }, update)
        .exec((e, d) => { res.send(d) })
})

router.put('/cities/update', async (req, res) => {
    const cities = await City.find({})
    Promise.all(
        cities.map(c => {
            return rq({
                uri: baseURL,
                qs: {
                    q: c.name,
                    appid: API_KEY,
                    units: 'metric'
                },
                json: true
            })
        })
    ).then(updatedCities => {
        updatedCities = updatedCities.map(c => ({
            name: c.name,
            temperature: Math.floor(c.main.temp),
            condition: c.weather[0].main,
            conditionPic: c.weather[0].icon,
            saved: true
        }))
        Promise
            .all(updatedCities.map(c => City.findOneAndUpdate({ name: c.name }, c)))
            .then(() => { res.end() })
    })
})

module.exports = router