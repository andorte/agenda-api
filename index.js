const customExpress = require('./config/customExpress')
const connection = require('./insfraestructure/database/connection')
const Tables = require('./insfraestructure/database/tables')

connection.connect((error) => {
    if (error) {
        console.log(error)
    } else {
        Tables.init(connection)
        const app = customExpress()
        app.listen(3000, () => console.log('running on 3000 port'))
    }
})
