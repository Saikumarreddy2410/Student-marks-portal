import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "saikumar",
  database: "school",
});

// Get data From Db

app.get("/teacher/get", (req, res) => {
  const sqlGet = "SELECT * FROM TEACHER;";
  db.query(sqlGet, (err, result) => {
    res.send(result);
  });
});

// Create Teacher Data

app.post("/teacher/create", (req, res) => {
  const { teachername, subject } = req.body;
  const sqlInsert = "INSERT INTO TEACHER(`teachername`,`subject`) VALUES(?,?)";
  db.query(sqlInsert, [teachername, subject], (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});

// Delete data

app.delete("/teacher/remove/:teacherid", (req, res) => {
  const { teacherid } = req.params;
  const sqlRemove = "DELETE FROM teacher WHERE teacherid=?";

  db.query(sqlRemove, teacherid, (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});

// View Teacher data

app.get("/teacher/read/:teacherid", (req, res) => {
  const { teacherid } = req.params;

  const sqlGet = "SELECT * FROM teacher WHERE teacherid=?";

  db.query(sqlGet, [teacherid], (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

// Get Update Data

app.get("/teacher/get/:teacherid", (req, res) => {
  const { teacherid } = req.params;
  const sqlGet = "SELECT * FROM teacher WHERE teacherid = ?";
  db.query(sqlGet, [teacherid], (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

app.put("/teacher/update/:teacherid", (req, res) => {
  const { teacherid } = req.params;
  const { teachername, subject } = req.body;
  const sqlUpdate =
    "UPDATE teacher SET teachername = ?, subject = ? WHERE teacherid = ?";

  db.query(sqlUpdate, [teachername, subject, teacherid], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Teacher Server update Error");
    } else {
      res.send(result);
    }
  });
});

app.get("/get", (req, res) => {
  // const sqlInsert =
  //   "INSERT INTO teacher (teachername,subject) VALUES ('Maha laxmi','science'),('rakesh','social')";
  // db.query(sqlInsert, (err, result) => {
  //   console.log("err", err);
  //   console.log("result", result);
  //   res.send(result);
  // });
});

app.listen(8001, () => {
  console.log("Teacher server....");
});
