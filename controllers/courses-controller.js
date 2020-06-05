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