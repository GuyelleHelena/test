import express from "express";
import taskRoutes from "./routes/taskRoutes.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors()); // autorise les requêtes cross-origin
app.use(express.json()); // parse le JSON

// Routes
app.use("/api", taskRoutes); // /api/tasks, /api/tasks/:id, etc.

// Route de test
app.get("/", (_req, res) => {
  res.send("Bienvenue sur l’API de gestion des tâches !");
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});
