const axios = require('axios');

function getRecipesFromApi(url, callback) {
    axios.get(url)
        .then(response => {
            let results = response.data;
            callback(null, results);            
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}
module.exports = {
    getRecipesFromApi: getRecipesFromApi
}