const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let todos = [
  { id: 1, task: "Learn Node.js", done: false },
  { id: 2, task: "Build To-Do App", done: true },
];

app.get("/todos", (req, res) => {
  res.json(todos);
});

app.post("/todos", (req, res) => {
  const newTodo = {
    id: todos.length + 1,
    task: req.body.task,
    done: false,
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

app.put("/todos/:id", (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).send("Todo not found");
  
  todo.done = req.body.done;
  res.json(todo);
});

app.delete("/todos/:id", (req, res) => {
  todos = todos.filter(t => t.id !== parseInt(req.params.id));
  res.send("Todo deleted successfully");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
