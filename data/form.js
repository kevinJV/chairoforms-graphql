const { connection } = require('./connection')

connection.connect(function (err) {
    if (err)
        console.log(err)
})

const getForm = (id) => {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM forms WHERE id = ?", [id], function (error, result, fields) {
            if (error) {
                console.log(error)
                reject(error)
            }

            resolve(JSON.parse(JSON.stringify(result[0])))
        })
    })
}

const getForms = () => {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM forms", function (error, result, fields) {
            if (error) {
                console.log(error)
                reject(error)
            }

            resolve(JSON.parse(JSON.stringify(result)))
        })
    })
}

const addForm = (name, description, data) => {
    return new Promise((resolve, reject) => {
        query = `INSERT INTO forms (name, description, data) VALUES (?, ?, ?)`

        connection.query(query, [name, description, data], async function (error, result, fields) {
            if (error) {
                console.log(error)
                reject(error)
            }

            console.log("addproduct")
            data = await getForm(result.insertId)
            console.log(data)
            resolve(data)
        })
    })
}

module.exports = {
    getForm,
    getForms,
    addForm
}