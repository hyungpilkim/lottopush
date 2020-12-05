var chai = require('chai');
var expect = chai.expect;
var assert = chai.assert;
/**
  db 
  ./node_modules/mocha/bin/mocha server/test/push.model.test.js 
**/
const Push = require("../models/push.model");
describe('Connection', function() {
  it('create user', function (done) {
   var push = {id: '',
   title: 'test_title',
   body: 'test_body',
   reg_dt: Date.now(),
   result: 'test_result'};
   Push.create(push, (err, data) => {
     assert.isNotNull(data);
     done()
   });
 });

 it('find all', function (done) {
   Push.getAll((err, data) => {
     assert.isTrue(data.length > 0);
     done()
   });
 });

 it('find one', function (done) {  
   // Save Push in the database
   Push.getAll((err, data) => {
     var result = data[0];
     Push.findById(result.id, (err, data) => {
       assert.isNotNull(data);
       done()
     });
   });
 });

 it('update ', function (done) {
   // Save Push in the database
   Push.getAll((err, data) => {
     var result = data[0];
     result.title = 'title_update';
     Push.updateById(result.id, result, (err, data) => {
       assert.equal(data.title, 'title_update');
       done()
     });
   });
 });

 it('delete ', function (done) {
   Push.getAll((err, data) => {
     var result = data[0];
     Push.remove(result.id, (err, data) => {
       done()
     });
   });
 });

 it('find all finish', function (done) {
   Push.getAll((err, data) => {
     console.log("getAll : " + data);
     done()
   });
 });
});