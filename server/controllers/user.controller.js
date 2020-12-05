const User = require("../models/user.model");
const Response = require("./response.result");


/**
 * for app
 */
exports.RegAndInfo = (req, res) => {
  //device token으로 조회
  console.log(res);

  if (!req.query['device_token']) {
    Response(res, Response.needparam, '');
    return;
  }

  console.log(req);
  if (!req.query['device_token']) {
    Response(res, Response.needparam, '');
    return;
  }

  User.findById(req.query['device_token'], (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        //insert defualt user 
        const user = new User({
          device_type: req.query['device_type'],
          device_token: req.query['device_token'],
          agreeYn: 'N'
        });

        User.create(user, (err, data) => {
          if (err)
          Response(res, Response.dberror, '');
          else {
            Response(res, Response.success, data);
          }
        });
      } else {
        Response(res, Response.notfound , '');
      }
    } else {
      Response(res, Response.success, data);
    }
  })
};

exports.updateUserInfo = (req, res) => {
  console.log(req);
  if (!req.body.device_token) {
    Response(res, Response.needparam, '');
    return;
  }

  User.findById(req.body.device_token, (err, data) => {
    if (err) {
      Response(res, Response.notfound, '');
    } else {
      const userParam = new User({
        device_type: req.body.device_type,
        device_token: req.body.device_token,
        agreeYn: req.body.agreeYn
      });

      User.updateById(
        userParam,
        (err, data) => {
          if (err) {
            Response(res, Response.notfound, '');
          } else res.send(data);
        }
      );
    }
  })
};


exports.findAll = (req, res) => {
  User.getAll((err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        Response(res, Response.notfound, '');
      } 
    } else {
      Response(res, Response.success, data);
    }
  })
};

