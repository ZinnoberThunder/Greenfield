var express = require('express');
var app = express();
var port = process.env.PORT || 8000;

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

// /signup  --  POST
app.post('/api/signup', function (req, res, next) {
  console.log('Signup data: ' + req.body);
});

// /login  --  POST
app.post('/api/login', function (req, res, next) {
  console.log('Login data: ' + req.body);
});

// /createOrg  --  POST
app.post('/api/createOrg', function (req, res, next) {
  console.log('New Org data: ' + req.body);
});

app.listen(port);
console.log('Server now listening on port ' + port);
