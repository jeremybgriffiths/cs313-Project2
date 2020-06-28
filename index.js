const express = require('express');
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

const getRecipes = (...ingredients) => {
  const mappedIngredients = ingredients
    .map((ingredient, idx) => {
      if (idx < ingredients.length - 1) {
        return ingredient + "+";
      } else {
        return ingredient;
      }
    })
    .join("");

  const url = `${process.env.API_URL}${process.env.API_ID}${process.env.API_KEY}&q=${mappedIngredients}`;

  fetch(url)
    .then(response => response.json())
    .then(recipes => {
      console.log(recipes);
    })
    .catch(function (error) {
      console.log(error);
    });
}

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.get('/', (req, res) => res.render('index'));
app.get('/getRecipes', getRecipes);
app.listen(PORT, () => console.log(`Listening on ${ PORT }`));

getRecipes("zucchini", "broccoli", "carrots");