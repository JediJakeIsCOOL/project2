var express = require('express');
var app = express();
var promise = require('bluebird');
const bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended : false}))

var options = {
    promiseLib : promise
}
var pgp = require('pg-promise')(options)
var connectionstring = 'postgres://localhost:5432/beatthemarket';
var db = pgp(connectionstring);


app.use(express.static('public'));
app.use(require('./routes/signup'))



app.get('/login', function(req, res){
    res.render('login')
})

//beginning of login stuff

var session = require('express-session')
var cookieParser = require('cookie-parser')


app.use(cookieParser())

app.use(session({
    secret: 'stock muncher',
    cookie: {maxAge: 60000}
}))

app.get('/login')


























var server = app.listen('2000', function(){
    console.log('listening on port 2000');
});

