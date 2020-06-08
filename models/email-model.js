"use strict";

const colls = require('./db-connect.js').colls;

function CodeEmail(createdAt, email, code) {
    this.createdAt = createdAt;
    this.email = email;
    this.code = code;
}

const CodeEmailDAO = {};
CodeEmailDAO.toObj = function(doc) {
    const codeEmail = new CodeEmail();

    codeEmail.createdAt = doc.createAd;
    codeEmail.email = doc.email;
    codeEmail.code = doc.code;

    return codeEmail;
}

CodeEmailDAO.toDoc = function(codeEmail) {
    return {
        createdAt: codeEmail.createdAt,
        email: codeEmail.email,
        code: codeEmail.code
    }
}

CodeEmail.prototype.isValid = function() {

    const reducer = (acc, cur) =>
        acc && cur !== undefined && cur !== null && cur.trim() != '';

    return [this.email].reduce(reducer, true);
}

CodeEmailDAO.insert = (codeEmail, sendStatus) => {
    colls.codemail.insertOne(CodeEmailDAO.toDoc(codeEmail), (err, res) => {
        if (err === null) {
            sendStatus(res.insertedCount > 0);
        } else {
            console.log(err.stack);
            sendStatus(false);
        }
    });
};


CodeEmailDAO.findByEmail = function(email, sendResult) {
    colls.codemail.findOne({ email: email }, (err, res) => {
        if (err !== null) {
            console.log(err.stack);
            sendResult(null);
        } else if (res === null) {
            sendResult(null);
        } else {
            sendResult(CodeEmailDAO.toObj(res));
        }
    });
};

CodeEmailDAO.removeEmail = function(email, sendResult) {
    colls.codemail.remove({ email: email }, (err, res) => {
        if (err !== null) {
            console.log(err.stack);
            sendResult(res);
        } else {
            console.log("Email Removido");
            sendResult(null);
        }
    });
}


module.exports = {
    CodeEmail: CodeEmail,
    CodeEmailDAO: CodeEmailDAO
}