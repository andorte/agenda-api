class Tables {
    init(connection) {
        this.connection = connection
        this.createAttendances()
    }

    createAttendances() {
        const sql = 'CREATE TABLE Attendances (id int NOT NULL AUTO_INCREMENT, client varchar(50) NOT NULL, pet varchar(20), service varchar(20) NOT NULL, status varchar(20) NOT NULL, observations text, PRIMARY KEY(id))'

        this.connection.query(sql, (error) => {
            if (error) {
                console.log(error)
            } else {
                console.log("Attendance table created")
            }

        })
    }
}

module.exports = new Tables