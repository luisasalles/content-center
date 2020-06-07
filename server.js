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

app.get('/student', (req, res) => {
    res.render('student', {
        title: 'Área do estudante',
        style: 'accAluno_Style'
    })
});

app.get('/teacher', (req, res) => {
    res.render('teacher', {
        title: 'Área do Professor',
        style: 'accAluno_Style'
    });
});

app.get('/perfil', (req, res) => {
    res.render('perfil', {
        layout: false
    });
});

app.get('/adCurso', (req, res) => {
    res.render('ad_curso', {
        layout: false
    });
});

app.get('/anotacoes', (req, res) => {
    res.render('anotacoes', {
        layout: false
    });
});

app.get('/cursos', (req, res) => {
    res.render('cursos', {
        layout: false
    });
});

app.get('/duvidas', (req, res) => {
    res.render('duvidas', {
        layout: false
    });
});

app.get('/editaCursos', (req, res) => {
    res.render('edita_cursos', {
        layout: false
    });
});

app.get('/editaCurso', (req, res) => {
    res.render('editaCursoInfo', {
        layout: false
    });
});

app.get('/novaAula', (req, res) => {
    res.render('nova_aula', {
        layout: false
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
app.get('/newpass', emailController.newPassForm);
app.post('/updatePass', userController.changePass);

app.get('/search/:type', courseController.searchType);
app.get('/course/:id', courseController.searchId);

app.get('/searchfull/:word', courseController.searchWord);

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

app.get('/notfound', (req, res) => {
    res.render('notfound', {
        title: 'Página Não Encontrada',
        style: 'notfound'
    });
});

app.get('/error', (req, res) => {
    res.render('error', {
        title: 'Erro',
        style: 'error'
    });
});



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

app.use((err, req, res, next) => {
    console.log(err);
    console.error(err.stack);
    res.status(500).redirect('/error');
});

app.use((req, res) => {
    res.status(404).redirect('/notfound');
});