const express = require('express')
const router = express.Router()
const City = require('../models/City')

const { refactorCityObj, weatherApiRQ } = require('../helpers/functions')

router.get('/city/:cityName', async (req, res) => {
    const { cityName } = req.params
    const { lat, long } = req.query
    const data = await weatherApiRQ(cityName, lat, long)
    res.send(refactorCityObj(data, 'new'))
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
    const update = refactorCityObj(await weatherApiRQ(cityName), 'old')
    City
        .findOneAndUpdate({ name: cityName }, update)
        .exec((e, d) => { res.send(d) })
})

router.put('/cities/update', async (req, res) => {
    const cities = await City.find({})
    Promise
        .all(cities.map(c => weatherApiRQ(c.name)))
        .then(updatedCities => {
            updatedCities = updatedCities.map(c => refactorCityObj(c, 'old'))
            Promise
                .all(updatedCities.map(c => City.findOneAndUpdate({ name: c.name }, c)))
                .then(() => { res.end() })
        })
})

module.exports = router