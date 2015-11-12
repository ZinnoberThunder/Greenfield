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
