const passport = require("passport");
const { createSaldo } = require('./saldoController');
const { createNewUser } = require('../services/registerService');

const createUser =  (req, res, next) => {
    const { name, email, password, repeatedPassword } = req.body;
    let loginUser =  setTimeout(function () {
        passport.authenticate("local", function (err, user, info) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.sendStatus(500);
            }
            req.login(user, function (error) {
                if (error) return next(error);
                console.log("Request Login supossedly successful " + req.isAuthenticated() + req.user.user_id);
            });
            // res.redirect('/');
            createSaldo(req.user.user_id);
        })(req, res, next);
    }, 3000);

    try {
        createNewUser(name, email, password, repeatedPassword).then(loginUser);
    }
    catch(e) {
        res.sendStatus(500);
    }
}

module.exports = {
    createUser
}