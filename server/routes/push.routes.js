var express = require("express");
var app = express.Router();

const push = require("../controllers/push.controller");

/**
 * for admin
 */
//푸시 보내기 
app.post("/send", push.send);
//보낸 내역 
app.get("/history", push.history);
//보낸 내역 상세 
app.get("/historyDtl", push.historyDetail);

module.exports = app;
