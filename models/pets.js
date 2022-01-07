const connection = require('../insfraestructure/connection')
const upload = require('../files/upload')

class Pet {
    add(pet, res) {
        upload(pet.image, pet.name, newPath => {
            const query = 'INSERT INTO Pets SET ?'
            pet.image = newPath
            connection.query(query, pet, error => {
                if (error) {
                    res.status(400).json(error)
                } else {
                    res.status(200).json(pet)
                }
            })
        })
    }
}

module.exports = new Pet()