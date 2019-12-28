const mysql = require('mysql');

mysql.patchFeatures = (connection) => {
    connection.querySP = (...params) => {
        return new Promise((resolve, reject) => {
            connection.query(...params, (err, results, fields) => {
                if (err) return reject(err)
                if (!results) return resolve(results)
                if (results.length == 2) {
                    const [data] = results
                    resolve(data)
                } else {
                    reject(new Error('Query is not a store procedure'))
                }
            })
        });
    }
    return connection
}

module.exports = mysql