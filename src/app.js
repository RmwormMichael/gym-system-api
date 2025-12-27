const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

// Rutas con verificación de existencia
try {
  app.use("/api/usuarios", require("./routes/usuario.routes"));
  console.log("✅ Ruta /api/usuarios cargada");
} catch (error) {
  console.error("❌ Error cargando ruta usuarios:", error.message);
}

try {
  app.use("/api/roles", require("./routes/rol.routes"));
  console.log("✅ Ruta /api/roles cargada");
} catch (error) {
  console.error("❌ Error cargando ruta roles:", error.message);
}

try {
  app.use("/api/planes", require("./routes/plan.routes"));
  console.log("✅ Ruta /api/planes cargada");
} catch (error) {
  console.error("❌ Error cargando ruta planes:", error.message);
}

try {
  app.use("/api/contactos", require("./routes/contacto.routes"));
  console.log("✅ Ruta /api/contactos cargada");
} catch (error) {
  console.error("❌ Error cargando ruta contactos:", error.message);
}

try {
  app.use("/api/asistencias", require("./routes/asistencia.routes"));
  console.log("✅ Ruta /api/asistencias cargada");
} catch (error) {
  console.error("❌ Error cargando ruta asistencias:", error.message);
}

try {
  app.use("/api/mediciones", require("./routes/medicion.routes"));
  console.log("✅ Ruta /api/mediciones cargada");
} catch (error) {
  console.error("❌ Error cargando ruta mediciones:", error.message);
}

// Ruta de prueba
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "API funcionando" });
});

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

// Middleware de errores
app.use((error, req, res, next) => {
  console.error("Error:", error);
  res.status(500).json({ error: "Error interno del servidor" });
});

module.exports = app;
