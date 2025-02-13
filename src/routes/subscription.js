const express = require("express");
const router = express.Router();
const stripe = require("../config/stripe"); // Configuración de Stripe con STRIPE_SECRET_KEY
const User = require("../models/User");
const Plan = require("../models/Plan");

// Endpoint para crear la sesión de pago de Stripe para una suscripción
router.post("/create-checkout-session", async (req, res) => {
  try {
    const { email, planId } = req.body;

    // 1. Verificar el usuario
    let user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Si el usuario no tiene un cliente asociado en Stripe, créalo
    if (!user.stripeCustomerId) {
      const customer = await stripe.customers.create({ email });
      user.stripeCustomerId = customer.id;
      await user.save();
    }

    // 2. Obtener el plan de la base de datos
    const plan = await Plan.findByPk(planId);
    if (!plan) {
      return res.status(404).json({ message: "Plan no encontrado" });
    }

    // 3. Crear la sesión de checkout en Stripe para la suscripción
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      customer: user.stripeCustomerId,
      line_items: [
        {
          price: plan.stripePriceId, // Este ID se generó cuando se creó el plan
          quantity: 1,
        },
      ],
      // URLs de redirección en caso de éxito o cancelación
      success_url:
        "http://localhost:5173/dashboard?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:5173/dashboard?canceled=true",
    });

    // 4. Retornar la URL de la sesión de pago para redirigir al usuario
    res.json({ url: session.url });
  } catch (error) {
    console.error("Error al crear la sesión de pago:", error);
    res.status(500).json({ error: "Error al crear la sesión de pago" });
  }
});

module.exports = router;
