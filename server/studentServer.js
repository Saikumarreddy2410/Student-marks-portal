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

app.get("/student/get", (err, res) => {
  const sqlGet = "SELECT * FROM student";
  db.query(sqlGet, (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });
    return res.json(result);
  });
});

// Create data

app.post(`/student/create`, (req, res) => {
  // console.log(req.body);
  const { studentname, studentclass } = req.body;
  const sqlInsert =
    "INSERT INTO student (`studentname`, `studentclass`) VALUES (?,?)";

  db.query(sqlInsert, [studentname, studentclass], (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});

// Delete Data according to StudentId

app.delete("/student/remove/:studentid", (req, res) => {
  const { studentid } = req.params;
  const sqlRemove = "DELETE FROM student WHERE studentid = ?";

  db.query(sqlRemove, studentid, (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});

// View Data according to StudentId

app.get("/student/view/:studentid", (req, res) => {
  const { studentid } = req.params;
  const sqlGet = "SELECT * FROM student WHERE studentid = ?";
  db.query(sqlGet, [studentid], (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

// Update

app.get("/student/get/:studentid", (req, res) => {
  const { studentid } = req.params;
  const sqlGet = "SELECT * FROM student WHERE studentid = ?";
  db.query(sqlGet, [studentid], (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

app.put("/student/update/:studentid", (req, res) => {
  const { studentid } = req.params;
  const { studentname, studentclass } = req.body;
  const sqlUpdate =
    "UPDATE student SET studentname = ?, studentclass = ? WHERE studentid = ?";

  db.query(sqlUpdate, [studentname, studentclass, studentid], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Student Server update Error");
    } else {
      res.send(result);
    }
  });
});

// Default Data

// app.get("/student/get", (req, res) => {
//   const sqlInsert =
//     "INSERT INTO student (studentname,studentclass) VALUES ('Saikumar','2'),('Imran','3'),('Azhar','1',('Jaswanth','5'),('srikanth','6'),('rajkumar','10'),('sandeep','12'),('deva','10'),('raghu','8'),('jagadesh','9'))";
//   db.query(sqlInsert, (err, result) => {
//     console.log("err", err);
//     console.log("result", result);
//     res.send(result);
//   });
// });

app.listen(8000, () => {
  console.log("Student server....");
});
