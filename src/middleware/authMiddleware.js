const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Extrae el token del header

  if (!token) {
    return res
      .status(401)
      .json({ error: "Acceso no autorizado: Token requerido" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Token inválido o expirado" });
    }
    req.user = user; // Almacena los datos del usuario en `req.user`
    next();
  });
}

function ensureAdmin(req, res, next) {
  if (req.user && req.user.role === "admin") {
    return next();
  }
  return res
    .status(403)
    .json({ error: "Acceso denegado: Se requiere rol de administrador" });
}

module.exports = { authenticateToken, ensureAdmin };
