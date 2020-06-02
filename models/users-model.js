"use strict";

const colls = require('./db-connect.js').colls;

function Users(name, email, password) {
    this.id = null;
    this.name = name;
    this.email = email;
    this.password = password;
}

function nextId(idReady) {
    colls.sequences.findOneAndUpdate({ name: 'user_id' }, { $inc: { value: 1 } },
        (err, res) => {
            if (err !== null) {
                console.log(err);
            }
            idReady(res.value.value);
        });
}


const UserDAO = {};
UserDAO.toObj = function(doc) {
    const user = new Users();

    user.id = doc.id;
    user.email = doc.email;
    user.name = doc.name;
    user.password = doc.password;

    return user;
}

UserDAO.toDoc = function(user) {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password
    }
}


UserDAO.insert = (user, sendStatus) => {
    nextId((id) => {
        if (id == null) {
            console.log('Failed to generate a profile id');
            sendStatus(false);
        } else {
            user.id = id;
            colls.users.insertOne(UserDAO.toDoc(user), (err, res) => {
                if (err === null) {
                    sendStatus(res.insertedCount > 0);
                } else {
                    console.log(err.stack);
                    sendStatus(false);
                }
            });
        }
    });
};

module.exports = {
    Users: Users,
    UserDAO: UserDAO
}