const express = require("express");
const mysql = require("mysql");

const app = express();

//Create connection
const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "crud_db",
});

//connect to database
conn.connect((err) => {
  if (err) throw err;
  console.log("Mysql Connected...");
});

//get classroom details
app.get("/getClassRoomDetails/:classId", (req, res) => {
  let classId = req.params["classId"];
  let sql = "SELECT * FROM ClassRoom WHERE CLASSID = '" + classId + "'";
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.render("ClassRoom_view", {
      results: results,
    });
  });
});

//update staffname
app.put("/updateStaffName/:staffName", (req, res) => {
  let staffName = req.params["staffName"];
  let sql =
    "UPDATE FACULTY SET staff_name='" +
    staffName +
    "', updated_at = SYSTIMESTAMP WHERE staff_name = '" +
    staffName +
    "'";
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.redirect("/");
  });
});

//insert subject data
app.post("/insertSubject/:subjectName", (req, res) => {
  let data = { subject_name: req.body.subject_name };
  let sql = "INSERT INTO subject values('" + req.params["subjectName"] + "')";
  let query = conn.query(sql, data, (err, results) => {
    if (err) throw err;
    res.redirect("/");
  });
});

//server listening
app.listen(8000, () => {
  console.log("Server is running at port 8000");
});
