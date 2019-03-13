const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');
const User = mongoose.model('User');
const userSession = mongoose.model('userSession');

module.exports.register = (req, res, next) => {
    var user = new User();
    user.fullName = req.body.fullName;
    user.email = req.body.email;
    user.password = req.body.password;
    user.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            if (err.code == 11000)
                res.status(422).send(['Duplicate email adrress found.']);
            else
                return next(err);
        }

    });
}

module.exports.authenticate = (req, res, next) => {
    // call for passport authentication
    passport.authenticate('local', (err, user, info) => {
        // error from passport middleware
        if (err) return res.status(400).json(err);
        // registered user
        else if (user) {
            //save user login transaction details in DB
            var userS = new userSession();
            userS.id = req.body.email;
            userS.transactionType = 'login'
            userS.transactionDate = Date.now();
            userS.save((err, doc) => {
                if (err)
                    return next(err);
            });
            return res.status(200).json({ "token": user.generateJwt() });
        }
        // unknown user or wrong password
        else return res.status(404).json(info);
    })(req, res);
}


module.exports.logOut = (req, res, next) => {
    //save user logout transaction details in DB
    var userS2 = new userSession();
    userS2.id = req.body.email;
    userS2.transactionType = 'logout'
    userS2.transactionDate = Date.now();
    userS2.save((err, doc) => {
        if (!err)
            return res.send(doc)
        else return res.status(433).json({ error: 'logout - log cannot be store in DB' });

    });
};


