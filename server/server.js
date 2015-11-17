//
//  Module load
//

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
var async = require('async');
var Q = require('q');
var jwt = require('jwt-simple');

//
//  Database vars
//

var db = require('./db/config');
var User = require('./db/models/user');
var Org = require('./db/models/org');
var Account = require('./db/models/account');

//
//  App vars and API keys
//

var app = express();
var port = process.env.PORT || 8000;
var FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID || '793916147386968';
var FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET || '268975de03f6b689fbffbf182d9281a5';

//
//  Middleware
//

app.use(cookieParser());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(session({
  saveUninitialized: false,
  resave: false,
  secret: 'zthunder'
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('./dist'));

//
//  Passport Strategies
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

//HACK
var loggedInUser = null;

passport.use(new FacebookStrategy({
    passReqToCallback: true,
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:8000/auth/facebook/callback"/*"http://zthunder.herokuapp.com/auth/facebook/callback"*/,
    profileFields: ['email', 'profileUrl', 'id', 'displayName', 'photos']
  },
  function(req, accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      return User.findOne({username: loggedInUser.username})
        .then(function (found){
          console.log("found ", found);
          var returned = {
              name:'facebook',
              url: profile.profileUrl,
              imgLink: profile.photos[0].value
            };
          found.accounts.push(returned);
          found.save( function (err, saved){
            console.log("return ", returned);
            return done(null, returned);
          });
        });
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

//
// GET Routes
//

app.get('/auth/facebook', passport.authenticate('facebook'), function (req,res) {});

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', {failureRedirect: '/api/login'}),
  function (req, res) {
    res.redirect('/');
  }
);

app.get('/api/users', function (req, res, next) {
  var token = req.query.token;
  var user = jwt.decode(token, 'zinnober');
  User.findOne({username: user.username})
    .then(function (foundUser){
      if(foundUser){
        loggedInUser = foundUser;
        res.send({user: foundUser});
      } else {
        res.send({error: "User not authorized"});
      }
    });
});

app.get('/api/orgs/:code', function (req, res, next) {
  var code = req.params.code;
  Org.findOne({code: code})
    .then(function (foundOrg){
      if(foundOrg){
        var callbacks = [];

        foundOrg.users.forEach( function (uid) {
          callbacks.push(function (cb){
            User.findOne({_id: uid})
              .then(function (userModel){
                cb(null, userModel);
              });
          });
        });

        async.parallel(callbacks, function (err, results){
          res.send({users: results, name: foundOrg.name, code: foundOrg.code});
        });
      }
    });
});

/*
This catch-all route is needed because we are handling routing on
the client side. If a user refreshes the page, or goes to a specific url,
we serve up the index.html. This effectively reloads the entire app, but
the Router component (its history prop) will read the url and know which
components to render. There was a bug when trying to handle the /org/orgName
route, since the index was then looking for bundle.js at {directory}/org/bundle.js.
So, we added a hacky fix that looks to see if the req url is org/bundle.js, and 
if it is we serve up the bundle. You may need to better fix this if you end up
having more routes in your app, or the requests become more complicated.
*/
app.get('*', function (request, response){
  if (request.url === '/org/bundle.js') {
    response.sendFile(path.resolve(__dirname, '..', 'dist', 'bundle.js'));
  } else {
    response.sendFile(path.resolve(__dirname, '..', 'dist', 'index.html'));
  }
});

//
//  POST Routes
//

app.post('/api/signup', function (req, res, next) {
  User.addUser(req.body.username, req.body.password, req.body.email, 
    function (err, newUser){
      //Hacky thing to add user to org on init
      Org.addOrg("Hack Reactor", "hr34", function (org){
        Org.addUserToOrg(newUser._id, org.name);
      });
      //send back a valid token
      var token = jwt.encode(newUser, 'zinnober');
      res.send({user: newUser, token: token});
    }
  );
  // console.log(res);
});

app.post('/api/login', passport.authenticate('local'), function (req, res){
    var token = jwt.encode(req.user, 'zinnober');
    res.send({user: req.user, token: token});
  }
);

app.post('/api/createOrg', function (req, res, next) {
  var orgName = req.body.name;
  var orgCode = req.body.name.toLowerCase().split(' ').join('-');
  Org.addOrg(orgName, orgCode, function (err, newOrg){
    res.send(newOrg);
  });
});

//
//  Server Start
//

app.listen(port);
console.log('Server now listening on port ' + port);
