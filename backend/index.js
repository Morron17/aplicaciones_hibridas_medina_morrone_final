import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import humanRoutes from "./routes/HumanRoutes.js";
import infectedRoutes from "./routes/InfectedRoutes.js";
import userRoutes from "./routes/UserRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use( cors());

app.get("/", (req, res) => {
  res.send(`
   <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>The Last of Us API</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          background: #1b1b1b;
          color: #eee;
          text-align: center;
        }
        header {
          background: #2d2d2d;
          padding: 20px;
        }
        h1 {
          margin: 0;
          color: #76c893;
        }
        p {
          font-size: 18px;
          margin: 10px 0 20px;
        }
        .endpoints {
          display: flex;
          justify-content: center;
          gap: 20px;
          flex-wrap: wrap;
          margin: 20px auto;
          max-width: 800px;
        }
        .card {
          background: #2a2a2a;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0px 4px 8px rgba(0,0,0,0.4);
          width: 220px;
          transition: transform 0.2s;
        }
        .card:hover {
          transform: scale(1.05);
        }
        .card a {
          text-decoration: none;
          color: #76c893;
          font-weight: bold;
        }
        footer {
          margin-top: 40px;
          padding: 15px;
          background: #2d2d2d;
          font-size: 14px;
        }
      </style>
    </head>
    <body>
      <header>
        <h1>🌿 The Last of Us API</h1>
        <p>Bienvenido a la API de humanos e infectados</p>
      </header>
      <main>
        <div class="endpoints">
          <div class="card">
            <h3>👤 Usuarios</h3>
            <a href="/api/users">Usuario</a>
          </div>
          <div class="card">
            <h3>🧍 Humanos</h3>
            <a href="/api/humans">Humanos</a>
          </div>
          <div class="card">
            <h3> Infectados</h3>
            <a href="/api/infecteds">Infectados</a>
          </div>
        </div>
      </main>
      <footer>
        <p>Alumnos: Santiago Medina y Tomas Morrone.</p>
        <p>Materia: Aplicaciones Híbridas.</p>
        <p>Docente: Jonatahan Emanuel Cruz.</p>
        <p>Comisión: DWM3AP.</p>
      </footer>
    </body>
    </html>
  `);
});

app.use("/api/auth", authRoutes);

app.use("/api/users", userRoutes);
app.use("/api/humans", humanRoutes);
app.use("/api/infecteds", infectedRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));