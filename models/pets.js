const connection = require('../insfraestructure/database/connection')
const upload = require('../insfraestructure/files/upload')

class Pet {
    add(pet, res) {
        upload(pet.image, pet.name, (error, newPath) => {
            if (error) {
                res.status(400).json({error})
            } else {
                const query = 'INSERT INTO Pets SET ?'
                pet.image = newPath
                connection.query(query, pet, error => {
                    if (error) {
                        res.status(400).json(error)
                    } else {
                        res.status(200).json(pet)
                    }
                })
            }
        })
    }
}

module.exports = new Pet()