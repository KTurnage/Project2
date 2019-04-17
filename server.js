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
  
    res.render("index");
 
});

app.get("/home", function(req, res) {
    res.render("home");
})


app.get("/account", function(req, res) {
    res.render("account");
})

app.get("/BCGNP", function(req, res) {
    res.render("BCGNP");
})

app.get("/durango", function(req, res) {
    res.render("durango");
})

app.get("/estespark", function(req, res) {
    res.render("estespark");
})

app.get("/GJ", function(req, res) {
    res.render("GJ");
})

app.get("/grandlake", function(req, res) {
    res.render("grandlake");
})

app.get("/mbells", function(req, res) {
    res.render("mbells");
})

app.get("/mesaverdenp", function(req, res) {
    res.render("mesaverdenp");
})

app.get("/mtevans", function(req, res) {
    res.render("mtevans");
})

app.get("/ouray", function(req, res) {
    res.render("ouray");
})

app.get("/pikespeak", function(req, res) {
    res.render("pikespeak");
})

app.get("/rmnp", function(req, res) {
    res.render("rmnp");
})

app.get("/SDNP", function(req, res) {
    res.render("SDNP");
})

app.get("/silverton", function(req, res) {
    res.render("silverton");
})



app.get('/api/signin', function(req, res) {
  res.send(req.body);
})

require('./controllers/userController')(app);
 
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