class Renderer {
    constructor() {
        this.cityCard = Handlebars.compile($('#city-card-template').html())
    }

    render(data) {
        $('.bottom-container').empty().append(this.cityCard(data))
    }
}