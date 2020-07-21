class Model {
    constructor() {
        this.cityData = []
    }

    findInCityDataArr(cityName) {
        return this.cityData.find(c => c.name.toLowerCase() === cityName.toLowerCase())
    }

    async getDataFromDB() { 
        this.cityData = await $.get('/cities')
    }

    async getCityData(cityName) {
        if (this.findInCityDataArr(cityName)) {
            return
        }
        this.cityData.push(await $.get(`/city/${cityName}`))
    }

    saveCity(city) {
        if (this.findInCityDataArr(city.name).saved) {
            return
        } else {
            this.findInCityDataArr(city.name).saved = true
            return $.post('/city', city)
        }
    }

    removeCity(city) {
        this.findInCityDataArr(city.name).saved = false
        return $.ajax({
            method: 'DELETE',
            url: `/city/${city.name}`
        })
    }
}