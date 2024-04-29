const express = require("express");
const app = express();
const PORT = process.env.PORT || 3005;

app.use(express.json());

// In-memory data store for tasks
let tasks = [
  {
    id: 1,
    title: "Create a new project",
    description: "Create a new project using Magic",
    completed: false,
  },
  {
    id: 2,
    title: "Create a new project",
    description: "Create a new project using Magic",
    completed: false,
  },
  {
    id: 3,
    title: "Create a new project",
    description: "Create a new project using Magic",
    completed: false,
  },
];

// Task schema
const Task = {
  id: Number,
  title: String,
  description: String,
  completed: Boolean,
};

// Route to retrieve all tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// Route to retrieve a single task by its ID
app.get("/tasks/:id", (req, res) => {
  var taskId = req.params["id"];
  const task = tasks.find((task) => task.id == taskId);
  if (task == null) {
    res.status(404).json({ error: "Taskid not found" });
  } else {
    res.json(task);
  }
});

// Route to create a new task
app.post("/tasks", (req, res) => {
  const { title, description, completed } = req.body;
  if (!title || !description || typeof completed !== "boolean") {
    res.status(400).json({ error: "Invalid task data" });
  } else {
    const newTask = {
      id: tasks.length + 1,
      title,
      description,
      completed,
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
  }
});

// Route to update an existing task by its ID
app.put("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex((task) => task.id === taskId);
  if (taskIndex === -1) {
    res.status(404).json({ error: "Task not found" });
  } else {
    const { title, description, completed } = req.body;
    if (!title || !description || typeof completed !== "boolean") {
      res.status(400).json({ error: "Invalid task data" });
    } else {
      tasks[taskIndex] = { ...tasks[taskIndex], title, description, completed };
      res.json(tasks[taskIndex]);
    }
  }
});

// Route to delete a task by its ID
app.delete("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  tasks = tasks.filter((task) => task.id !== taskId);
  res.status(204).send();
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
