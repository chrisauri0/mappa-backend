const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  // Esperamos que el token venga en el header Authorization: Bearer <token>
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ error: "Acceso denegado: no se encontró token" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      return res.status(403).json({ error: "Token inválido o expirado" });
    }
    // Opcional: asigna la carga útil a req.user para usarla en la ruta
    req.user = payload;
    next();
  });
}

module.exports = authenticateToken;
