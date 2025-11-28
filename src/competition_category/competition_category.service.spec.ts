import { Test, TestingModule } from '@nestjs/testing';
import { CompetitionCategoryService } from './competition_category.service';

describe('CompetitionCategoryService', () => {
  let service: CompetitionCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompetitionCategoryService],
    }).compile();

    service = module.get<CompetitionCategoryService>(
      CompetitionCategoryService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
