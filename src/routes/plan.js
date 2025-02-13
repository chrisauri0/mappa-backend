const express = require("express");
const router = express.Router();
const planController = require("../controllers/planController");
const {
  authenticateToken,
  ensureAdmin,
} = require("../middleware/authMiddleware");

// Obtener todos los planes (requiere autenticación y rol de admin)
router.get("/", authenticateToken, ensureAdmin, planController.getAllPlans);

// Crear un nuevo plan (requiere autenticación y rol de admin)
router.post("/", authenticateToken, ensureAdmin, planController.createPlan);

// Obtener un plan por ID (requiere autenticación y rol de admin)
router.get("/:id", authenticateToken, ensureAdmin, planController.getPlanById);

// Actualizar un plan (requiere autenticación y rol de admin)
router.put("/:id", authenticateToken, ensureAdmin, planController.updatePlan);

// Eliminar un plan (requiere autenticación y rol de admin)
router.delete(
  "/:id",
  authenticateToken,
  ensureAdmin,
  planController.deletePlan
);

module.exports = router;
