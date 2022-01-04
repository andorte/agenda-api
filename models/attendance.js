const connection = require('../insfraestructure/connection')
const moment = require('moment')
const bdFormat = "YYYY-MM-DD HH:mm:ss"

class Attendance {
    getValidation(attendance) {
        return [
            {
                name: 'date',
                valid: moment(attendance.date).isSameOrAfter(attendance.createTime),
                message: 'Data deve ser maior ou igual a data atual'
            },
            {
                name: 'client',
                valid: attendance.client.length >= 5,
                message: 'Cliente deve ter pelo menos cinco caracteres'
            }
        ]
    }

    getValidationErrors(attendance) {
        const validations = this.getValidation(attendance)
        return validations.filter(validation => !validation.valid)
    }

    add(attendance, res) {
        attendance.createTime = moment().format(bdFormat)
        attendance.date = moment(attendance.date, "DD/MM/YYYY").format(bdFormat)
        const errors = this.getValidationErrors(attendance)

        if (errors.length) {
            res.status(400).json(errors)
        } else {
            const datedAttendance = {...attendance}
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
