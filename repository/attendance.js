const query = require('../insfraestructure/database/queries')

class Attendance {
    add(attendance){
        const sql = 'INSERT into Attendances SET ?'
        return query(sql, attendance)
    }

    list() {
        const sql = 'SELECT * from Attendances'
        return query(sql)
    }
}

module.exports = new Attendance()
