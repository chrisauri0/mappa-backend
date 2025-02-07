const express = require("express");
const router = express.Router();
const Plan = require("../models/Plan");
const stripe = require("../config/stripe");

// Middleware para asegurar que el usuario es admin
function ensureAdmin(req, res, next) {
  // Se asume que el usuario autenticado está en req.user
  if (req.user && req.user.role === "admin") {
    return next();
  }
  return res.status(403).json({ error: "Acceso no autorizado" });
}

// Crear un nuevo plan
router.post("/", ensureAdmin, async (req, res) => {
  try {
    const { name_plan, description, duration, price, status } = req.body;

    // 1️⃣ Crear un producto en Stripe
    const stripeProduct = await stripe.products.create({
      name: name_plan,
      description: description,
    });

    // 2️⃣ Crear un precio en Stripe
    const stripePrice = await stripe.prices.create({
      unit_amount: price * 100, // Stripe maneja precios en centavos
      currency: "MXN",
      recurring: { interval: "month" }, // Puede ser "month" o "year"
      product: stripeProduct.id,
    });

    console.log(
      "Success! Producto creado en Stripe con ID: " + stripeProduct.id
    );
    console.log("Success! Precio creado en Stripe con ID: " + stripePrice.id);

    // 3️⃣ Guardar el plan en la base de datos con el stripePriceId
    const newPlan = await Plan.create({
      name_plan,
      description,
      duration,
      price,
      stripePriceId: stripePrice.id, // Ahora stripePrice.id existe en este contexto
      status,
    });

    res.status(201).json(newPlan);
  } catch (error) {
    console.error("Error al crear el plan:", error);
    res.status(500).json({ error: "Error al crear el plan" });
  }
});
// Ruta pública para obtener todos los planes (sin require de admin)
router.get("/public-plans", async (req, res) => {
  try {
    const plans = await Plan.findAll();
    res.json(plans);
  } catch (error) {
    console.error("Error al obtener los planes:", error);
    res.status(500).json({ error: "Error al obtener los planes" });
  }
});

// Obtener todos los planes
router.get("/", ensureAdmin, async (req, res) => {
  try {
    const plans = await Plan.findAll();
    res.json(plans);
  } catch (error) {
    console.error("Error al obtener los planes:", error);
    res.status(500).json({ error: "Error al obtener los planes" });
  }
});

// Obtener un plan específico por su ID
router.get("/:id", ensureAdmin, async (req, res) => {
  try {
    const plan = await Plan.findByPk(req.params.id);
    if (!plan) {
      return res.status(404).json({ error: "Plan no encontrado" });
    }
    res.json(plan);
  } catch (error) {
    console.error("Error al obtener el plan:", error);
    res.status(500).json({ error: "Error al obtener el plan" });
  }
});

// Actualizar un plan existente
router.put("/:id", ensureAdmin, async (req, res) => {
  try {
    const plan = await Plan.findByPk(req.params.id);
    if (!plan) {
      return res.status(404).json({ error: "Plan no encontrado" });
    }
    const { name_plan, description, duration, price, stripePriceId, status } =
      req.body;
    await plan.update({
      name_plan,
      description,
      duration,
      price,
      stripePriceId,
      status,
    });
    res.json(plan);
  } catch (error) {
    console.error("Error al actualizar el plan:", error);
    res.status(500).json({ error: "Error al actualizar el plan" });
  }
});

// Eliminar un plan
router.delete("/:id", ensureAdmin, async (req, res) => {
  try {
    const plan = await Plan.findByPk(req.params.id);
    if (!plan) {
      return res.status(404).json({ error: "Plan no encontrado" });
    }
    await plan.destroy();
    res.json({ message: "Plan eliminado con éxito" });
  } catch (error) {
    console.error("Error al eliminar el plan:", error);
    res.status(500).json({ error: "Error al eliminar el plan" });
  }
});

module.exports = router;
