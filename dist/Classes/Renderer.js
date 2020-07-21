class Renderer {
    constructor() {
        this.cityCard = Handlebars.compile($('#city-card-template').html())
        this.topCity = Handlebars.compile($('#top-city-template').html())
    }

    render(data, container) {
        container === 'bottom' ?
            $(`.${container}-container`).empty().append(this.cityCard(data))
            :
            $(`#${container}-container`).append(this.topCity(data))
    }
}