export class CreatePlan {
  name_plan: string;
  description: string;
  duration: number;
  price: number;
  stripePriceId: string;
  stripeProductId: string;
  status: 'available' | 'unavailable';
}
