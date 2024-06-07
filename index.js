import express from "express";
import { Evento } from "./Routers/ApiEvento.js";
import { Participaciones } from "./Routers/ApiParticipaciones.js";
import { Perfiles } from "./Routers/ApiPerfiles.js";
import { Usuarios } from "./Routers/ApiUsuarios.js";
import { validarUsuario } from "./Routers/validarUsuario.js";
import { Muro } from "./Routers/ApiMuro.js";
import { Matriculas } from "./Routers/apiGestionMatricula.js";
import { Cintas } from "./Routers/apiGestionCintas.js";
import { ArteMarcial } from "./Routers/apiGestionArteMarcial.js";
import { Graduacion } from "./Routers/apiGraduacion.js";
import { Landing } from "./Routers/ApiLanding.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para el análisis de JSON
app.use(express.json());

// Middleware para permitir el acceso a través de CORS

app.use("*", (req, res, next) => {
  const allowedOrigins = ["http://localhost:3000", "http://localhost:5173"];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

// Rutas
app.use("/api/evento", Evento); // Eventos
app.use("/api/Perfiles", Perfiles); // Perfiles de Usuarios
app.use("/api/Usuarios", Usuarios); // Registrar Usuarios
app.use("/api/validarUsuario", validarUsuario); //Validar Usuario, logueo pagina
app.use("/api/participaciones", Participaciones); // Modulo de participaciones del alumno
app.use("/api/matriculas", Matriculas); // Registrar Matriculas
app.use("/api/cintas", Cintas); // Registrar Cintas
app.use("/api/arteMarcial", ArteMarcial); // Registrar Cintas
app.use("/api/graduaciones", Graduacion); // Registrar Cintas
app.use("/api/Muro", Muro);
app.use("/api/Landing", Landing) 

// Manejo de rutas no encontradas
app.use((req, res, next) => {
  const error = new Error("Ruta no encontrada");
  error.status = 404;
  next(error);
});

// Middleware para manejo de errores
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
    },
  });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
});
