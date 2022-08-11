var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const  mongoose  = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const usersRoutes = require('./routes/users');
const chatsRoutes = require('./routes/chats');
const docsRoutes = require('./routes/docList');
const shareRoutes = require('./routes/share');
const editRoutes = require('./routes/edit');

var indexRouter = require('./routes/index');
var welcomeRouter = require('./routes/welcome');
var registerRouter = require('./routes/register');
var loginRouter = require('./routes/login');
var loginSuccessRouter = require('./routes/loginSuccess');
const errorHandler = require('./errors/errorHandler');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use('/', indexRouter);
app.use('/welcome', welcomeRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/loginSuccess', loginSuccessRouter);

app.use(usersRoutes);
app.use(chatsRoutes);
app.use(docsRoutes);
app.use(shareRoutes);
app.use(editRoutes);

//middleware for method override
app.use(methodOverride('_method'));
app.use(errorHandler);

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
