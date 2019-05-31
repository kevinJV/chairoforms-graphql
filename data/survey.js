const { connection } = require('./connection')

connection.connect(function (err) {
    if (err)
        console.log(err)
})

const getSurvey = (id) => {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM surveys WHERE id = ?", [id], function (error, result, fields) {
            if (error) {
                console.log(error)
                reject(error)
            }

            resolve(JSON.parse(JSON.stringify(result[0])))
        })
    })
}

const getSurveys = () => {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM surveys", function (error, result, fields) {
            if (error) {
                console.log(error)
                reject(error)
            }

            resolve(JSON.parse(JSON.stringify(result)))
        })
    })
}

const addSurvey = (name, description, data) => {
    return new Promise((resolve, reject) => {
        query = `INSERT INTO surveys (name, description, data) VALUES (?, ?, ?)`

        connection.query(query, [name, description, data], async function (error, result, fields) {
            if (error) {
                console.log(error)
                reject(error)
            }

            console.log("addsurvey")
            data = await getSurvey(result.insertId)
            console.log(data)
            resolve(data)
        })
    })
}

const deleteSurvey = (id) => {
    return new Promise(function(resolve, reject) {
        // The Promise constructor should catch any errors thrown on
        // this tick. Alternately, try/catch and reject(err) on catch.
        query_var = [id]
        connection.query("DELETE from surveys where id = ?",query_var, function (err, rows, fields) {
            if (err) {
                return reject(err);
            }
            //resolve(rows);
            resolve(getSurveys());
        }); 
    });
};

const editSurvey = (id,name, description,data) => {
    return new Promise(function(resolve, reject) {
        // The Promise constructor should catch any errors thrown on
        // this tick. Alternately, try/catch and reject(err) on catch.
        query_var = [name,description,data,id]
        connection.query("UPDATE surveys SET name = ? , description = ? , data = ? WHERE id = ?",query_var, function (err, rows, fields) {
            if (err) {
                return reject(err);
            }
            resolve(getProduct(id));
        }); 
    });
};



module.exports = {
    getSurvey,
    getSurveys,
    addSurvey,
    deleteSurvey,
    editSurvey
}