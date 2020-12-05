const chai = require('chai');
const chaiHttp = require('chai-http');
var expect = chai.expect;
var assert = chai.assert;

// Configure chai
chai.use(chaiHttp);
chai.should();

/**
  command
  ./node_modules/mocha/bin/mocha server/test/controllers/push.controller.test.js 
**/
const url = 'http://localhost:3002/api';
describe('api test', function() {
  // it("user /", (done) => {
  //   chai.request(url)
  //   .get('/user')
  //   .end((err, res) => {
  //     console.log("status:" + res.status);
  //     console.log("body:" + JSON.stringify(res.body));
  //     assert.isTrue(res.status == 200);
  //     done();
  //   });
  // });

  // it("push/send", (done) => {
  //   chai.request(url)
  //   .get('/user/RegAndInfo')
  //   .query({device_token: 'device_token_test', device_type: 'A'})
  //   .end((err, res) => {
  //     console.log("status:" + res.status);
  //     console.log("body:" + JSON.stringify(res.body));
  //     assert.isTrue(res.status == 200);
  //     done();
  //   });
  // });

  it("push/send", (done) => {
    chai.request(url)
    .post('/push/send')
    .send({userIds: ['dbobJcPiR6OMuEcuhOFA5u:APA91bGSjJovhQmgQ3qz4sl33-gbABMnvEuBus2a55Ir9KW6d1l9FQp5J50maAf_OGtb28T9fcdCVhKzmDW816_m_yNlwfYafYy-ceIsMvbKzgFrW6iMXNS8p-VojNC_mf9ZGt9GBbD7', 'android_test'], title: 'titlereact', body: 'body3'})
    .end((err, res) => {
      console.log(res);
      console.log("status:" + res.status);
      console.log("body:" + JSON.stringify(res.body));
      assert.isTrue(res.status == 200);
      done();
    });
  });
});