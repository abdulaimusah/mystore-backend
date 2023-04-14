var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const dbo = require('./db/conn');
var productsRouter = require('./routes/products');
var productRouter = require('./routes/product');
var createRouter = require('./routes/create');
var signupRouter = require('./routes/signup');
var loginRouter = require('./routes/login');
var checkRouter = require('./routes/check-username');
var updateRouter = require('./routes/update');
var deleteRouter = require('./routes/delete');

var cors = require('cors');



var app = express();


// call app middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// create a product
app.use('/create', createRouter);
// get one product 
app.use('/product', productRouter);
// get all products
app.use('/products', productsRouter);
app.use('/signup', signupRouter);
app.use('/login', loginRouter);
app.use('/check-username', checkRouter);
app.use('/update', updateRouter);
app.use('/delete', deleteRouter);

// get index page
app.get('/', function (req, res) {
  res.send("App is running");
});

// connect to database.
dbo.connectToServer(function (err) {
  if (err) {
    console.error(err);
   process.exit();
  }
});

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
