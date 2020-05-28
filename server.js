"use strict";

const express = require('express');
const path = require('path');
const handlebars = require('express-handlebars');

const app = express();

app.listen(3000, () => {
    console.log('Server listening at port 3000');
});

app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');

app.set('views', path.resolve(__dirname, 'views'));

app.use('/static', express.static(path.join(__dirname, 'static')));

app.get('/', (req, res) => {
    res.render('content-center', {
        title: 'Content Center',
        style: 'main_style'
    });
});

app.get('/login', (req, res) => {
    res.render('login', {
        title: 'Login',
        style: 'login_style'
    });
});

app.get('/register', (req, res) => {
    res.render('register', {
        title: 'Registre-se',
        style: 'login_style'
    });
});

app.get('/forgotpass', (req, res) => {
    res.render('forgotpass', {
        title: 'Esqueceu Senha',
        style: 'login_style'
    });
});

app.get('/passcode', (req, res) => {
    res.render('passcode', {
        title: 'Codigo de Recuperação',
        style: 'login_style'
    });
});

app.get('/newpass', (req, res) => {
    res.render('newpass', {
        title: 'Nova Senha',
        style: 'login_style'
    });
});

app.get('/class', (req, res) => {
    res.render('class', {
        title: 'Aula',
        style: 'class_style'
    });
});

app.get('/payment', (req, res) => {
    res.render('payment', {
        title: 'Pagamento',
        style: 'payment_style'
    });
});

app.get('/product', (req, res) => {
    res.render('product', {
        title: 'Curso',
        style: 'product_style'
    });
});

app.get('/shopping', (req, res) => {
    res.render('shopping', {
        title: 'Carrinho',
        style: 'shopping_style'
    });
});

app.get('/shoppinglist', (req, res) => {
    res.render('shopping-list', {
        title: 'Cursos',
        style: 'shoppinglist_style'
    });
});

app.get('/student', (req, res) => {
    res.render('profile', {
        title: 'Área do Aluno',
        style: 'student_style',
        pageTitle: 'Content Center - Área do Aluno',
        option1: 'Perfil',
        option2: 'Cursos',
        option3: 'Anotações',
        route1: '#',
        route2: '#',
        route3: '#',
    });
});


app.get('/profileStudent', (req, res) => {
    res.render('profile', {
        title: 'Área do Aluno',
        style: 'student_style',
        pageTitle: 'Content Center - Aluno - Perfil',
        option1: 'Perfil',
        option2: 'Cursos',
        option3: 'Anotações',
        route1: '#',
        route2: '#',
        route3: '#',
    });
});

app.get('/annotations', (req, res) => {
    res.render('profile', {
        title: 'Área do Aluno',
        style: 'student_style',
        pageTitle: 'Content Center - Aluno - Note',
        option1: 'Perfil',
        option2: 'Cursos',
        option3: 'Anotações',
        route1: '#',
        route2: '#',
        route3: '#',
    });
});

app.get('/coursesStudent', (req, res) => {
    res.render('profile', {
        title: 'Área do Aluno',
        style: 'student_style',
        pageTitle: 'Content Center - Aluno - Cursos',
        option1: 'Perfil',
        option2: 'Cursos',
        option3: 'Anotações',
        route1: '#',
        route2: '#',
        route3: '#',
    });
});

app.get('/teacher', (req, res) => {
    res.render('profile', {
        title: 'Área do Professor',
        style: 'student_style',
        pageTitle: 'Content Center - Área do Professor',
        option1: 'Perfil',
        option2: 'Adicionar/Remover Cursos',
        option3: 'Responder Dúvidas',
        route1: '#',
        route2: '#',
        route3: '#',
    });
});

app.get('/addremoveCourse', (req, res) => {
    res.render('profile', {
        title: 'Área do Professor',
        style: 'student_style',
        pageTitle: 'Content Center - Professor - Meus Cursos',
        option1: 'Perfil',
        option2: 'Adicionar/Remover Cursos',
        option3: 'Responder Dúvidas',
        route1: '#',
        route2: '#',
        route3: '#',
    });
});

app.get('/doubt', (req, res) => {
    res.render('profile', {
        title: 'Área do Professor',
        style: 'student_style',
        pageTitle: 'Content Center - Professor - Dúvidas',
        option1: 'Perfil',
        option2: 'Adicionar/Remover Cursos',
        option3: 'Responder Dúvidas',
        route1: '#',
        route2: '#',
        route3: '#',
    });
});

app.get('/profileTeacher', (req, res) => {
    res.render('profile', {
        title: 'Área do Professor',
        style: 'student_style',
        pageTitle: 'Content Center - Professor - Perfil',
        option1: 'Perfil',
        option2: 'Adicionar/Remover Cursos',
        option3: 'Responder Dúvidas',
        route1: '#',
        route2: '#',
        route3: '#',
    });
});