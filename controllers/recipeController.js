const recipeModel = require('../models/recipeModel.js');

function getRecipesFromApi(req, res) {
    const ingredients = req.query.ingredients;
    const url = `${process.env.API_URL}${process.env.API_ID}${process.env.API_KEY}&to=20&q=${ingredients}`;
    recipeModel.getRecipesFromApi(url, (results) => {
        res.status(200).json(results);
    })
}

module.exports = {
    getRecipesFromApi: getRecipesFromApi
};