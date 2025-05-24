import express from "express";
import { Task, TaskStatus, TaskPriority } from "../model/task.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { body, param, validationResult } from "express-validator";
import { authenticate } from "../middleware/authMiddleware.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();
const pathToFile = path.join(__dirname, "../data/tasks.json");

const readTasks = () => {
  if (!fs.existsSync(pathToFile)) return [];
  return JSON.parse(fs.readFileSync(pathToFile, "utf8"));
};

const writeTasks = (tasks) => {
  fs.writeFileSync(pathToFile, JSON.stringify(tasks, null, 2));
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });
  next();
};

// Toutes les routes sont protégées par le middleware
router.use(authenticate);

// Créer une tâche
router.post(
  "/tasks",
  [
    body("title").isString().notEmpty(),
    body("description").isString().optional(),
    body("status").isIn(Object.values(TaskStatus)),
    body("priority").isIn(Object.values(TaskPriority)),
    body("dueDate").isString(),
    validate,
  ],
  (req, res) => {
    const { title, description, status, priority, dueDate } = req.body;
    const task = new Task(title, description, status, priority, dueDate);
    const tasks = readTasks();
    tasks.push(task);
    writeTasks(tasks);
    res.status(201).json(task);
  }
);

// Lire toutes les tâches
router.get("/tasks", (_req, res) => {
  const tasks = readTasks();
  if (tasks.length === 0)
    return res.status(404).json({ message: "No tasks found" });
  res.status(200).json(tasks);
});

// Lire une tâche par ID
router.get("/tasks/:id", [param("id").isUUID(), validate], (req, res) => {
  const { id } = req.params;
  const task = readTasks().find((t) => t.id === id);
  if (!task) return res.status(404).json({ message: "Task not found" });
  res.status(200).json(task);
});

// Modifier une tâche
router.put(
  "/tasks/:id",
  [
    param("id").isUUID(),
    body("name").optional().isString(),
    body("description").optional().isString(),
    body("status").optional().isIn(Object.values(TaskStatus)),
    body("priority").optional().isIn(Object.values(TaskPriority)),
    body("dueDate").optional().isISO8601().toDate(),
    validate,
  ],
  (req, res) => {
    const { id } = req.params;
    const tasks = readTasks();
    const index = tasks.findIndex((t) => t.id === id);
    if (index === -1)
      return res.status(404).json({ message: "Task not found" });

    tasks[index] = { ...tasks[index], ...req.body, updatedAt: new Date() };
    writeTasks(tasks);
    res.status(200).json(tasks[index]);
  }
);

// Supprimer une tâche
router.delete("/tasks/:id", [param("id").isString(), validate], (req, res) => {
  const { id } = req.params;
  const tasks = readTasks();
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) return res.status(404).json({ message: "Task not found" });

  tasks.splice(index, 1);
  writeTasks(tasks);
  res.status(204).send();
});

export default router;
