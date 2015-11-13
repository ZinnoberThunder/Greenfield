var sinon = require('sinon');
var expect = require('chai').expect;

var mongoose = require('mongoose');
var db = require('./../server/db/config')
var User = require('./../server/db/models/User');
var Org = require('./../server/db/models/Org');
var Account = require('./../server/db/models/Account');

describe('User', function() {
  describe('#create', function () {

    var data = {
        username: 'testUser',
        password: 'testPass',
        email: 'ceverett@gmail.com'
      };

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
});

describe('Org', function() {
  describe('#create', function () {

    var data = {
        name: 'testOrg'
      };

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
});

describe('Account', function() {
  describe('#create', function () {

    var data = {
        username: 'testUser',
        name: 'facebook',
        url: 'http://facebook.com/testUser'
      };

    before(function (done) {
      Account.remove({ name: data.username }, function (err) {
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
});


// var db = require('./server/db/config')
// var User = require('./server/db/models/User');
