var chai = require('chai');
var expect = chai.expect;
var assert = chai.assert;
/**
  db 
  ./node_modules/mocha/bin/mocha server/test/push.dtl.model.test.js 
**/
const PushDtl = require("../models/push.dtl.model");
describe('Connection', function() {
   it('create push dtl', function (done) {
    var push = {
      target_id: ''
    };
    PushDtl.create(push, (err, data) => {
      assert.isNotNull(data);
      done()
    });
  });

  it('find all', function (done) {
    PushDtl.getAll((err, data) => {
      assert.isTrue(data.length > 0);
      done()
    });
  });

  it('find one', function (done) {  
    PushDtl.getAll((err, data) => {
      var result = data[0];
      PushDtl.findById(result.id, (err, data) => {
        assert.isNotNull(data);
        done()
      });
    });
  });

  it('update user', function (done) {
    PushDtl.getAll((err, data) => {
      var result = data[0];
      result.target_id = 'target_update';
      PushDtl.updateById(result.id, result, (err, data) => {
        assert.equal(data.target_id, 'target_update');
        done()
      });
    });
  });

  it('delete user', function (done) {
    PushDtl.getAll((err, data) => {
      result = data[0];
      PushDtl.remove(result.id, (err, data) => {
        done()
      });
    });
  });

  it('find all finish', function (done) {
    PushDtl.getAll((err, data) => {
      console.log("getAll : " + data);
      done()
    });
  });
});