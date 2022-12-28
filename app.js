var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
const mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
app.use(cors())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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

mongoose.set('strictQuery', false)
main().catch(err => console.log(err));

async function main() {
  const DB_URL = "mongodb://admin:admin@svc.gksl2.cloudtype.app:32376?authMechanism=DEFAULT"
  await mongoose.connect(DB_URL, {useNewUrlParser: true, useUnifiedTopology: true}, (err)=>{
    if(err) console.log(err)
    else console.log('Connected... successfully....')
  });

  const db = mongoose.connection
  db.on('error', (error)=>console.log(error))
  db.once('open', ()=>console.log('DB connected..'))

  
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

module.exports = app;
