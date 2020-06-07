"use strict";

const colls = require('./db-connect.js').colls;

function Courses(id, name, type, price, description, hours, image, classes, teacher) {
    this.id = null;
    this.name = name;
    this.type = type;
    this.price = price;
    this.description = description;
    this.hours = hours;
    this.image = image;
    this.classes = classes;
    this.teacher = teacher;
    this.chat = {};
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


const CoursesDAO = {};
CoursesDAO.toObj = function(doc) {
    const course = new Courses();

    course.id = doc.id;
    course.name = doc.name;
    course.type = doc.type;
    course.price = doc.price;
    course.description = doc.description;
    course.hours = doc.hours;
    course.image = doc.image;
    course.classes = doc.classes;
    course.teacher = doc.teacher;
    course.chat = doc.chat;

    return course;
}

CoursesDAO.toDoc = function(course) {
    return {
        id: course.id,
        name: course.name,
        type: course.type,
        price: course.price,
        description: course.description,
        hours: course.hours,
        image: course.image,
        classes: course.classes,
        teacher: course.teacher,
        chat: course.chat
    }
}

CoursesDAO.findByType = function(type, sendResult) {
    var itens = [];
    colls.courses.find({ type: type }).toArray(function(err, res) {
        if (err !== null) {
            console.log(err.stack);
            sendResult(null);
        } else if (res === null) {
            sendResult(null);
        } else {
            res.forEach((item) => {
                itens.push(CoursesDAO.toObj(item));
            });
            sendResult(itens);
        }
    });
};

CoursesDAO.findByWord = function(word, sendResult) {
    var itens = [];
    colls.courses.find({ name: { $regex: word, $options: "$i" } }).toArray(function(err, res) {
        if (err !== null) {
            console.log(err.stack);
            sendResult(null);
        } else if (res === null) {
            sendResult(null);
        } else {
            res.forEach((item) => {
                itens.push(CoursesDAO.toObj(item));
            });
            sendResult(itens);
        }
    });
};

CoursesDAO.findById = function(id, sendResult) {
    colls.courses.findOne({ id: id }, (err, res) => {
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

CoursesDAO.updateChat = function(id, newmessage, sendResult) {
    colls.courses.updateOne({ id: id }, { $push: { chat: newmessage } }, (err, res) => {
        if (err !== null) {
            console.log(err.stack);
            sendResult(res);
        } else {
            console.log("Mensagem adicionada");
            sendResult(null);
        }
    });
}

module.exports = {
    Courses: Courses,
    CoursesDAO: CoursesDAO
}