const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let students = [
  { id: 1, name: "Rahul", email: "rahul@example.com" },
  { id: 2, name: "Priya", email: "priya@example.com" }
];

app.get("/students", (req, res) => {
  res.json(students);
});

app.post("/students", (req, res) => {
  const { name, email } = req.body;
  const newStudent = { id: students.length + 1, name, email };
  students.push(newStudent);
  res.json(newStudent);
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
