var mongoose = require('mongoose');

var orgSchema = mongoose.Schema({
  name: { type: String, required: true, index: { unique: true } },
  users: { type: Array },
  admins: { type: Array }
});

var Org = mongoose.model('Org', orgSchema);

module.exports = Org;
