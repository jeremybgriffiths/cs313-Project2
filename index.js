const express = require('express');
const axios = require('axios');

const app = express();
const path = require('path');
require('dotenv').config();
const PORT = process.env.PORT || 5000
const {
  Pool
} = require("pg");
const {
  response
} = require('express');
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({
  connectionString: connectionString
});

const getRecipes = async (req, res) => {
  const ingredient = req.query.ingredient;

  const url = `${process.env.API_URL}${process.env.API_ID}${process.env.API_KEY}&q=${ingredient}`;
  console.log(url);
  const response = null;
  try {
    response = await axios.get(url);
  }
  catch (error) {
    console.log(error);
  }
  res.json(response.data);
}

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.get('/', (req, res) => res.render('pages/index.ejs'));
app.get('/getRecipes', getRecipes);
app.listen(PORT, () => console.log(`Listening on ${ PORT }`));