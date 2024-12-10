const express = require("express");

const app = express();
app.use(express.json());

let todos = [];
let id = 0;

app.get("/todos", (req, res) => {
  res.send(todos);
});

app.post("/todos", (req, res) => {
  title = req.query.title;
  description = req.query.description;
  done = req.query.done;
  id++;
  let todo = {
    id: id,
    title: title,
    description: description,
    done: done,
  };
  todos.push(todo);
  res.send(todos);
});

app.put("/todos", (req, res) => {
  id = req.query.id;
  title = req.query.title;
  const todo = todos.find((item) => item.title === title);
  todo.done = !todo.done;
  res.send(todo);
});

app.delete("/todos", (req, res) => {
  const id = parseInt(req.query.id);
  const index = todos.findIndex((item) => item.id === id);
  if (index !== -1) {
    todos.splice(index, 1);
    res.send("Todo item deleted successfully.");
  } else {
    res.status(404).send("No item found with that ID.");
  }
});

app.listen(3000, () => {
  console.log("Todos app is listening on port: 3000...");
});
