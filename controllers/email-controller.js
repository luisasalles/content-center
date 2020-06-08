"use strict";

const nodemailer = require('nodemailer');
const { check, validationResult } = require('express-validator/check');
const model = require('../models/email-model.js');
const modelUser = require('../models/users-model.js');

exports.codeForm = (req, res) => {
    res.render('passcode', {
        title: 'Codigo de Recuperação',
        style: 'login_style'
    });
};

exports.newPassForm = (req, res) => {
    res.render('newpass', {
        title: 'Nova Senha',
        style: 'login_style'
    });
}

function getRandom() {
    return Math.floor(Math.random() * 65536);
}

function sendMailPass(codeEmail) {

    var $usuario = 'contentcentercourses@gmail.com';
    var $senha = 'progweb@';

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: $usuario,
            pass: $senha
        }
    });

    var $destinatario = codeEmail.email;

    var mailOptions = {
        from: $usuario,
        to: $destinatario,
        subject: 'Recuperação de Senha Content Center',
        text: 'Para recuperar sua senha digite o código: ' + codeEmail.code + '.'
    };


    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email enviado: ' + info.response);
        }
    });

}

exports.addCodeEmail = (req, res) => {

    const errors = validationResult(req);

    const saveEmail = function(codeEmail) {
        model.CodeEmailDAO.insert(codeEmail, (status) => {
            if (status) {
                sendMailPass(codeEmail);
                req.session.flash = {
                    type: 'email-success'
                }
                res.redirect('/passcode');
            } else {
                req.session.flash = {
                    type: 'email-error'
                }
                res.redirect('/forgotpass');
            }
        });
    };

    const removeEmail = function(email) {
        model.CodeEmailDAO.removeEmail(email, result => {
            if (result === null) {
                saveEmail(codeEmail);
                req.session.emailCode = codeEmail.email;

            } else {
                req.session.flash = {
                    type: 'email-error'
                }
                res.redirect('/forgotpass');
            }
        });
    }

    var date = new Date(Date.now());
    const codeEmail = new model.CodeEmail(
        date,
        req.body.email,
        getRandom()
    );

    console.log(codeEmail.createdAt);
    if (codeEmail.isValid()) {
        modelUser.UserDAO.findByEmail(codeEmail.email, retrUser => {

            if (retrUser !== null) {
                if (errors.isEmpty()) {
                    removeEmail(codeEmail.email);
                } else {
                    req.session.flash = {
                        type: 'email-invalido'
                    }
                    res.redirect('/forgotpass');
                }
            } else {
                req.session.flash = {
                    type: 'email-success'
                }
                res.redirect('/passcode');
            };
        });
    } else {
        req.session.flash = {
            type: 'email-invalido'
        }
        res.redirect('/forgotpass');
    }

};

exports.findCode = (req, res) => {

    const code = req.body.code;
    if (code !== undefined && code !== null && code.trim() != '') {
        model.CodeEmailDAO.findByEmail(req.session.emailCode, retrEmail => {
            if (retrEmail.code == code) {
                res.redirect('/newpass');
            } else {
                req.session.flash = {
                    type: 'code-incorrect'
                }
                res.redirect('/passcode');
            }
        });
    } else {
        req.session.flash = {
            type: 'code-invalido'
        }
        res.redirect('/passcode');
    }

};