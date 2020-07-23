const path = require('path');
const express = require('express');
const app = express();
const session = require('express-session');
const recipeController = require('./controllers/recipeController.js');
const userController = require('./controllers/userController.js');
require('dotenv').config();

app.use(session({
    secret: 'my-super-secret-secret!',
    resave: false,
    saveUninitialized: true
}));

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.set('port', (process.env.PORT || 5000));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logRequest);

app.listen(app.get('port'), () => {
    console.log('Node app is running on port', app.get('port'));
});

app.get('/', (req, res) => res.render('pages/index.ejs'));
app.get('/home', (req, res) => res.render('pages/home.ejs'));
app.get('/recipes', (req, res) => res.render('pages/recipes.ejs'));

app.post('/login', userController.handleLogin);
app.post('/logout', userController.handleLogout);

app.get('/searchRecipes', recipeController.getRecipesFromApi);

function logRequest(req, res, next) {
    console.log("Received a request for: " + req.url);
    next();
}