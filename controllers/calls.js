module.exports = app => {
    app.get('/', (req, res) => res.send('Servidor rodando')),
    app.get('/calls', (req, res) => res.send('Atendimento')),
    app.post('/calls', (req, res) => {
        console.log(req.body)
        res.send('Atendimento (post)')
    })
}