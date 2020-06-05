"use strict";

const model = require('../models/cupons-model.js');

exports.searchCupom = (req, res) => {

    const cupom = req.body.cupom;
    const cart = req.session.cart;

    if (cupom !== undefined && cupom !== null && cupom.trim() != '') {
        model.CuponsDAO.findByCupom(cupom, retrCupom => {

            if (retrCupom !== null) {
                if (parseInt(cart.discounts) == 0) {
                    cart.discounts = retrCupom.porcent * cart.totalPrice;
                    cart.pay = cart.totalPrice - (cart.totalPrice * retrCupom.porcent);
                } else {
                    req.session.flash = {
                        type: 'cupom-invalido'
                    }
                }
                res.redirect('/goCart');
            } else {
                req.session.flash = {
                    type: 'cupom-invalido'
                }
                res.redirect('/goCart');
            };
        });
    } else {
        req.session.flash = {
            type: 'field-invalido'
        }
        res.redirect('/goCart');
    }
};