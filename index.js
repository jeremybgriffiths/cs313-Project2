const path = require('path');
const express = require('express');
const app = express();

const session = require('express-session');

app.use(session({
    secret: 'my-super-secret-secret!',
    resave: false,
    saveUninitialized: true
}));

const axios = require('axios');

require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.set('port', (process.env.PORT || 5000));

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.listen(app.get('port'), () => {
    console.log('Node app is running on port', app.get('port'));
});

const {
    Pool
} = require("pg");

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

const getRecipes = (req, res) => {
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

const getPersonFromDb = (username, password, callback) => {
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

const handleLogin = (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    getPersonFromDb(username, password, (err, result) => {
        if (err || result === null || result.length === 0) {
            console.log(err);
            res.status(500).json({
                success: false,
                data: err
            });
        } else {
            const person = result[0];
            req.session.userId = result[0].userId;
            req.session.userName = result[0].userName;
            res.status(200).json({
                success: true,
                person: person
            });
        }
    });
}



const handleLogout = (req, res) => {
    let result = {
        success: false
    };

    if (req.session.userName) {
        req.session.destroy();
        result = {
            success: true
        };
    }
}

const verifyLogin = (req, res, next) => {
    if (req.session.userName) {
        next();
    } else {
        var result = {
            success: false,
            message: "Access Denied"
        };
        res.status(401).json(result);
    }
}

const logRequest = (req, res, next) => {
    console.log("Received a request for: " + req.url);
    next();
}

app.use(logRequest);

app.get('/', (req, res) => res.render('pages/index.ejs'));
app.get('/home', (req, res) => res.render('pages/home.ejs'));
app.get('/recipes', (req, res) => res.render('pages/recipes.ejs'));

app.post('/login', handleLogin);
app.post('/logout', handleLogout);

app.get('/searchRecipes', verifyLogin, getRecipes);

app.get('/searchRecipes', getRecipes);