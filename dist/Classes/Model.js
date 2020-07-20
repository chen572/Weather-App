class Model {
    constructor() {
        this.cityData = []
    }

    getDataFromDB() { return $.get('/cities') }

    async getCityData(cityName) {
        this.cityData.push(await $.get(`/city/${cityName}`))
    }

    saveCity(city) { return $.post('/city', city) }

    removeCity(city) { 
        return $.ajax({
            method: 'DELETE',
            url: `/city/${city}`
        })
    }
}