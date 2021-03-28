const indexRouter = require('./routes/index')
var session = require("express-session");
var bodyParser = require("body-parser");

// EXPRESS SETUP
const express = require('express')
const app = express()

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.use(express.static(__dirname + '/public'))
app.use('/models', express.static(__dirname + '/models'))
app.use(express.static("public"));
app.use('/img', express.static(__dirname + 'public/img'))

// ROUTER SETUP
app.use('/', indexRouter) 

app.get('*', function(req, res, next){
    res.status(404);
    if (req.accepts('html')) {
      res.redirect('https://sitpi.pro');
      return;
    }  
    res.type('txt').send('Not found');
  });

app.listen(process.env.PORT || 80)