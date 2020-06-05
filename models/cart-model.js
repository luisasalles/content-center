"use strict";

const colls = require('./db-connect.js').colls;

function Cart(totalPrice, discounts, pay, item) {
    this.totalPrice = totalPrice;
    this.discounts = discounts;
    this.pay = pay;
    this.item = item;
}

const CartsDAO = {};
CartsDAO.toObj = function(doc, cart) {

    cart.totalPrice += doc.price;
    cart.discounts = cart.discounts * 10;
    cart.pay = (cart.totalPrice - (cart.totalPrice * cart.discounts));
    cart.item = addItens(doc.id, cart.item);

    return cart;

}

CartsDAO.toRemove = function(doc, cart) {

    cart.totalPrice -= doc.price;
    cart.discounts = cart.discounts * 10;
    cart.pay = (cart.totalPrice - (cart.totalPrice * cart.discounts));
    cart.item = removeItens(doc.id, cart.item);
    return cart;

}

function removeItens(id, itens) {
    var itensRemaining = [];
    itens.forEach(element => {
        if (element != id) {
            itensRemaining.push(id);
        }
    });

    itens = itensRemaining;
    return itens;
}

function addItens(id, itens) {
    itens.push(id);
    return itens;
}

module.exports = {
    CartsDAO: CartsDAO,
    Cart: Cart
}