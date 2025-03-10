import { Test, TestingModule } from '@nestjs/testing';
import { UserPlanService } from './user-plan.service';

describe('UserPlanService', () => {
  let service: UserPlanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserPlanService],
    }).compile();

    service = module.get<UserPlanService>(UserPlanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
