class Renderer {
    constructor() {
        this.cityCard = Handlebars.compile($('#city-card-template').html())
        this.source = $('#top-city-template').html()
        this.topCity = Handlebars.compile(this.source)
    }

    render(data, container) {
        const html = this.topCity(data)
        container === 'bottom' ?
            $(`.${container}-container`).empty().append(this.cityCard(data))
            :
            $(`.${container}-container`).append(html)
    }
}