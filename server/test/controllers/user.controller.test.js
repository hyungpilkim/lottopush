const chai = require('chai');
const chaiHttp = require('chai-http');
var expect = chai.expect;
var assert = chai.assert;

// Configure chai
chai.use(chaiHttp);
chai.should();

/**
  command
  ./node_modules/mocha/bin/mocha server/test/controllers/user.controller.test.js 
**/
const url = 'http://localhost:3002/api';
describe('api test', function() {

  it("user RegAndInfo", (done) => {
    chai.request(url)
    .get('/user/RegAndInfo')
    .query({device_token: 'device_token_test', device_type: 'A'})
    .end((err, res) => {
      console.log("status:" + res.status);
      console.log("body:" + JSON.stringify(res.body));
      assert.isTrue(res.status == 200);
      done();
    });
  });

  it("user updateUserInfo", (done) => {
    chai.request(url)
    .post('/user/updateUserInfo')
    .send({device_token: 'device_token_test', device_type: 'A', agreeYn: 'Y'})
    .end((err, res) => {
      console.log("status:" + res.status);
      console.log("body:" + JSON.stringify(res.body));
      assert.isTrue(res.status == 200);
      done();
    });
  });
});