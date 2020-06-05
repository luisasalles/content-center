"use strict";

const colls = require('./db-connect.js').colls;

function Users(name, email, password) {
    this.id = null;
    this.name = name;
    this.email = email;
    this.password = password;
    this.courses = "";
    this.annotations = [];
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
    user.courses = doc.courses;
    user.annotations = doc.annotations;

    return user;
}

UserDAO.toDoc = function(user) {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        courses: user.courses,
        annotations: user.annotations
    }
}


Users.prototype.isValid = function() {

    const reducer = (acc, cur) =>
        acc && cur !== undefined && cur !== null && cur.trim() != '';

    return [this.email, this.password].reduce(reducer, true);
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

UserDAO.findByEmail = function(email, sendResult) {
    colls.users.findOne({ email: email }, (err, res) => {
        if (err !== null) {
            console.log(err.stack);
            sendResult(null);
        } else if (res === null) {
            sendResult(null);
        } else {
            sendResult(UserDAO.toObj(res));
        }
    });
};

UserDAO.updatePass = function(email, newpass, sendResult) {
    colls.users.updateOne({ email: email }, { $set: { password: newpass } }, (err, res) => {
        if (err !== null) {
            console.log(err.stack);
            sendResult(res);
        } else {
            console.log("Senha alterada");
            sendResult(null);
        }
    });
}

UserDAO.updateCourse = function(email, newcourses, sendResult) {
    colls.users.updateOne({ email: email }, { $set: { courses: newcourses } }, (err, res) => {
        if (err !== null) {
            console.log(err.stack);
            sendResult(res);
        } else {
            console.log("Cursos alterados");
            sendResult(null);
        }
    });
}

UserDAO.updateCourse = function(email, newcourses, sendResult) {
    colls.users.updateOne({ email: email }, [{ $set: { courses: { $concatArrays: ["$courses", newcourses] } } }], (err, res) => {
        if (err !== null) {
            console.log(err.stack);
            sendResult(res);
        } else {
            console.log("Cursos alterados");
            sendResult(null);
        }
    });
}


UserDAO.updateCourseFirst = function(email, newcourses, sendResult) {
    colls.users.updateOne({ email: email }, { $set: { courses: newcourses } }, (err, res) => {
        if (err !== null) {
            console.log(err.stack);
            sendResult(res);
        } else {
            console.log("Cursos alterados");
            sendResult(null);
        }
    });
}



UserDAO.updateAnnotations = function(email, newannotations, sendResult) {
    colls.users.updateOne({ email: email }, { $push: { annotations: newannotations } }, (err, res) => {
        if (err !== null) {
            console.log(err.stack);
            sendResult(res);
        } else {
            console.log("Anotações alteradas");
            sendResult(null);
        }
    });
}



module.exports = {
    Users: Users,
    UserDAO: UserDAO
}