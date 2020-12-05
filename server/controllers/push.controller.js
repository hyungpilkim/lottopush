const PushDB = require("../models/push.model");
const PushDtlDB = require("../models/push.dtl.model");
const User = require("../models/user.model");
const FireBasePush = require("../firebase/push");
const { json } = require("body-parser");
const Response = require("./response.result");

/**
 * param :  userIds, title, body
 */
exports.send = (req, res) => {
  // Validate request
  if (!req.body) {
    ResponseResult(res, Response.needparam, "")
    return;
  }
  console.log(req);
  console.log("title : " + req.body.userIds);
  console.log("title : " + req.body.title);
  console.log("body : " + req.body.body);

  if (!req.body.userIds || !req.body.title || !req.body.body) {
    Response(res, Response.needparam, "")
    return;
  }

  User.getUserWhereIn(req.body.userIds, (err, data) => {
    if (data.length > 0) {
      //push_mst insert 
      var push = {
        title: req.body.title,
        body: req.body.body
      };
      var insert_id =""
      PushDB.create(push, (err, data) => {
        console.log("push db " + JSON.stringify(data));
        insert_id = data.id;
      });

      data.forEach(function(user) {
        var result =  FireBasePush.sendMessage(user.device_token, req.body.title, req.body.body);
        result.then((response) => {
          var pushDtl = {
            push_id: insert_id,
            token: user.device_token,
            result: JSON.stringify(response),
          };

          PushDtlDB.create(pushDtl, (err, data) => {});
          console.log("Successfully sent message:", response);
          if (response.failureCount > 0) {
            if (response.results != null && response.results[0].error.code == "messaging/invalid-registration-token" ) {
              //delete token 
              User.remove(user.device_token, (err, data) => {
              });
            }
          }
        })
        .catch((error) => {
          console.log("Error sending message:", error);
        });
      })

      Response(res, Response.success, '')
    } else {
      Response(res, Response.notfound, '')
    }
  });
};

exports.history = (req, res) => {
  PushDB.getAll((err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        Response(res, Response.notfound, '');
      } 
    } else {
      Response(res, Response.success, data);
    }
  })
};

/**
 * param : push_id
 */
exports.historyDetail = (req, res) => {
  if (!req.query['push_id']) {
    Response(res, Response.needparam, '');
    return;
  }

  PushDtlDB.findByPushId(req.query['push_id'], (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        Response(res, Response.notfound, '');
      } 
    } else {
      Response(res, Response.success, data);
    }
  })
};