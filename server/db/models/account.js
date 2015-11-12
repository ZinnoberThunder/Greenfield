var mongoose = require('mongoose');

var accountSchema = mongoose.Schema({
  name: { type: String, required: true },
  url: { type: String, required: true }
});

var Account = mongoose.model('Account', accountSchema);

module.exports = Account;
