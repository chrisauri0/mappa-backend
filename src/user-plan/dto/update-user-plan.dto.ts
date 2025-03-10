export class UpdateUserPlan {
  userId: number;
  planId: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'inactive';
  compras: number;
}
