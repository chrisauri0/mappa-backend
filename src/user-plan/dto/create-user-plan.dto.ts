export class CreateUserPlan {
  userId: number;
  userName: string;
  planId: number;
  planName: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'inactive';
  compras: number;
}
// Compare this snippet from src/user-plan/user-plan.service.ts:
