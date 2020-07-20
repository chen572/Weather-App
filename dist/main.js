const model = new Model()
const renderer = new Renderer()

model
    .getDataFromDB()
    .then(d => { renderer.render({ city: d }) })
    .catch(e => {console.log(e)})