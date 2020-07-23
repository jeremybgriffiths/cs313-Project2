const axios = require('axios');

function getRecipes(req, res) {
    const ingredients = req.query.ingredients;

    const url = `${process.env.API_URL}${process.env.API_ID}${process.env.API_KEY}&to=20&q=${ingredients}`;
    axios.get(url)
        .then(response => {
            res.status(200).json(response.data)
        })
        .catch(error => {
            console.log(error);
        });
}

function saveRecipe(req, res) {
    console.log('Recipe was saved');
}

module.exports = {
    getRecipes: getRecipes,
    saveRecipe: saveRecipe
};