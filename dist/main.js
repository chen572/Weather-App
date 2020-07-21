let isDark = JSON.parse(localStorage.isDark || 'false')
const model = new Model()
const renderer = new Renderer()

$('#slider').val('off')

const loadPage = async() => {
    await model.updateAllCitiesOnLoad()
    model
        .getDataFromDB()
        .then(async () => {
            darkMode()
            renderer.render({ city: model.cityData }, 'bottom')
            let location = await model.getCurrentLocation()
            location = {
                lat: location.coords.latitude,
                long: location.coords.longitude
            }
            renderer.render(await model.getCityData('currentLocation', location), 'top')
        })
}

loadPage()

const handleSearch = async (cityName) => {
    await model.getCityData(cityName)
    renderer.render({ city: model.cityData }, 'bottom')
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
    const city = model.findInCityDataArr($(event.currentTarget).closest('.icons').siblings('#city-name').find('h2').text())
    if ($(event.currentTarget).hasClass('add')) {
        await model.saveCity(city)
        renderer.render({ city: model.cityData }, 'bottom')
    } else {
        await model.removeCity(city)
        renderer.render({ city: model.cityData }, 'bottom')
    }

})

const darkMode = () => {
    if (isDark) {
        $(':root').css({
            "--primery-color": "#FFFFFF",
            "--secondary-color": "#E5E5E5",
            "--primery-text-color": "#000000",
            "--filter-color": "linear-gradient(90deg, hsla(152, 100%, 50%, 0.5) 0%, hsla(186, 100%, 69%, 0.5) 100%)"
        })
    } else {
        $('#slider').attr('checked', 'checked')
        $(':root').css({
            "--primery-color": "#14213D",
            "--secondary-color": "#000000",
            "--primery-text-color": "#E5E5E5",
            "--filter-color": "linear-gradient(360deg, hsla(214, 92%, 47%, 1) 0%, hsla(221, 51%, 16%, 0.5) 0%, hsla(231, 85%, 24%, 1) 100%)"
        })
    }
}

$('#slider').change(() => {
    isDark = !isDark
    localStorage.isDark = isDark
    darkMode()
})

$('.bottom-container').on('click', '#refresh', async event => {
    await model.updateCity($(event.currentTarget).closest('.icons').siblings('#city-name').find('h2').text())
    renderer.render({ city: model.cityData }, 'bottom')
})