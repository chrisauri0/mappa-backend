// src/stripe/stripe.service.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import Stripe from 'stripe';


@Injectable()
export class StripeService {
  private stripe: Stripe;
  constructor() {
    if (!process.env.STRIPE_WEBHOOK_SECRET) {
      throw new Error('STRIPE_SECRET_KEY no está definido en las variables de entorno');
    }
    this.stripe = new Stripe(process.env.STRIPE_WEBHOOK_SECRET, {
      apiVersion: '2025-01-27.acacia', // Usa la versión que te asignó Stripe
    });
  }
  
  
  /**
   * Crea un producto en Stripe
   * @param name - Nombre del producto
   * @param description - Descripción del producto (opcional)
   */
  async createProduct(name: string, description?: string): Promise<Stripe.Product> {
    try {
      const product = await this.stripe.products.create({ name, description });
      return product;
    } catch (error: any) {
      throw new InternalServerErrorException(`Error al crear producto en Stripe: ${error.message}`);
    }
  }

  /**
   * Crea un precio (plan) en Stripe para un producto dado.
   * @param productId - ID del producto en Stripe
   * @param price - Precio (en unidades, se convierte a centavos)
   * @param currency - Moneda, por defecto "MXN"
   * @param interval - Intervalo de recurrencia, por defecto "month"
   */
  async createPrice(
    productId: string,
    price: number,
    currency = 'MXN',
    interval: 'day' | 'week' | 'month' | 'year' = 'month', 

  ): Promise<Stripe.Price> {
    try {
      const stripePrice = await this.stripe.prices.create({
        unit_amount: price * 100, // Stripe maneja precios en centavos
        currency,
        recurring: { interval },
        product: productId,
      });
      return stripePrice;
    } catch (error: any) {
      throw new InternalServerErrorException(`Error al crear precio en Stripe: ${error.message}`);
    }
  }
}
