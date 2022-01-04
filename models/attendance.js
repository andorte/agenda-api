const connection = require('../insfraestructure/connection')
const moment = require('moment')
const bdFormat = "YYYY-MM-DD HH:mm:ss"

class Attendance {
    add(attendance) {
        const createTime = moment().format(bdFormat)
        const date = moment(attendance.date, "DD/MM/YYYY").format(bdFormat)
        const datedAttendance = {...attendance, createTime, date}
        const sql = 'INSERT into Attendances SET ?'

        connection.query(sql, datedAttendance, (error, results) => {
            if (error) {
                console.log(error)
            } else {
                console.log(results)
            }

        })
    }
}

module.exports = new Attendance
