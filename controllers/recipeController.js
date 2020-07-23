const recipeModel = require('../models/recipeModel.js');

function getRecipesFromApi(req, res) {
    const ingredients = req.query.ingredients;
    const url = `${process.env.API_URL}${process.env.API_ID}${process.env.API_KEY}&to=20&q=${ingredients}`;

    recipeModel.getRecipesFromApi(url, (err, result) => {
        if (err || result === null || result.length === 0) {
            console.log(err);
            res.status(500).json({
                success: false,
                data: err
            });
        } else {
            res.status(200).json(result);
        }
    })
}

module.exports = {
    getRecipesFromApi: getRecipesFromApi
};