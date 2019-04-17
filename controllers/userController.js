var express = require("express");
var router = express.Router();


var db = require("../app/models");

module.exports = function(app) {

    app.post("/api/newuser", function(req, res) {
        console.log('New User Data: ', req.body);
        db.User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }).then(function(newuser) {
            console.log("request all good");
            res.render("home.hbs");
            
        })
    })

    app.post("/api/usersignin", function(req, res) {
        console.log(req.body);
        db.User.findOne({
            where: {
                email: req.body.email,
                password: req.body.password
            }
        }).then(function(usersignin) {
            console.log('test');
            res.render("home.hbs");
        })
    })

    app.get("/newpage", function(req, res) {
        res.render("newpage");
    })
}
