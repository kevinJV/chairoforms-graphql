const mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'localhost',
    use: 'root',
    password: '',
    database: 'chairoform'
})

module.exports = {
    connection
}