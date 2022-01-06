const fs = require('fs')

fs.createReadStream('./assets/inuki.jpg').pipe(
    fs.createWriteStream('./assets/inuki2.jpg')
).on('finish', () => {
    console.log("Imagem escrita com sucesso")
})