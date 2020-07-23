const userModel = require('../models/userModel.js');

function handleLogin (req, res) {
    let username = req.body.username;
    let password = req.body.password;

    userModel.getPersonFromDb(username, password, (err, result) => {
        if (err || result === null || result.length === 0) {
            console.log(err);
            res.status(500).json({
                success: false,
                data: err
            });
        } else {
            const person = result[0];
            req.session.userId = person.userId;
            req.session.userName = person.userName;

            res.status(200).json({
                success: true,
                person: person
            });
        }
    });
}



function handleLogout (req, res) {
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

function verifyLogin (req, res, next) {
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

module.exports = {
    handleLogin: handleLogin,
    handleLogout: handleLogout,
    verifyLogin: verifyLogin
};