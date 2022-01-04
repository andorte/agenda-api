const connection = require('../insfraestructure/connection')
const moment = require('moment')
const bdFormat = "YYYY-MM-DD HH:mm:ss"

class Attendance {
    add(attendance, res) {
        const createTime = moment().format(bdFormat)
        const date = moment(attendance.date, "DD/MM/YYYY").format(bdFormat)

        const isDateValid = moment(date).isSameOrAfter(createTime)
        const isClientNameValid = attendance.client.length >= 5

        const validations = [
            {
                name: 'date',
                valid: isDateValid,
                message: 'Data deve ser maior ou igual a data atual'
            },
            {
                name: 'client',
                valid: isClientNameValid,
                message: 'Cliente deve ter pelo menos cinco caracteres'
            }
        ]

        const errors = validations.filter(validation => !validation.valid)

        if (errors.length) {
            res.status(400).json(errors)
        } else {
            const datedAttendance = {...attendance, createTime, date}
            const sql = 'INSERT into Attendances SET ?'

            connection.query(sql, datedAttendance, (error, results) => {
                if (error) {
                    res.status(400).json(error)
                } else {
                    res.status(201).json(results)
                }

            })
        }
    }
}

module.exports = new Attendance
