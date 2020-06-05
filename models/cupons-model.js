"use strict";

const colls = require('./db-connect.js').colls;

function Cupom(cupom, porcent) {
    this.cupom = cupom;
    this.porcent = porcent;
}

const CuponsDAO = {};
CuponsDAO.findByCupom = function(cupom, sendResult) {
    colls.cupons.findOne({ cupom: cupom }, (err, res) => {
        if (err !== null) {
            console.log(err.stack);
            sendResult(null);
        } else if (res === null) {
            sendResult(null);
        } else {
            sendResult(res);
        }
    });
};

module.exports = {
    CuponsDAO: CuponsDAO,
    Cupom: Cupom
}