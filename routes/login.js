var express = require('express')
//var promise = require('bluebird')
var session = require('express-session')
var cookieParser = require('cookie-parser')
var app =  express();

var pg = require('pg')
var pgSession = require('connect-pg-simple')(session)
//var pgPromise = pgPromiseLib();

//var connectionString = 'postgres://localhost:5432/beatthemarket';

var connectionString = {
    username: '',
    database: 'beatthemarket',
    host: 'localhost',
    post: 5432,
    max: 50,
    idleTimeoutMillis: 30000

}

var passport = require('passport')

var LocalStrategy = require('passport-local').Strategy

const pool = new pg.Pool(connectionString)


var bcrypt = require('bcrypt')


// //create a datbase store

var pgPool = pg.Pool({
    db: pool
})
//create session
var pgSession = require('connect-pg-simple')(session)

app.use(session({
    store: new pgSession({
        pool: pgPool
    }),
    secret: "something cool",
    resave: false,
    saveUninitialized: false,
    proxy: true,
    cookie: 14 *24 * 60 * 60 *1000
} ));



// // initialize passport

app.use(passport.initialize());
app.use(passport.session());

//pass passport into our express object

//create a local stategy

passport.use(new LocalStrategy(
    function(username, password, done) {
      db.query('SELECT * from users where username = $1', [username], (err, result) => {
            if(err) {
                return done(err)
            }
            if(result.rows.length > 0) {
                const first = result.rows[0]
                bcrypt.compare(password, first.password, function(err, res){
                    if(res) {
                        done(null, { id: first.id, username: first.username,})
                    
                    } else {
                        done(null, false)
                    
                    }
                })
            } else {
                done(null, false)
            }
            
      } //end of call back
    
  )//end of database query
}
));
passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    // User.findById(id, function(err, user) {
    //   done(err, user);
    //});

    done(err, 'id');
  });

//call passport.authenticate form our route


app.set('view engine', 'ejs');
app.set('views', '../views');

app.get('/', function(req, res){
    res.send('Authenticated')
})

app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'

}))



app.get('/login', function(req, res){
    res.render('login')

})



// router.post('/login', passport.authenticate('local', {
//     successRedirect: '/',
// })


var server = app.listen('2200', function(){
    console.log('listening on port 2200');
});



//module.exports = router