var sinon = require('sinon');
var chai = require('chai')
var expect = chai.expect;
var chaiHttp = require('chai-http');
var mongoose = require('mongoose');
var db = require('./../server/db/config')
var User = require('./../server/db/models/User');
var Org = require('./../server/db/models/Org');
var Account = require('./../server/db/models/Account');

chai.use(chaiHttp);

describe('HTTP', function() {

  var server = 'http://localhost:8000/';

  describe('#get', function() {
    it('should get /', function (done) {
      chai.request(server)
        .get('/')
        .then(function (res) {
          expect(res).to.have.status(200);
        })
        .catch(function (err) {
          throw err;
        })
      done();
    })
  });

  describe('#post', function() {
    it('should login to /api/login', function (done) {
      var agent = chai.request.agent(server)
      agent
        .post('/api/login')
        .send({ username: 'testUser', password: 'testPass' })
        .then(function (res) {
          expect(res).to.have.cookie('sessionid');
          // return agent.get('/')
          //   .then(function (res) {
          //      expect(res).to.have.status(200);
          //   })
        })
      done();
    })
  })

})

describe('User', function() {

  var data = {
        username: 'testUser',
        password: 'testPass',
        email: 'ceverett@gmail.com'
      };

  describe('#create', function () {
    before(function (done) {
      User.remove({ username: data.username }, function (err) {
        if (err) {
          done(err);
        }
      });
      done();
    })

    it('should create user', function (done) {
      var user = new User(data);
      user.save(function (err, user) {
        if (err) {
          done(err);
        }
        expect(user.email).to.equal(data.email);
        done();
      })
    })
  })

  describe('#find', function () {
    it('finds a user by username', function (done) {
      User.findOne({ username: data.username }, function(err, user) {
        expect(user.username).to.eql(data.username);
        done();
      });
    });
  })


});

describe('Org', function() {

  var data = {
        name: 'testOrg'
      };

  describe('#create', function () {
    before(function (done) {
      Org.remove({ name: data.name }, function (err) {
        if (err) {
          done(err);
        }
      });
      done();
    })

    it('should create org', function (done) {
      var org = new Org(data);
      org.save(function (err, org) {
        if (err) {
          done(err);
        }
        expect(org.name).to.equal(data.name);
        done();
      })
    })
  })

  describe('#find', function () {
    it('finds an org by name', function (done) {
      Org.findOne({ name: data.name }, function(err, org) {
        expect(org.name).to.eql(data.name);
        done();
      });
    });
  })
});

describe('Account', function() {

  var data = {
        username: 'testUser',
        name: 'facebook',
        url: 'http://facebook.com/testUser'
      };

  describe('#create', function () {
    before(function (done) {
      Account.remove({ username: data.username }, function (err) {
        if (err) {
          done(err);
        }
      });
      done();
    })

    it('should create account', function (done) {
      var acct = new Account(data);
      acct.save(function (err, acct) {
        if (err) {
          done(err);
        }
        expect(acct.name).to.equal(data.name);
        done();
      })
    })
  })

  describe('#find', function () {
    it('finds an account by username', function (done) {
      Account.findOne({ username: data.username }, function(err, acct) {
        expect(acct.username).to.eql(data.username);
        done();
      });
    });

    it('finds all accounts by username', function (done) {
      Account.find({ username: data.username }, function(err, accts) {
        expect(accts.length).to.eql(1);
        done();
      });
    });
  })
});

//
// Command line setup for testing
//
// var sinon = require('sinon');
// var chai = require('chai')
// var expect = chai.expect;
// var chaiHttp = require('chai-http');
// var db = require('./server/db/config')
// var User = require('./server/db/models/User');
// var Org = require('./server/db/models/Org');
// var Account = require('./server/db/models/Account');
// var udata = {username: 'testUser',password: 'testPass',email: 'ceverett@gmail.com'};





