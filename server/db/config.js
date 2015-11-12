var mongoose = require('mongoose');

// Heroku env variable MONGOLAB_URI contents:
// USER - heroku_ckstvjx8
// PASS - fqfk4lnicjbtgoc8fosu2oplvf
// ADDR - ds053774.mongolab.com
// PORT - 53774
// DB - heroku_ckstvjx8

mongoURI = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/zthunder';
mongoose.connect(mongoURI);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

module.exports = db;
