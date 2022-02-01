const query = require('../insfraestructure/database/queries')

class Attendance {
    add(attendance){
        const sql = 'INSERT into Attendances SET ?'
        return query(sql, attendance)
    }
}

module.exports = new Attendance()
