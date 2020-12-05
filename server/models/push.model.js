const sql = require("./db");

// constructor
const Push = function(push) {
  this.id = push.id;
  this.title = push.title;
  this.body = push.body;
};

Push.create = (newPush, result) => {
  for (const [key, value] of Object.entries(newPush)) {
    console.log(`${key}: ${value}`);
  }
  sql.query(`INSERT INTO push_mst (title, body, reg_dt) VALUES (?, ?, now())`, [newPush.title, newPush.body], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created push_mst: ", { id: res.insertId, ...newPush });
    result(null, { id: res.insertId, ...newPush });
  });
};

Push.findById = (pushId, result) => {
  sql.query(`SELECT * FROM push_mst WHERE id = ${pushId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found push_mst: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};

Push.getAll = result => {
  sql.query("SELECT * FROM push_mst", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("push_mst: ", res);
    result(null, res);
  });
};

Push.updateById = (id, push, result) => {
  sql.query(`UPDATE push_mst SET title = ?, body = ?, reg_dt = now(), result = ? WHERE id = ?`,
    [push.title, push.body, push.result, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found push_mst with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated push_mst: ", { id: id, ...push });
      result(null, { id: id, ...push });
    }
  );
};

Push.remove = (id, result) => {
  sql.query("DELETE FROM push_mst WHERE id = ?", id, (err, res) => {
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

    console.log("deleted push_mst with id: ", id);
    result(null, res);
  });
};

Push.removeAll = result => {
  sql.query("DELETE FROM push_mst", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} push_mst`);
    result(null, res);
  });
};

module.exports = Push;