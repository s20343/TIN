var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');


const customersRouter = require('./routes/customersRoute');
const carsRouter = require('./routes/carsRoute');
const rentRouter = require('./routes/rentRoute');
const customerApiRouter = require('./routes/api/customerAPIRoute');
const carApiRouter = require('./routes/api/carAPIRoute');
const rentApiRouter = require('./routes/api/rentAPIRoute');
const session = require('express-session');
const authUtils = require("./util/authUtil");
const sequelizeInit = require('./config/sequelize/init');


const i18n = require('i18n');
i18n.configure({
    locales: ['pl', 'en'], // languages available in the application. Create a separate dictionary for each of them
    directory: path.join(__dirname, 'locales'), // path to the directory where the dictionaries are located
    objectNotation: true, // enables the use of nested keys in object notation
    cookie: 'acme-hr-lang', //the name of the cookie that our application will use to store information about the language currently selected by the user
});


sequelizeInit()
    .catch(err => {
      console.log(err);
    });
var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const fmt = require('./util/dateFormatting');
app.use((req, res, next) => {
    res.locals.fmt = fmt;
    next();
});


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cookieParser('secret'));
app.use(i18n.init); //initialization and connection to the application context
app.use(cookieParser('acme-hr-lang'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'my_secret_password',
    resave: false
}));
app.use((req,res,next) => {
    const loggedUser = req.session.loggedUser;
    res.locals.loggedUser = loggedUser;
    if(!res.locals.loginError) {
        res.locals.loginError = undefined;
    }
    next();
});
app.use((req, res, next) => {
    if(!res.locals.lang) {
        res.locals.lang = req.cookies['acme-hr-lang'];
    }
    next();
});

app.use('/', indexRouter);
app.use('/customers', authUtils.permitAuthenticatedUser,customersRouter);
app.use('/cars', authUtils.permitAuthenticatedUser,carsRouter);
app.use('/rent', authUtils.permitAuthenticatedUser,rentRouter);
app.use('/customers', customersRouter);
app.use('/cars', carsRouter);
app.use('/rent', rentRouter);

app.use('/api/customers', customerApiRouter);
app.use('/api/cars', carApiRouter);
app.use('/api/rent', rentApiRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
