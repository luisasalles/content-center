"use strict";

const model = require('../models/cart-model.js');
const modelCourses = require('../models/courses-model.js');
const modelUsers = require('../models/users-model.js');
const nodemailer = require('nodemailer');
const { check, validationResult } = require('express-validator/check');

function Duplicate(cartShopping, id) {
    var duplicate = false;
    cartShopping.item.forEach(element => {
        if (element == id) {
            duplicate = true;
        }
    });
    return duplicate;
}


function sendMailPay(coursesName, email) {

    var $usuario = 'contentcentercourses@gmail.com';
    var $senha = 'progweb@';

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: $usuario,
            pass: $senha
        }
    });

    var $destinatario = email;

    var mailOptions = {
        from: $usuario,
        to: $destinatario,
        subject: 'Compras no Content Center',
        text: 'Compra concluída com sucesso. Você adquiriu esse cursos ' + coursesName
    };


    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email enviado: ' + info.response);
        }
    });

}


function getCardFlag(cardnumber) {
    var cartoes = {
        Visa: /^4[0-9]{12}(?:[0-9]{3})/,
        Mastercard: /^5[1-5][0-9]{14}/,
        Amex: /^3[47][0-9]{13}/,
        DinersClub: /^3(?:0[0-5]|[68][0-9])[0-9]{11}/,
        Discover: /^6(?:011|5[0-9]{2})[0-9]{12}/,
        JCB: /^(?:2131|1800|35\d{3})\d{11}/
    };


    for (var cartao in cartoes)
        if (cardnumber.match(cartoes[cartao])) return cartao;
    return false;

}


exports.validateEmail = [check('email').isEmail()];

exports.addToCart = (req, res) => {

    const id = parseInt(req.params.id);
    const type = req.params.type;

    var cartShopping = "";
    if (req.session.cart) {
        cartShopping = req.session.cart;
    } else {
        cartShopping = new model.Cart(0, 0, 0, []);
    }

    if (!Duplicate(cartShopping, id)) {

        modelCourses.CoursesDAO.findById(id, retrCourse => {
            if (retrCourse !== null) {
                const cartCreated = model.CartsDAO.toObj(retrCourse, cartShopping);
                req.session.cart = cartCreated;
                res.redirect('/');
            } else {
                req.session.flash = {
                    type: 'element-error'
                }
                res.redirect('/search/' + type);
            };
        });
    } else {
        req.session.flash = {
            type: 'element-duplicate'
        }
        res.redirect('/search/' + type);
    }
}

exports.removeToCart = (req, res) => {

    const id = parseInt(req.params.id);
    var cartShopping = req.session.cart;

    modelCourses.CoursesDAO.findById(id, retrCourse => {

        if (retrCourse !== null) {
            const cartRemoved = model.CartsDAO.toRemove(retrCourse, cartShopping);
            req.session.cart = cartRemoved;

            res.redirect('/goCart');
        }
    });

}

exports.goToCart = (req, res) => {

    var cartFull = [];
    var cart = req.session.cart;
    if (!req.session.cart) {
        res.render('shopping', {
            title: 'Carrinho',
            style: 'shopping_style',
            empty: true
        });
    } else {
        if (cart.totalPrice > 0) {
            cart.item.forEach(id => {
                modelCourses.CoursesDAO.findById(id, retrCourses => {
                    if (retrCourses !== null) {
                        cartFull.push(retrCourses);
                    } else {
                        req.session.flash = {
                            type: 'error-search'
                        }
                        res.redirect('/');
                    };
                });
            });

            res.render('shopping', {
                title: 'Carrinho',
                style: 'shopping_style',
                courses: cartFull,
                cart: cart
            });

        } else {
            res.render('shopping', {
                title: 'Carrinho',
                style: 'shopping_style',
                empty: true
            });
        }

    }
};

exports.goToPay = (req, res) => {

    var cartFull = [];
    var authenticated = req.session.authenticated;
    if (authenticated) {
        var cart = req.session.cart;
        cart.item.forEach(id => {
            modelCourses.CoursesDAO.findById(id, retrCourses => {
                if (retrCourses !== null) {
                    cartFull.push(retrCourses);
                } else {
                    req.session.flash = {
                        type: 'error-search'
                    }
                    res.redirect('/');
                };
            });
        });

        res.render('payment', {
            title: 'Pagamento',
            style: 'payment_style',
            courses: cartFull,
            cart: cart
        });
    } else {
        req.session.payment = true;
        res.render('login', {
            title: 'Login',
            style: 'login_style'
        });
    }
};

exports.pay = (req, res) => {
    const numberCard = req.body.card;
    var email = req.body.email;
    var cart = req.session.cart;
    const errors = validationResult(req);
    var verificarCartao = getCardFlag(numberCard);
    var coursesName = "";
    if (!verificarCartao) {
        req.session.flash = {
            type: 'card-invalido'
        };
        res.redirect('/goToPay');
    } else {

        cart.item.forEach(id => {
            modelCourses.CoursesDAO.findById(id, retrCourses => {
                if (retrCourses !== null) {
                    coursesName += ".." + retrCourses.name;
                } else {
                    req.session.flash = {
                        type: 'error-search'
                    }
                    res.redirect('/');
                };
            });
        });

        if (errors.isEmpty()) {
            setTimeout(function() {
                sendMailPay(coursesName, email);
            }, 120000);
            req.session.flash = {
                type: 'pay-success'
            }

            var itens = req.session.cart.item;
            modelUsers.UserDAO.findByEmail(req.session.email, retrUsers => {
                if (retrUsers !== null) {
                    var vetor = retrUsers.courses;
                    console.log(vetor);
                    if (vetor != "") {
                        modelUsers.UserDAO.updateCourse(req.session.email, itens, result => {
                            if (result === null) {
                                console.log(itens);
                            }
                        });
                    } else {
                        modelUsers.UserDAO.updateCourseFirst(req.session.email, itens, result => {
                            if (result === null) {
                                console.log(itens);
                            }
                        });
                    }
                }
            });



            req.session.cart = new model.Cart(0, 0, 0, []);
            req.session.payment = false;
            res.redirect('/');
        } else {
            req.session.flash = {
                type: 'email-invalido'
            };
            res.redirect('/goToPay');
        }
    }
};