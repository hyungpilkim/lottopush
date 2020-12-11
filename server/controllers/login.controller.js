
const Response = require("./response.result");
const User = require("../models/user.model");
let jwt = require("jsonwebtoken");
let jwtKey = require("../utils/jwt");
/**
 * for app
 */
exports.login = (req, res) => {
  var username = req.body.username;
  var password = req.body.password;

  if (!username || !password) {
    Response(res, Response.needparam, '');
    return;
  }
  
  if (username == 'admin' && password =='4321') {
    let token = jwt.sign({
      username: username   // 토큰의 내용(payload)
    },
    jwtKey.secret ,    // 비밀 키
    {
      expiresIn:  '120m'    // 유효 시간은 5분
    });

    Response(res, Response.success, token);
  } else {
    Response(res, Response.success, '');
  }
};

exports.logout = (req, res) => {
  var token = req.header.token;
  if (!token) {
    Response(res, '100', 'need param', '');
    return;
  }
  jwtr.destroy(token);
  Response(res, Response.success, '');
};


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
