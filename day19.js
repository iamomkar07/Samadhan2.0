const express = require("express");
const app = express();
const PORT = 3000;

let posts = []; // in-memory posts

app.use(express.json());
app.use(express.static("public"));

// Get all posts
app.get("/api/posts", (req, res) => {
  res.json(posts);
});

// Create a new post
app.post("/api/posts", (req, res) => {
  const post = {
    id: Date.now(),
    user: req.body.user || "Anonymous",
    content: req.body.content,
    likes: 0
  };
  posts.unshift(post); // newest on top
  res.json(post);
});

// Like a post
app.post("/api/posts/:id/like", (req, res) => {
  const post = posts.find(p => p.id == req.params.id);
  if (post) {
    post.likes++;
    res.json(post);
  } else {
    res.status(404).json({ error: "Post not found" });
  }
});

app.listen(PORT, () => console.log(`Server running → http://localhost:${PORT}`));
