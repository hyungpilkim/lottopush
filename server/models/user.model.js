const sql = require("./db");

// constructor
const User = function(user) {
  this.device_token = user.device_token;
  this.device_type = user.device_type;
  this.agreeYn = user.agreeYn;
};

User.create = (newUser, result) => {
  sql.query("INSERT INTO lo_user (device_type, device_token, agreeYn, reg_dt) VALUES (?, ?, ?, now()) ", [newUser.device_type, newUser.device_token, newUser.agreeYn], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created user: ", { id: res.insertId, ...newUser });
    result(null, { id: res.device_token, ...newUser });
  });
};

User.findById = (device_token, result) => {
  sql.query("SELECT * FROM lo_user WHERE device_token = ?", [device_token], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};

User.getAll = result => {
  sql.query("SELECT * FROM lo_user", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("user: ", res);
    result(null, res);
  });
};

User.getUserWhereIn = (deviceTokens, result) => {
  console.log("getUserWhereIn input: ", deviceTokens);
  sql.query("SELECT * FROM lo_user where device_token in (?)", [deviceTokens], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("getUserWhereIn user: ", res);
    result(null, res);
  });
};

User.updateById = (user, result) => {
  sql.query(
    "UPDATE lo_user SET device_type = ?, agreeYn = ? WHERE device_token = ?",
    [user.device_type, user.agreeYn, user.device_token],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Customer with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated customer: ", { id: user.device_token, ...user });
      result(null, { id: user.device_token, ...user });
    }
  );
};

User.remove = (device_token, result) => {
  sql.query("DELETE FROM lo_user WHERE device_token = ?", device_token, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found user with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted user with id: ", device_token);
    result(null, res);
  });
};

User.removeAll = result => {
  sql.query("DELETE FROM lo_user", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} customers`);
    result(null, res);
  });
};

module.exports = User;