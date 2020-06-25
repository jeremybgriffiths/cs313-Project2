const express = require('express')
const app = express();
const path = require('path')
require('dotenv').config();
const PORT = process.env.PORT || 5000
const {
  Pool
} = require("pg");
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({
  connectionString: connectionString
});

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.get('/', (req, res) => res.render('pages/index'))
app.get('/getPerson', getPerson);
app.listen(PORT, () => console.log(`Listening on ${ PORT }`))

function getPerson(request, response) {
  const id = request.query.id;

  getPersonFromDb(id, function (error, result) {
    if (error || result == null || result.length != 1) {
      response.status(500).json({
        success: false,
        data: error
      });
    } else {
      const person = result[0];
      response.status(200).json(person);
      response.write("It worked");
    }
  });
}

function getPersonFromDb(id, callback) {
  console.log("Getting person from DB with id: " + id);

  const sql = "SELECT id, first, last, birthdate FROM person WHERE id = $1::int";

  const params = [id];

  pool.query(sql, params, function (err, result) {
    if (err) {
      console.log("Error in query: ")
      console.log(err);
      callback(err, null);
    }

    console.log("Found result: " + JSON.stringify(result.rows));

    callback(null, result.rows);
  });

}