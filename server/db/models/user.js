//
// Exports:
// 
// User
//  .addUser( username, password, email )  -->  new user id
//

var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  email: { type: String, required: true },
  orgs: { type: Array },
  accounts: { type: Array }
});

var User = mongoose.model('User', userSchema);

module.exports = User;

module.exports.addUser = function (username, password, email) {

  // var userId = addUser('ceverett', 'pass', 'ceverett@gmail.com')

  // Returning userID because it seems most useful

  var newUser = new User({
    username: username,
    password: password,
    email: email,
    orgs: [],
    accounts: []
  });

  newUser.save(function (err, newUser) {
    if (err) {
      throw err;
    } else {
      return newUser._id;
    }
  });
};
