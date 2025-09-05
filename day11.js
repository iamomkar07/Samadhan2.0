

const express = require("express");
const app = express();
app.use(express.json());

let students = []; // In-memory storage
let idCounter = 1;


app.post("/students", (req, res) => {
  const { name, age } = req.body;
  const newStudent = { id: idCounter++, name, age };
  students.push(newStudent);
  res.status(201).json(newStudent);
});

app.get("/students", (req, res) => {
  res.json(students);
});


app.get("/students/:id", (req, res) => {
  const student = students.find(s => s.id === parseInt(req.params.id));
  if (!student) return res.status(404).json({ message: "Student not found" });
  res.json(student);
});


app.put("/students/:id", (req, res) => {
  const student = students.find(s => s.id === parseInt(req.params.id));
  if (!student) return res.status(404).json({ message: "Student not found" });

  const { name, age } = req.body;
  student.name = name || student.name;
  student.age = age || student.age;

  res.json(student);
});


app.delete("/students/:id", (req, res) => {
  const index = students.findIndex(s => s.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Student not found" });

  const deletedStudent = students.splice(index, 1);
  res.json(deletedStudent[0]);
});

// Start server
app.listen(3000, () => {
  console.log("✅ Student CRUD API running on http://localhost:3000");
});
