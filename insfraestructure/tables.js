class Tables {
    init(connection) {
        this.connection = connection
        this.createAttendances()
        this.createPets()
    }

    createAttendances() {
        // const sql = `Alter table Attendances
        //     ADD date datetime NOT NULL DEFAULT '1970-01-02',
        //     ADD createTime datetime NOT NULL DEFAULT '1970-01-02'`
        const sql = `CREATE TABLE IF NOT EXISTS Attendances (
            id int NOT NULL AUTO_INCREMENT,
            client varchar(50) NOT NULL,
            pet varchar(20),
            service varchar(20) NOT NULL,
            date datetime NOT NULL,
            createTime datetime NOT NULL,
            status varchar(20) NOT NULL,
            observations text,
            PRIMARY KEY(id)
        )`

        this.connection.query(sql, (error) => {
            if (error) {
                console.log(error)
            } else {
                console.log("Attendance table created")
            }
        })
    }

    createPets() {
        const sql = `CREATE TABLE IF NOT EXISTS Pets (
            id int NOT NULL AUTO_INCREMENT,
            name varchar(50) NOT NULL,
            image varchar(200) NOT NULL,
            PRIMARY KEY(id)
        )`

        this.connection.query(sql, (error) => {
            if (error) {
                console.log(error)
            } else {
                console.log("Pets table created")
            }

        })
    }
}

module.exports = new Tables