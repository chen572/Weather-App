const rq = require('request-promise')

const { API_KEY } = process.env
const baseURL = 'https://api.openweathermap.org/data/2.5/weather'

module.exports =
{
    refactorCityObj: (cityObj, option) => {
        return {
            name: cityObj.name,
            temperature: Math.floor(cityObj.main.temp),
            condition: cityObj.weather[0].main,
            conditionPic: cityObj.weather[0].icon,
            saved: option === 'new' ? false : true
        }
    },
    weatherApiRQ: (cityName, lat, lon) => {
        return rq({
            uri: baseURL,
            qs: lat && lon ?
                {
                    lat,
                    lon,
                    appid: API_KEY,
                    units: 'metric'
                } : {
                    q: cityName,
                    appid: API_KEY,
                    units: 'metric'
                }
            ,
            json: true
        })
    }
}