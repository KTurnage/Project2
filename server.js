require ('dotenv').config();
var express = require('express')
var passport = require('passport')
var session = require('express-session')
var exphbs = require('express-handlebars')
var app = express()

 
 
app.use(express.static("public"));

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

 
 
// For Passport
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
 
 
//For Handlebars
app.set('views', './app/views')
app.engine('hbs', exphbs({
    extname: '.hbs',
    defaultLayout: "main"
}));
app.set('view engine', '.hbs');
// app.engine("handlebars", exphbs({ defaultLayout: "main" }))
// app.set("view engine", "handlebars")
 
 
app.get('/', function(req, res) {
  
    res.send('Welcome to Passport with Sequelize');
 
});

app.get('/api/signin', function(req, res) {
  res.send(req.body);
})
 
//Models
var models = require("./app/models");
 
//Routes
 
// var authRoute = require('./app/routes/auth.js')(app,passport);
 
 
//load passport strategies
 
require('./config/passport/passport.js')(passport, models.user);
 
 

var authController = require('./app/controllers/authcontroller.js');
 
app.get('/signup', authController.signup);
 
    app.get('/signin', authController.signin);

    app.get('/dashboard', isLoggedIn, authController.dashboard);

    app.get('/logout', authController.logout);

    function isLoggedIn(req, res, next) {
 
        if (req.isAuthenticated())
         
            return next();
             
        res.redirect('/signin');
     
    }
app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/dashboard',

    failureRedirect: '/signup'
}

));

app.post('/signin', passport.authenticate('local-signin', {
    successRedirect: '/dashboard',

    failureRedirect: '/signin'
}

));
//Sync Database
 
models.sequelize.sync().then(function() {
 
    console.log('Nice! Database looks fine')
 
 
}).catch(function(err) {
 
    console.log(err, "Something went wrong with the Database Update!")
 
});


 
 
app.listen(5000, function(err) {
 
    if (!err)
 
        console.log("Site is live");
         
    else console.log(err)
 
});