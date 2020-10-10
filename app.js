
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');


app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
  }));

// Routes
var publicRoute = require('./routes/public');
var indexRoute = require('./routes/index');
var UserRoute = require('./routes/user');
var adminRoute = require('./routes/admin');
var vaRoute = require('./routes/va');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', publicRoute);
app.use('/index', indexRoute);
app.use('/user', UserRoute);
app.use('/admin', adminRoute);
app.use('/va', vaRoute);

app.listen(1000);