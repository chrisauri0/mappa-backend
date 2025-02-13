const express = require("express");
const passport = require("passport");

const router = express.Router();

const jwt = require("jsonwebtoken");

// Ruta de autenticación con Google
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);

// Ruta de callback de Google sin sesiones (session: false)
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/" }),
  (req, res) => {
    // Genera el token JWT con la información del usuario
    const token = jwt.sign(
      {
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
      },
      process.env.JWT_SECRET, // Define esta variable de entorno con un string secreto
      { expiresIn: "1h" } // Duración del token (opcional)
    );

    // Puedes redirigir pasando el token o enviarlo en un JSON
    res.redirect(`http://localhost:5173/dashboard?token=${token}`);
    // O bien:
    // res.json({ token });
  }
);

// Ruta para obtener el usuario autenticado (nota: si usas tokens, tendrás que
// validar el token en cada petición y extraer el usuario)
router.get("/user", (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "No autenticado" });
  }
  res.json(req.user);
});

// Ruta para "cerrar sesión"
// Con tokens no se "cierra sesión" en el backend; se elimina el token en el cliente.
router.get("/logout", (req, res) => {
  // Si usaras sessions, podrías llamar a req.logout(), pero en un sistema sin sesión
  // lo que harías es, por ejemplo, indicar al cliente que elimine el token.
  res.redirect("http://localhost:5173");
});

module.exports = router;
