var mongoose = require('mongoose');

var orgSchema = mongoose.Schema({
  users: { type: Array },
  admins: { type: Array }
});

var Org = mongoose.model('Org', orgSchema);

module.exports = Org;
