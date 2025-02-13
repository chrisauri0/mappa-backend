// controllers/planController.js
const Plan = require("../models/Plan");
const stripe = require("../config/stripe");

exports.createPlan = async (req, res) => {
  try {
    const { name_plan, description, duration, price, status } = req.body;

    // 1️⃣ Crear un producto en Stripe
    const stripeProduct = await stripe.products.create({
      name: name_plan,
      description,
    });

    // 2️⃣ Crear un precio en Stripe
    const stripePrice = await stripe.prices.create({
      unit_amount: price * 100, // Stripe maneja precios en centavos
      currency: "MXN",
      recurring: { interval: "month" },
      product: stripeProduct.id,
    });

    console.log("Success! Producto creado en Stripe con ID:", stripeProduct.id);
    console.log("Success! Precio creado en Stripe con ID:", stripePrice.id);

    // 3️⃣ Guardar el plan en la base de datos con el stripePriceId
    const newPlan = await Plan.create({
      name_plan,
      description,
      duration,
      price,
      stripePriceId: stripePrice.id,
      status,
    });

    res.status(201).json(newPlan);
  } catch (error) {
    console.error("Error al crear el plan:", error);
    res.status(500).json({ error: "Error al crear el plan" });
  }
};

exports.getPublicPlans = async (req, res) => {
  try {
    const plans = await Plan.findAll();
    res.json(plans);
  } catch (error) {
    console.error("Error al obtener los planes:", error);
    res.status(500).json({ error: "Error al obtener los planes" });
  }
};

exports.getAllPlans = async (req, res) => {
  try {
    const plans = await Plan.findAll();
    res.json(plans);
  } catch (error) {
    console.error("Error al obtener los planes:", error);
    res.status(500).json({ error: "Error al obtener los planes" });
  }
};

exports.getPlanById = async (req, res) => {
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
};

exports.updatePlan = async (req, res) => {
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
};

exports.deletePlan = async (req, res) => {
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
};
