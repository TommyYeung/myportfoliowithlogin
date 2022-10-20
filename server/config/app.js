

//File name: app.ejs
//Student’s Name: Pok Hei Yeung
//StudentID: 301240885
//Date: 16/10/2022





//get packages
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let logger = require('morgan');



// express authentication,session
let session = require('express-session');
let passport = require('passport');
let passportJWT = require('passport-jwt');
let JWTStrategy = passportJWT.Strategy;
let ExtractJWT = passportJWT.ExtractJwt;
let passportLocal = require('passport-local');
let localStrategy = passportLocal.Strategy;
let flash = require('connect-flash');


//Router
let indexRouter = require('../routes/index.server.router');
let contactRouter = require('../routes/contact.server.router');


// database setup
let mongoose = require('mongoose');
let DB = require('./development');

// mongoose get URI
mongoose.connect(DB.URI, {useNewUrlParser: true, useUnifiedTopology: true});


let mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'Connection Error:'));
mongoDB.once('open', ()=>{
  console.log('Connected to MongoDB...');
});





let app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs'); // express  -e


//morgan
app.use(logger('dev'));


//json
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//static stuff
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../node_modules')));



//setup express session
app.use(session({
  secret: "SomeSecret",
  saveUninitialized: false,
  resave: false
}));

//  flash for saving the msg
app.use(flash());

// use passport
app.use(passport.initialize());
app.use(passport.session());

// passport user configuration

// Get the users mongo schema
let userModel = require('../models/users.server.model');
let usersModel = userModel.usersModel;

// implement Authentication Strategy
passport.use(usersModel.createStrategy());

// serialize and deserialize all User info like login and reg
passport.serializeUser(usersModel.serializeUser());
passport.deserializeUser(usersModel.deserializeUser());

let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = DB.sessionSecret;//must have, else error(refering to dev.js)

let strategy = new JWTStrategy(jwtOptions, (jwt_payload, done) => {
  User.findById(jwt_payload.id)
    .then(user => {
      return done(null, user);
    })
    .catch(err => {
      return done(err, false);
    });
});

passport.use(strategy);

// routing
app.use('/', indexRouter);
app.use('/contact-list', contactRouter);


module.exports = app;
