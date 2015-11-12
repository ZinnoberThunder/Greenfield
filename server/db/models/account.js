//
// Exports:
// 
// Account
//  .addAccount( username, accountName, url )  -->  returns true
//  .getUserAccounts( username )  -->  returns array of accounts
//


var mongoose = require('mongoose');

var accountSchema = mongoose.Schema({
  username: { type: String }, 
  name: { type: String, required: true },
  url: { type: String, required: true }
});

var Account = mongoose.model('Account', accountSchema);

module.exports = Account;

module.exports.addAccount = function (username, accountName, url) {

  // addAccount('ceverett', 'facebook', 'https://www.facebook.com/nahash411')
  // addAccount('ceverett', 'linkedin', 'https://www.linkedin.com/in/ceverett')

  // Should we store OAuth token here?
  // Returning true - should this be something else?
  // Can we use default URLs?

  var newAcct = new Account({
    username: username,
    name: accountName,
    url: url
  });

  newAcct.save(function (err, newAcct) {
    if (err) {
      throw err;
    } else {
      return true;
    }
  });
}

module.exports.getUserAccounts = function (username) {

  // This is returning an array of objects

  var accounts = [];
  Account.find({ username: username }).exec(function (err, results) {
    results.forEach(function (result) {
      accounts.push(result);
    })
  });
  return accounts;
};
