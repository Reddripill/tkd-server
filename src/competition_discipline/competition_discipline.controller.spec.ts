import { Test, TestingModule } from '@nestjs/testing';
import { CompetitionDisciplineController } from './competition_discipline.controller';
import { CompetitionDisciplineService } from './competition_discipline.service';

describe('CompetitionDisciplineController', () => {
  let controller: CompetitionDisciplineController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompetitionDisciplineController],
      providers: [CompetitionDisciplineService],
    }).compile();

    controller = module.get<CompetitionDisciplineController>(
      CompetitionDisciplineController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
