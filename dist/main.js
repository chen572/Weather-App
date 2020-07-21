const model = new Model()
const renderer = new Renderer()

const loadPage = () => {
    model
    .getDataFromDB()
    .then(() => { 
        renderer.render({ city: model.cityData }, 'bottom') 
        renderer.render(model.cityData[0] , 'top')
    })
}

loadPage()

const handleSearch = async (cityName) => {
    await model.getCityData(cityName)
    renderer.render({ city: model.cityData }, 'bottom')
    renderer.render(model.cityData[0] , 'top')
}

$('.search-btn').click(() => {
    const cityName = $('#city-search').val()
    $('#city-search').val('')
    handleSearch(cityName)
})

$('.bottom-container').on('click', '.remove, .add', async event => {
    const city = model.findInCityDataArr($(event.currentTarget).siblings('#city-name').find('h2').text())
    if ($(event.currentTarget).hasClass('add')) {
        await model.saveCity(city)
        renderer.render({ city: model.cityData }, 'bottom')
    } else {
        await model.removeCity(city)
        renderer.render({ city: model.cityData }, 'bottom')
    }

})