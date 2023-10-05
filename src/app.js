const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('./middleware/passport');
const logger = require('./middleware/logger');
const error404 = require('./middleware/error-404');
const indexRouter = require('./routes/main');
const userRouter = require('./routes/users');
const booksRouter = require('./routes/books');


const app = express();

app.use(express.json());
app.set('view engine', 'ejs');

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.deserializeUser());

app.use(logger);
app.use('/', indexRouter);
app.use('/api/user', userRouter);
app.use('/api/books', booksRouter);
app.use(error404);

async function start(PORT, UrlDB) {
    try {
        await mongoose.connect(UrlDB);
        app.listen(PORT);   
    } catch(e) {
        console.log(e);
    }  
}

const UrlDB = process.env.UrlDB;
const PORT = process.env.PORT || 3000;
start(PORT, UrlDB);

