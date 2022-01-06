const fs = require('fs')

fs.readFile('./assets/inuki.jpg', (erro, buffer) => {
    console.log('Imagem recebida')
    console.log(buffer)
    fs.writeFile('./assets/inuki2.jpg', buffer, () => {
        console.log('Imagem foi escrita')
    })
})