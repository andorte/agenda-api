const express = require('express')

const app = express()

app.listen(3000, () => console.log('running on 3000 port'))

app.get('/', (req, res) => res.send('Servidor rodando'))