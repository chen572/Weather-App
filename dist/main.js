const model = new Model()
const renderer = new Renderer()

const loadPage = () => {
    model
        .getDataFromDB()
        .then(() => {
            renderer.render({ city: model.cityData }, 'bottom')
            renderer.render(model.cityData[0], 'top')
        })
}

loadPage()

const handleSearch = async (cityName) => {
    await model.getCityData(cityName)
    renderer.render({ city: model.cityData }, 'bottom')
    renderer.render(model.cityData[0], 'top')
}

$('.search-btn').click(() => {
    const cityName = $('#city-search').val()
    $('#city-search').val('')
    handleSearch(cityName)
})

$('#city-search').keyup((event) => {
    if ($("#city-search").is(":focus") && event.key == "Enter") {
        const cityName = $('#city-search').val()
        $('#city-search').val('')
        handleSearch(cityName)
    }
});

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

$('#slider').change(() => {
    if ($('body').hasClass('dark')) {
        $('body').removeClass('dark')
        $(':root').css({
            "--primery-color": "#FFFFFF",
            "--secondary-color": "#E5E5E5",
            "--primery-text-color": "#000000",
            "--filter-color": "linear-gradient(90deg, hsla(152, 100%, 50%, 0.5) 0%, hsla(186, 100%, 69%, 0.5) 100%)"
        })
    } else {
        $('body').addClass('dark')
        $(':root').css({
            "--primery-color": "#14213D",
            "--secondary-color": "#000000",
            "--primery-text-color": "#E5E5E5",
            "--filter-color": "linear-gradient(360deg, hsla(214, 92%, 47%, 1) 0%, hsla(221, 51%, 16%, 0.5) 0%, hsla(231, 85%, 24%, 1) 100%)"
        })
    }
})