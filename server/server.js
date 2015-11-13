var express = require('express');
// var rewrite = require('express-urlrewrite');
var util = require('util');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var LocalStrategy = require('passport-local').Strategy;
var path = require('path');
var session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var methodOverride = require('method-override');

var app = express();
var port = process.env.PORT || 8000;
var FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID || '';
var FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET || '';

var db = require('./db/config');
var User = require('./db/models/user');
var Org = require('./db/models/org');
var Account = require('./db/models/account');

//Middleware
app.use(cookieParser());
app.use(bodyParser());
app.use(methodOverride());
app.use(session({secret: 'zthunder'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('./dist'));






//
//  GET Routes
//

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({username:username}, function (err, user){
    if (err) { return done(err); }
    if (!user) {
      return done(null, false, { message: 'Incorrect username.' });
    }
    if (!user.comparePasswords(user.password)) {
      return done(null, false, { message: 'Incorrect password.' });
    }
    return done(null, user);
  })
  }
));
/*
app.get('/auth/facebook', passport.authenticate('facebook'), function (req,res) {});

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', {failureRedirect: '/api/login'}),
  function (req, res) {
    console.log('REQUEST ---- ' + req);
    console.log('RESPONSE ---- ' + res);
    res.redirect('/');
  }
);
*/
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});
/*
passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "http://zthunder.herokuapp.com/auth/facebook/callback",
    profileFields: ['email', 'profileUrl']
  },
  function(accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      console.log("grabbed FB profile ", profile);
      console.log("accessToken ", accessToken);
      console.log("refreshToken", refreshToken);
      // To keep the example simple, the user's Facebook profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the Facebook account with a user record in your database,
      // and return that user instead.
      return done(null, profile);
    });
  }
));

app.get('/auth/facebook', passport.authenticate('facebook'), function (req,res) {});

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', {failureRedirect: '/api/login'}),
  function (req, res) {
    console.log(req.body);
    res.redirect('/');
  }
);
*/
// /users/:userId  --  GET
app.get('/api/users/:id', function (req, res, next) {
  console.log('User ID: ' + req.params.id);
  //res.end(req.params.id);
});

// /orgs/:orgId  --  GET
app.get('/api/orgs/:id', function (req, res, next) {
  console.log('Org ID: ' + req.params.id);
  //res.end(req.params.id);
});

app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, '..', 'dist', 'index.html'));
});

//
//  POST Routes
//

// /signup  --  POST
app.post('/api/signup', function (req, res, next) {
  User.addUser({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email
  });

});

// /login  --  POST
app.post('/api/login', passport.authenticate('local'), function (req, res){
    console.log(passport);
    res.redirect('/');
  }
);

// /createOrg  --  POST
app.post('/api/createOrg', function (req, res, next) {
  console.log('New Org data: ' + req.body);
});


app.listen(port);
console.log('Server now listening on port ' + port);

//User.addUser('Alex', 'hello', 'alexmclean206@berkeley.edu');








function signin (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    var findUser = Q.nbind(User.findOne, User);
    findUser({username: username})
      .then(function (user) {
        if (!user) {
          next(new Error('User does not exist'));
        } else {
          return user.comparePasswords(password)
            .then(function (foundUser) {
              if (foundUser) {
                var token = jwt.encode(user, 'secret');
                res.json({token: token});
              } else {
                return next(new Error('No user'));
              }
            });
        }
      })
      .fail(function (error) {
        next(error);
      });
  }

function signup (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    var create;
    var newUser;

    var findOne = Q.nbind(User.findOne, User);

    // check to see if user already exists
    findOne({username: username})
      .then(function (user) {
        if (user) {
          next(new Error('User already exist!'));
        } else {
          // make a new user if not one
          create = Q.nbind(User.create, User);
          newUser = {
            username: username,
            password: password
          };
          return create(newUser);
        }
      })
      .then(function (user) {
        // create token to send back for auth
        var token = jwt.encode(user, 'secret');
        res.json({token: token});
      })
      .fail(function (error) {
        next(error);
      });
  }

function checkAuth (req, res, next) {
    // checking to see if the user is authenticated
    // grab the token in the header is any
    // then decode the token, which we end up being the user object
    // check to see if that user exists in the database
    var token = req.headers['x-access-token'];
    if (!token) {
      next(new Error('No token'));
    } else {
      var user = jwt.decode(token, 'secret');
      var findUser = Q.nbind(User.findOne, User);
      findUser({username: user.username})
        .then(function (foundUser) {
          if (foundUser) {
            res.send(200);
          } else {
            res.send(401);
          }
        })
        .fail(function (error) {
          next(error);
        });
    }
  }
