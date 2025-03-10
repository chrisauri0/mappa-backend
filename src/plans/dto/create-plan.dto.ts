export class CreatePlan {
  name_plan: string;
  description: string;
  duration: number;
  price: number;
  status: 'available' | 'unavailable';
}
