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
                    res.status(201).json(attendance)
                }
            })
        }
    }

    list(res) {
        const sql = 'SELECT * from Attendances'

        connection.query(sql, (error, results) => {
            if (error) {
                res.status(400).json(error)
            } else {
                res.status(200).json(results)
            }
        })
    }

    get(id, res) {
        const sql = 'SELECT * from Attendances where id=?'

        connection.query(sql, id, (error, results) => {
            if (error) {
                res.status(400).json(error)
            } else {
                res.status(200).json(results[0])
            }
        })
    }

    update(id, values, res) {
        const sql = 'UPDATE Attendances SET ? where id=?'

        if (values.date) {
            values.date = moment(values.date, "DD/MM/YYYY").format(bdFormat)
        }

        connection.query(sql, [values, id], (error, results) => {
            if (error) {
                res.status(400).json(error)
            } else {
                res.status(200).json({
                    ...values,
                    id
                })
            }
        })
    }

    delete(id, res) {
        const sql = 'DELETE from Attendances where id=?'

        connection.query(sql, id, (error, results) => {
            if (error) {
                res.status(400).json(error)
            } else {
                res.status(200).json({
                    id
                })
            }
        })
    }
}

module.exports = new Attendance
