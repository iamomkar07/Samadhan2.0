
const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // serve frontend


let todos = [
  


app.get('/api/todos', (req, res) => {
  res.json(todos);
});


app.post('/api/todos', (req, res) => {
  const { text } = req.body;
  if (!text || !text.trim()) return res.status(400).json({ error: 'Text required' });
  const todo = { id: uuidv4(), text: text.trim(), done: false };
  todos.push(todo);
  res.status(201).json(todo);
});

app.put('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  const { text, done } = req.body;
  const t = todos.find(x => x.id === id);
  if (!t) return res.status(404).json({ error: 'Not found' });
  if (typeof text === 'string') t.text = text.trim();
  if (typeof done === 'boolean') t.done = done;
  res.json(t);
});

app.delete('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  const before = todos.length;
  todos = todos.filter(x => x.id !== id);
  if (todos.length === before) return res.status(404).json({ error: 'Not found' });
  res.status(204).end();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));
