var createError = require('http-errors');
const connectDB = require('./plugins/mongo/db');
const passport = require('./plugins/passport/passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const env = require('dotenv').config();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const config = require('./config/config')
var indexRouter = require('./routes/index');


var app = express();
global.config = config
connectDB();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


///base passport js middleware //session options,login callbacks,requesting session
app.use(session({
  secret:process.env.SESHID,
  resave:false,
  saveUninitialized: false,
  store: new MongoStore({mongoUrl:"mongodb+srv://"+process.env.MONUSR+":"+encodeURIComponent(process.env.MONPASS)+"@cluster0.tpmae.mongodb.net/w2Apps?retryWrites=true&w=majority"}),
  cookie:{secure:true}
}))
app.use(passport.initialize())
app.use(passport.session())


app.use('/', indexRouter);


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
