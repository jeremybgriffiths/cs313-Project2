const { Pool } = require("pg");
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

function getPersonFromDb(username, password, callback) {
    const query = 'SELECT userId, userName FROM UserAccount WHERE userName = $1 AND userPassword = $2';
    const params = [username, password];

    pool.query(query, params, (err, result) => {
        if (err) {
            console.log(err);
            callback(err, null);
        } else {
            callback(null, result.rows);
        }
    });
}

module.exports = {
    getPersonFromDb: getPersonFromDb
};