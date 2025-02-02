const express = require("express");
const passport = require("passport");

const router = express.Router();

// Ruta de autenticación con Google
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Ruta de callback de Google
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("http://localhost:5173/dashboard"); // Redirige al frontend
  }
);

// Ruta para obtener el usuario autenticado
router.get("/user", (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "No autenticado" });
  }
  res.json(req.user); // Devuelve los datos del usuario
});

// Ruta para cerrar sesión
router.get("/logout", (req, res) => {
  req.logout(() => {});
  res.redirect("http://localhost:5173");
});

module.exports = router;
