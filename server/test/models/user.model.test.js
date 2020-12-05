var chai = require('chai');
var expect = chai.expect;
var assert = chai.assert;
/**
  db 
  mocha server/test/models/user.model.test.js 
**/
const User = require("../../models/user.model");
describe('Connection', function() {
  
   it('create user', function (done) {
    var user = {
      device_type: 'A',
      device_token: 'Aasdfasdf',
      agreeYn: 'Y'
    };

    User.create(user, (err, data) => {
      done()
    });  
  });

  it('find all', function (done) {
    User.getAll((err, data) => {
      assert.isTrue(data.length > 0);
      console.log("getAll : " + data);
      done()
    });
  });

  it('find one', function (done) {  
    User.getAll((err, data) => {
      result = data[0];
      User.findById(result.device_token, (err, data) => {
        console.log("findById : " + data);
        done()
      });
    });
  });

  it('update user', function (done) {
    User.getAll((err, data) => {
      var result = data[0];
      result.agreeYn  = 'N';
      User.updateById(result.device_token, result, (err, data) => {
        assert.equal(data.agreeYn, 'N');
        done()
      });
    });
  });

  it('delete user', function (done) {
    User.getAll((err, data) => {
      var result = data[0];
      User.remove(result.device_token, (err, data) => {
        done()
      });
    });
  });

  it('find all finish', function (done) {
    User.getAll((err, data) => {
      console.log("getAll : " + data);
      done()
    });
  });
});