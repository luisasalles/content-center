"use strict";

const express = require('express');
const path = require('path');
const handlebars = require('express-handlebars');
const connectMongo = require('./models/db-connect.js');
const userController = require('./controllers/users-controller.js');
const emailController = require('./controllers/email-controller.js');
const courseController = require('./controllers/courses-controller.js');
const cartController = require('./controllers/cart-controller.js');
const cuponsController = require('./controllers/cupons-controller.js');
const bodyParser = require('body-parser');
const process = require('process');
const session = require('express-session');
const config = require('./conf/config.json');

const app = express();

connectMongo.connect(() => {
    console.log('Database connected');
    app.listen(3000, () => {
        console.log('Server listening on port 3000');
    });
});

app.engine('handlebars', handlebars({
    helpers: {
        equals: (a, b) => a == b
    }
}));
app.set('view engine', 'handlebars');
app.set('views', path.resolve(__dirname, 'views'));
app.use('/static', express.static(path.join(__dirname, 'static')));

app.use(session({
    secret: config.secret,
    resalve: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));


app.use((req, res, next) => {
    res.locals.session = req.session;
    res.locals.flash = req.session.flash;
    delete req.session.flash;
    res.locals.emailCode = req.session.emailCode;
    res.locals.cart = req.session.cart;
    res.locals.payment = req.session.payment;
    res.locals.email = req.session.email;
    res.locals.course = req.session.course;
    next();
});

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('content-center', {
        title: 'Content Center',
        style: 'main_style'
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


app.get('/shopping', (req, res) => {
    res.render('shopping', {
        title: 'Carrinho',
        style: 'shopping_style'
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



app.get('/login', userController.loginForm);
app.post('/login', userController.loginFormProcessing);
app.get('/logout', userController.logout);

app.get('/register', userController.registerForm);
app.post('/addUser', userController.validateEmail, userController.addUser);

app.get('/forgotpass', userController.forgotpassForm);
app.post('/code', userController.validateEmail, emailController.addCodeEmail);

app.get('/passcode', emailController.codeForm);
app.post('/sendCode', emailController.findCode);

app.post('/updatePass', userController.changePass);

app.get('/search/:type', courseController.searchType);
app.get('/course/:id', courseController.searchId);

app.get('/add/:type/:id', cartController.addToCart);

app.get('/goCart', cartController.goToCart);

app.post('/discount', cuponsController.searchCupom);

app.get('/remove/:id', cartController.removeToCart);

app.get('/goToPay', cartController.goToPay);

app.post('/pay', cartController.validateEmail, cartController.pay);

app.get('/watchCourse', courseController.watchCourse);
app.post('/watchClass', courseController.watchClass);

app.post('/insertMessages', courseController.insertMessage);

app.post('/saveAnnotation', userController.saveAnnotations);


process.on('exit', (code) => {
    console.log(`Server exiting with code ${code}`);
    connectMongo.disconnect(() => {
        console.log('Database disconnect');
    });
});

let exitHandler = (code) => {
    process.exit();
}

process.once('SIGINT', exitHandler);
process.once('SIGUSR2', exitHandler);