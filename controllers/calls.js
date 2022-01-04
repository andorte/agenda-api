const Attendance = require('../models/attendance')

module.exports = app => {
    app.get('/', (req, res) => res.send('Servidor rodando')),
    app.get('/calls', (req, res) => res.send('Atendimento')),

    app.post('/calls', (req, res) => {
        const attendance = req.body
        Attendance.add(attendance, res)
    })
}