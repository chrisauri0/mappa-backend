const express = require("express");

const passport = require("./config/passport");
const authRoutes = require("./routes/auth");
const planRoutes = require("./routes/plan");
const subscriptionRoutes = require("./routes/subscription");
const sequelize = require("./config/db");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Configurar CORS
app.use(
  cors({
    origin: "http://localhost:5173", // URL de tu frontend
    credentials: true,
  })
);

// Middleware para parsear el body (JSON y URL-encoded)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Inicializar Passport
app.use(passport.initialize());

// Rutas
app.use("/auth", authRoutes);
app.use("/api/plans", planRoutes);
app.use("/subscriptions", subscriptionRoutes);

// Sincronizar base de datos y arrancar el servidor
sequelize.sync().then(() => {
  console.log("Base de datos sincronizada");
  app.listen(5000, () => console.log("Servidor corriendo en puerto 5000"));
});
