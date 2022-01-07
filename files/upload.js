const fs = require('fs')
const p = require('path')

module.exports = (path, fileName, createdImageCallback) => {
    const validTypes = ['jpg', 'png', 'jpeg']
    const type = p.extname(path)

    if (validTypes.indexOf(type.substring(1)) === -1) {
        const error = "Tipo é inválido"
        createdImageCallback(error)
    } else {
        const newPath = `./assets/images/${fileName}${type}`
        fs.createReadStream(path).pipe(
            fs.createWriteStream(newPath)
        ).on('finish', () => {
            createdImageCallback(false, newPath)
        })
    }
}
