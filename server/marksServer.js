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

// Get Marks

app.get("/marks/get", (req, res) => {
  const sqlGet = `SELECT teacher.teacherid,student.studentid,student.studentname,student.studentclass,teacher.teachername,teacher.subject,marks.marks,marks.marksid
  FROM marks
   JOIN student ON marks.studentid = student.studentid  
   JOIN teacher ON marks.teacherid = teacher.teacherid`;
  db.query(sqlGet, (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});

// Delete data

app.delete("/marks/remove/:marksid", (req, res) => {
  const { marksid } = req.params;
  const sqlRemove = "DELETE FROM marks WHERE marksid=?";

  db.query(sqlRemove, marksid, (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});

// Create Data
app.post("/marks/create", (req, res) => {
  const {
    studentid,
    studentname,
    studentclass,
    teacherid,
    teachername,
    subject,
    marks,
  } = req.body;
  const sqlInsert =
    "INSERT INTO marks (`studentid`,`studentname`,`studentclass`,`teacherid`,`teachername`,`subject`,`marks`) VALUES (?,?,?,?,?,?,?)";

  db.query(
    sqlInsert,
    [
      studentid,
      studentname,
      studentclass,
      teacherid,
      teachername,
      subject,
      marks,
    ],
    (err, result) => {
      if (err) return res.json(err);
      return res.json(result);
    }
  );
});

// Marks View

app.get("/marks/view/:marksid", (req, res) => {
  const { marksid } = req.params;

  const sqlGet = "SELECT * FROM marks WHERE marksid = ?";
  db.query(sqlGet, [marksid], (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

// update the Marks

app.get("/marks/get/:marksid", (req, res) => {
  const { marksid } = req.params;

  const sqlGet = "SELECT * FROM marks WHERE marksid = ?";
  db.query(sqlGet, [marksid], (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

app.put("/marks/update/:marksid", (req, res) => {
  const { marksid } = req.params;
  const { marks } = req.body;
  const sqlUpdate = "UPDATE marks SET  marks = ? WHERE marksid = ?";

  db.query(sqlUpdate, [marks, marksid], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Marks Server update Error");
    } else {
      res.send(result);
    }
  });
});

app.get("/", (req, res) => {
  // const sqlInsert =
  //   "INSERT INTO marks (studentid,studentname,studentclass,teacherid,teachername,subject,marks) VALUES (24,'azhar',6,7,'Rahul','Telugu',93)";
  // db.query(sqlInsert, (err, result) => {
  //   console.log("err", err);
  //   console.log("result", result);
  //   res.send(result);
  // });
});

app.listen(8002, () => {
  console.log("Marks server.....");
});
