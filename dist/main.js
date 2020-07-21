const model = new Model()
const renderer = new Renderer()

const loadPage = () => {
    model
        .getDataFromDB()
        .then(() => { renderer.render({ city: model.cityData }) })
}

loadPage()

const handleSearch = async (cityName) => {
    await model.getCityData(cityName)
    renderer.render({ city: model.cityData })
}

$('.search-btn').click(() => {
    const cityName = $('.city-search').val()
    $('.city-search').val('')
    handleSearch(cityName)
})

$('.bottom-container').on('click', '.remove, .add', async event => {
    const city = model.findInCityDataArr($(event.currentTarget).siblings('.city-name').find('h2').text())
    if ($(event.currentTarget).hasClass('add')) {
        await model.saveCity(city)
        renderer.render({ city: model.cityData })
    } else {
        await model.removeCity(city)
        renderer.render({ city: model.cityData })
    }

})