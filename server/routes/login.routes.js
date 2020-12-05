var express = require("express");
var app = express.Router();

const user = require("../controllers/login.controller");

app.post("/login", user.login);
app.post("/logout", user.logout);

module.exports = app;
