var express = require("express");
var app = express.Router();

const user = require("../controllers/login.controller");

app.post("/login", user.login);
app.post("/logout", user.logout);
app.get("/RegAndInfo", user.RegAndInfo);
app.post("/updateUserInfo", user.updateUserInfo);

module.exports = app;
