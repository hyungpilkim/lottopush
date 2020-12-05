var express = require("express");
var app = express.Router();

const user = require("../controllers/user.controller");
  
/**
 * for app 
 */
app.get("/RegAndInfo", user.RegAndInfo);
app.post("/updateUserInfo", user.updateUserInfo);

/**
 * for admin
 */
app.get("/", user.findAll);

module.exports = app;
