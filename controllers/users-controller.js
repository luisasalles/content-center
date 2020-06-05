"use strict";
const model = require('../models/users-model.js');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator/check');

exports.validateEmail = [check('email').isEmail()];

exports.loginForm = (req, res) => {
    res.render('login', {
        title: 'Login',
        style: 'login_style'
    });
};

exports.registerForm = (req, res) => {
    res.render('register', {
        title: 'Registre-se',
        style: 'login_style'
    });
};

exports.forgotpassForm = (req, res) => {
    res.render('forgotpass', {
        title: 'Esqueceu Senha',
        style: 'login_style'
    });
};

exports.addUser = (req, res) => {

    const errors = validationResult(req);

    const saveUser = function(user) {
        model.UserDAO.insert(user, (status) => {
            if (status)
                res.render('login', {
                    title: 'Login',
                    style: 'login_style'
                });
            else
                res.render('content-center');
        });
    };

    const hash = bcrypt.hashSync(req.body.password, 10);

    const user = new model.Users(
        req.body.name,
        req.body.email,
        hash
    );

    if (user.isValid()) {
        model.UserDAO.findByEmail(user.email, retrUser => {

            if (retrUser === null) {
                if (errors.isEmpty()) {
                    saveUser(user);
                } else {
                    req.session.flash = {
                        type: 'error-email'
                    }
                    res.redirect('/register');
                }
            } else {
                req.session.flash = {
                    type: 'error-email'
                }
                res.redirect('/register');
            };
        });
    }

};


exports.loginFormProcessing = (req, res) => {
    const user = new model.Users();

    user.email = req.body.email;
    user.password = req.body.password;

    if (user.isValid()) {
        model.UserDAO.findByEmail(user.email, retrUser => {
            if (retrUser !== null) {
                bcrypt.compare(user.password, retrUser.password,
                    (err, matched) => {
                        if (matched) {
                            req.session.authenticated = true;
                        }
                        if (!req.session.payment) {
                            res.render('profile', {
                                title: 'Área do Aluno',
                                style: 'student_style',
                                pageTitle: 'Content Center - Área do Aluno',
                                option1: 'Perfil',
                                option2: 'Cursos',
                                option3: 'Anotações',
                                route1: '#',
                                route2: '#',
                                route3: '#',
                            });
                        } else {
                            res.redirect('/goToPay');
                        }

                    });
            } else {
                req.session.authenticated = false;
                req.session.flash = {
                    type: 'error-login'
                }
                res.redirect('/login');
            }
        });
    } else {
        req.session.flash = {
            type: 'error-field'
        }
        res.redirect('/login');
    }
};

exports.logout = (req, res) => {
    if (req.session.authenticated) {
        req.session.authenticated = false;
    }
    res.redirect('/');
};

function isValidPass(pass, confirmPass) {

    const reducer = (acc, cur) =>
        acc && cur !== undefined && cur !== null && cur.trim() != '';

    return [pass, confirmPass].reduce(reducer, true);
}

exports.changePass = (req, res) => {
    const pass = req.body.pass;
    const confirmPass = req.body.confirmPass;
    const hashPass = bcrypt.hashSync(pass, 10);
    if (isValidPass(pass, confirmPass) && (pass == confirmPass)) {
        model.UserDAO.updatePass(req.session.emailCode, hashPass, result => {
            if (result !== null) {
                req.session.flash = {
                    type: 'update-error'
                }
                res.redirect('/newpass');
            } else {
                req.session.flash = {
                    type: 'update-pass'
                }
                res.redirect('/login');
            }
        });
    } else {
        req.session.flash = {
            type: 'field-invalido'
        }
        res.redirect('/newpass');
    }
};