const express = require('express');
const path = require('path');
const morgan = require('morgan');
const moongose = require('mongoose');
const passport = require('passport');
const methodOverride = require('method-override');
const session = require('express-session');

const cookieParser = require('cookie-parser');
const flash = require('express-flash-2');

const app = express();



// connecting to db
moongose.connect('mongodb://localhost/sys-asistencias', {useNewUrlParser: true, useUnifiedTopology: true})
.then(db => console.log("[*] Db connected."))
.catch(err => console.log("[ERROR] Db connection unsuccessfully."));


// importing routes
const indexRoutes = require('./routes/index');
const employeesRoutes = require('./routes/employees');


// settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended : false}));
app.use(cookieParser('keyboard cat'));
  app.use(session({
    secret: 'asistencias secret key',
    resave: false,
    saveUninitialized:false}));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());
// Global Variables

// routes
app.use('/', indexRoutes);
app.use(employeesRoutes);
app.use(express.static(path.join(__dirname, '/public')));


// starting server
app.listen(app.get('port'), ()=>{
    console.log(`[*] Server on port ${app.get('port')}`);
});