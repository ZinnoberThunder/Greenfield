var expect = require('chai').expect;
var request = require('request');

var db = require('../server/db/config');
var User = require('../server/db/models/user');
var Org = require('../server/db/models/org');
var Account = require('../server/db/models/account');

describe('', function() {

  beforeEach(function() {
    User.removeUser('testUser');
  });

  describe('User creation:', function(){
    User.addUser('testUser', 'testPass', 'test@test.com')
  }

});
