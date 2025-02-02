const User = require("../models/User");

exports.getUserProfile = (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "No autenticado" });
  }
  res.json(req.user);
};
