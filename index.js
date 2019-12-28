const mysql = require('mysql');

/**
 * Create a new Connection instance.
 * @param {object} options Object Configuration Database
 * @param {string} type Type of connection
 * @return {object} Return Object with Store Procedure from MySQL
 * @public
 */

exports.connect = (options, type = 'normal') => {
    if (options && typeof options == 'object') {
        if (/^[a-z]/i.test(type) != true) {
            throw new Error('Connection type is invalid or incorrect, verify');
        } else {
            let conn = null;
            if (/^normal/i.test(type)) {
                conn = mysql.createConnection(options);
            } else if (/^pool/i.test(type)) {
                conn = mysql.createPool(options);
            } else {
                throw new Error('Type connection not defined or incorrect');
            }
            if (!conn) {
                throw new Error('connection <options> params invalid');
            }
            return {
                querySP: (query, params = null) => querySP(conn, query, params),
                testConnection: () => testConnection(conn, type),
            };
        }
    } else {
        throw new Error('option <params> not defined or not valid');
    }
};

/**
 * Function Test Connection.
 * @param {object} connect Object Configuration Database
 * @param {object} type Type of connection
 * @return {object} Resolve or Reject Promise
 * @public
 */
function testConnection(connect, type) {
    if (!/^pool/i.test(type)) {
        throw new Error('Connections differents to <pool> can not tested');
    } else {
        return new Promise((resolve, reject) => {
            connect.getConnection(err => {
                if (err) {
                    if (err.code === 'ER_ACCESS_DENIED_ERROR') {
                        reject('Connection Error, params or password invalid');
                    } else if (err.code === 'ER_BAD_DB_ERROR') {
                        reject('Database Incorrect');
                    } else if (err.code === 'ENOTFOUND') {
                        reject('Host Incorrect');
                    } else {
                        reject(err);
                    }
                } else {
                    resolve('Connection Success');
                }
            });
        });
    }
}

/**
 * Function Store Procedure.
 * @param {Function} connect Connection instance
 * @param {object} query Query with Store Procedure
 * @param {string} [params=null] Parameters that can bring the Store Procedure
 * @return {object} Resolve or Reject Promise
 * @public
 */

function querySP(connect, query, params = null) {
    return new Promise((resolve, reject) => {
        connect.query(query, params, (err, results) => {
            if (err) {
                reject(err);
            } else {
                const res = {};
                if (results.length == undefined) {
                    res.sp = results;
                    res.data = [];
                } else {
                    res.sp = results[results.length - 1];
                    results.pop();
                    res.data = results.length == 1 ? results[0] : results;
                }
                // resolve or reject promise
                if (res.sp != undefined && res.data != undefined) {
                    resolve(res);
                } else {
                    reject('the query is not a store procedure');
                }
            }
        });
    });
}
