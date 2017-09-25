const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const env = process.env.NODE_ENV || "development";
const Config = require('./config/config')[env];

var routes = require('./routes/index');
var keley = require('./routes/keley');

// Connect to DBs
mongoose.Promise = global.Promise;
mongoose.connect(Config.DataBase,{useMongoClient: true,})
  .then(() =>  console.log('Connection to DataBase success'))
  .catch((err) => console.error('Connection to DataBase failed'));
mongoose.set('debug', true);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

//url
app.get('/api',keley.index)
app.post('/api',keley.addCatalogue)
app.put('/api/:id',keley.updateCatalogue)
app.delete('/api/:id',keley.deleteCatalogue)
app.get('/api/:id',keley.allProduit)
app.post('/api/:id',keley.addProduit)
app.put('/api/:id/:idp',keley.updateProduit)
app.delete('/api/:id/:idp',keley.deleteProduit)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
