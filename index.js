const mysql = require('mysql');

mysql.patchFeatures = (connection) => {
    connection.querySP = (...params) => {
        return new Promise((resolve, reject) => {
            connection.query(...params, (err, results, fields) => {
                if (err) return reject(err)
                if (!results) return resolve(results)
                if (Array.isArray(results)) {
                    if (results.length === 2) {
                        const [data] = results
                        resolve({ data })
                    } else {
                        const newResults = Array.from(results)
                        newResults.pop()
                        resolve({ data: newResults })
                    }
                } else {
                    resolve({ data: []})
                }
            })
        });
    }
    return connection
}

module.exports = mysql