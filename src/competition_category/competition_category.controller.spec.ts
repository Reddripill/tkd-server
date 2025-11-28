import { Test, TestingModule } from '@nestjs/testing';
import { CompetitionCategoryController } from './competition_category.controller';
import { CompetitionCategoryService } from './competition_category.service';

describe('CompetitionCategoryController', () => {
  let controller: CompetitionCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompetitionCategoryController],
      providers: [CompetitionCategoryService],
    }).compile();

    controller = module.get<CompetitionCategoryController>(
      CompetitionCategoryController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
