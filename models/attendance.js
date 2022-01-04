const connection = require('../insfraestructure/connection')
const moment = require('moment')
const bdFormat = "YYYY-MM-DD HH:mm:ss"

class Attendance {
    add(attendance, res) {
        const createTime = moment().format(bdFormat)
        const date = moment(attendance.date, "DD/MM/YYYY").format(bdFormat)
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

module.exports = new Attendance
