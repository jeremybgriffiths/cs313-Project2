const recipeModel = require('../models/recipeModel.js');
const axios = require('axios');

function getRecipesFromApi(req, res) {
    recipeModel.getRecipesFromApi;
}

function getRecipesFromDb(req, res) {
    recipeModel.getRecipesFromDb;
}

function saveRecipe(req, res) {
    console.log('Recipe was saved');
}

module.exports = {
    getRecipesFromApi: getRecipesFromApi,
    getRecipesFromDb: getRecipesFromDb,
    saveRecipe: saveRecipe
};