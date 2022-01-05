const Attendance = require('../models/attendance')

module.exports = app => {
    app.get('/', (req, res) => res.send('Servidor rodando')),

    app.get('/calls', (req, res) => {
        Attendance.list(res)
    }),

    app.get('/calls/:id', (req, res) => {
        Attendance.get(parseInt(req.params.id), res)
    }),

    app.post('/calls', (req, res) => {
        const attendance = req.body
        Attendance.add(attendance, res)
    })

    app.patch('/calls/:id', (req, res) => {
        Attendance.update(
            parseInt(req.params.id),
            req.body,
            res)
    })

    app.delete('/calls/:id', (req, res) => {
        Attendance.delete(parseInt(req.params.id), res)
    })
}