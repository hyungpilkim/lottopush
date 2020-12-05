
const Response = require("./response.result");
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
