"use strict";

const model = require('../models/courses-model.js');

exports.searchType = (req, res) => {
    const type = req.params.type;
    model.CoursesDAO.findByType(type, retrCourses => {

        if (retrCourses !== null) {
            res.render('shopping-list', {
                title: 'Cursos',
                style: 'shoppinglist_style',
                courses: retrCourses
            });
        } else {
            req.session.flash = {
                type: 'error-search'
            }
            res.redirect('/');
        };
    });
};

exports.searchId = (req, res) => {
    const id = parseInt(req.params.id);
    model.CoursesDAO.findById(id, retrCourse => {

        if (retrCourse !== null) {
            res.render('product', {
                title: 'Curso',
                style: 'product_style',
                course: retrCourse
            });
        } else {
            req.session.flash = {
                type: 'error-search'
            }
            res.redirect('/');
        };
    });
};

exports.watchCourse = (req, res) => {
    const id = 9;
    req.session.course = id;
    model.CoursesDAO.findById(id, retrCourse => {
        if (retrCourse !== null) {
            var firstItem = retrCourse.classes.shift();
            res.render('class', {
                title: 'Aula',
                style: 'class_style',
                course: retrCourse,
                class: firstItem,
                messages: retrCourse.chat
            });
        }
    });
}

exports.watchClass = (req, res) => {
    const idClass = req.body.idclass;
    const idCourse = req.session.course;
    model.CoursesDAO.findById(idCourse, retrCourse => {
        if (retrCourse !== null) {
            retrCourse.classes.forEach(element => {
                console.log(element.id);
                if (element.id == idClass) {
                    let classWatch = {
                        id: element.id,
                        name: element.name
                    };
                    console.log(retrCourse.chat);
                    res.render('class', {
                        title: 'Aula',
                        style: 'class_style',
                        course: retrCourse,
                        class: classWatch,
                        messages: retrCourse.chat
                    });
                }
            });

        }
    });
}

exports.insertMessage = (req, res) => {

    var email = req.session.email;
    var texto = req.body.messages;
    var id = req.body.idcourse;
    var idClass = req.body.idclass;

    let corpoMensagem = {
        email: email,
        date: new Date(),
        text: texto
    };

    model.CoursesDAO.updateChat(parseInt(id), corpoMensagem, result => {
        if (result == null) {
            console.log(corpoMensagem);
            model.CoursesDAO.findById(parseInt(id), retrCourse => {

                if (retrCourse !== null) {
                    retrCourse.classes.forEach(element => {
                        console.log(retrCourse.chat);
                        if (element.id == idClass) {
                            let classWatch = {
                                id: element.id,
                                name: element.name
                            };

                            res.render('class', {
                                title: 'Aula',
                                style: 'class_style',
                                course: retrCourse,
                                class: classWatch,
                                messages: retrCourse.chat
                            });
                        }
                    });

                }
            });
        }
    });
};