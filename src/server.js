const express = require("express");
const session = require("express-session");
const passport = require("./config/passport");
const authRoutes = require("./routes/auth");
const planRoutes = require("./routes/plan");
const sequelize = require("./config/db");
const cors = require("cors"); // Importar CORS

require("dotenv").config();

const app = express();

// Configurar CORS
app.use(
  cors({
    origin: "http://localhost:5173", // Reemplaza con la URL de tu frontend
    credentials: true, // Permitir el uso de cookies y autenticación
  })
);

// Middleware de sesión
app.use(
  session({
    secret: "secreto",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Inicializar Passport
app.use(passport.initialize());
app.use(passport.session());

// Rutas
app.use("/auth", authRoutes);
app.use("/plans", planRoutes);

// Sincronizar base de datos
sequelize.sync().then(() => {
  console.log("Base de datos sincronizada");
  app.listen(5000, () => console.log("Servidor corriendo en puerto 5000"));
});
