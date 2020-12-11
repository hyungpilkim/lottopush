var express = require("express");
var app = express.Router();

const user = require("../controllers/user.controller");
  

/**
 * for admin
 */
app.get("/", user.findAll);

module.exports = app;
