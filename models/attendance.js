const connection = require('../insfraestructure/database/connection')
const repository = require('../repository/attendance')
const moment = require('moment')
const axios = require('axios')
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

    add(attendance) {
        attendance.createTime = moment().format(bdFormat)
        attendance.date = moment(attendance.date, "DD/MM/YYYY").format(bdFormat)
        const errors = this.getValidationErrors(attendance)

        if (errors.length) {
            return new Promise((resolve, reject) => reject(errors))
        } else {
            const datedAttendance = {...attendance}
            return repository.add(datedAttendance)
                .then(
                    results => {
                        const id = results.insertId
                        return {...attendance, id}
                    }
                )
        }
    }

    list() {
        return repository.list()
    }

    get(id, res) {
        const sql = 'SELECT * from Attendances where id=?'

        connection.query(sql, id, async (error, results) => {
            const attendance = results[0]
            const cpf = attendance.client
            if (error) {
                res.status(400).json(error)
            } else {
                const { data } = await axios.get(`http://localhost:8082/${cpf}`)
                attendance.client = data
                res.status(200).json(attendance)
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
