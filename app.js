//begin signup page
var express = require('express');
var app = express();
var promise = require('bluebird');
const bodyParser = require('body-parser');

var passport = require('passport')
var localStrategy = require('passport-local').Strategy

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended : false}))

var options = {
    promiseLib : promise
}
var pgp = require('pg-promise')(options)
var connectionstring = 'postgres://localhost:5432/stocks';
var db = pgp(connectionstring);


app.use(express.static('./public'));
app.use(require('./routes/signup'))
// app.use(require('./routes/login'))
// app.use(require('./routes/passport'))


//end signup page

//beginning of login stuff

// var session = require('express-session')
// var cookieParser = require('cookie-parser')
// var Sequelize = require('sequelize');   // used to be able to make changes to tables through code
//var sequelize = new Sequelize('postgres://localhost:5432/users');


// app.use(cookieParser())

// app.use(session({
//     secret: 'stock muncher',
//     cookie: {maxAge: 60000}
// }))

// app.get('/login')


























var server = app.listen('2000', function(){
    console.log('listening on port 2000');
});

