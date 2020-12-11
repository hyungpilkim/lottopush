const User = require("../models/user.model");
const Response = require("./response.result");






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

