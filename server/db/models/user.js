var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Q = require('q');
var SALT_WORK_FACTOR = 10;

//
// Exports:
// 
// User
//  .addUser( username, password, email )  -->  returns true
//

var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  email: { type: String, required: true },
  salt: { type: String },
  orgs: { type: Array },
  accounts: { type: Array }
});

userSchema.methods.comparePasswords = function (candidatePassword) {
  var defer = Q.defer();
  var savedPassword = this.password;
  bcrypt.compare(candidatePassword, savedPassword, function (err, isMatch) {
    if (err) {
      defer.reject(err);
    } else {
      defer.resolve(isMatch);
    }
  });
  return defer.promise;
};

userSchema.pre('save', function (next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) {
    return next();
  }

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) {
      return next(err);
    }

    // hash the password along with our new salt
    bcrypt.hash(user.password, salt, null, function (err, hash) {
      if (err) {
        return next(err);
      }

      // override the cleartext password with the hashed one
      user.password = hash;
      user.salt = salt;
      next();
    });
  });
});


var User = mongoose.model('User', userSchema);

module.exports = User;

module.exports.addUser = function (username, password, email, cb) {

  // var userId = addUser('ceverett', 'pass', 'ceverett@gmail.com')

  // Returning userID because it seems most useful

  var newUser = new User({
    username: username,
    password: password,
    email: email,
    orgs: [{name:'Hack Reactor 34', code: 'hr34'}],
    accounts: []
  });

  newUser.save(function (err, newUser) {
    if (err) {
      throw err;
    } else {
      cb(err, newUser);
    }
  });
};

module.exports.removeUser = function (username) {
  User.remove({ username: username }, function (err) {
    if (err) {
      throw err;
    }
  });
}

module.exports.getUser = function (username) {
  var user = [];
  User.findOne( { username: username } ).exec(function (err, result) {
    user.push(result);
  })
  return user;
}
