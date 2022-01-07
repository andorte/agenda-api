const Pet = require('../models/pets')

module.exports = app => {
    app.post('/pets', (req, res) => {
        Pet.add(req.body, res)
    })
}
