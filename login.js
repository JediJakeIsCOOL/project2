var passport = require('passport'), LocalStrategy = require('passport-local').Strategy
var express = require('express')
var app = express()

app.post('/login', 
    passport.authenticate('local', {successRedirect: '/', failureRedirect: '/login', failureFlash: true})
)
