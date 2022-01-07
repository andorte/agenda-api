const fs = require('fs')

module.exports = (path, fileName, createdImageCallback) => {
    const newPath = `./assets/images/${fileName}`

    fs.createReadStream(path).pipe(
        fs.createWriteStream(newPath)
    ).on('finish', () => {
        createdImageCallback(newPath)
    })
}
