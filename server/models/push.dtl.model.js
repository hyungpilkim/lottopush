const sql = require("./db");

// constructor
const PushDtl = function(pushdtl) {
  this.push_id = pushdtl.push_id;
  this.token = pushdtl.token;
  this.result = pushdtl.result;
};

PushDtl.create = (newPushDtl, result) => {
  sql.query("INSERT INTO push_dtl (push_id, token, reg_dt, result) VALUES (?, ?, now(), ?)", [newPushDtl.push_id, newPushDtl.token, newPushDtl.result], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created push: ", { id: res.insertId, ...newPushDtl });
    result(null, { id: res.insertId, ...newPushDtl });
  });
};

PushDtl.findByPushId = (pushId, result) => {
  sql.query(`SELECT * FROM push_dtl WHERE push_id = ${pushId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found push_dtl: ", res);
      result(null, res);
      return;
    }

    // not found push_dtl with the id
    result({ kind: "not_found" }, null);
  });
};

PushDtl.getAll = result => {
  sql.query("SELECT * FROM push_dtl", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("push_dtl: ", res);
    result(null, res);
  });
};

PushDtl.updateById = (id, pushdtl, result) => {
  sql.query(
    "UPDATE push_dtl SET target_id = ? WHERE id = ?",
    [pushdtl.target_id, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found pushdtl with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated pushdtl: ", { id: id, ...pushdtl });
      result(null, { id: id, ...pushdtl });
    }
  );
};

PushDtl.remove = (id, result) => {
  sql.query("DELETE FROM push_dtl WHERE id = ?", id, (err, res) => {
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

    console.log("deleted push_dtl with id: ", id);
    result(null, res);
  });
};

PushDtl.removeAll = result => {
  sql.query("DELETE FROM push_dtl", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} push_dtl`);
    result(null, res);
  });
};

module.exports = PushDtl;