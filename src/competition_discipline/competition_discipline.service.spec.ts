import { Test, TestingModule } from '@nestjs/testing';
import { CompetitionDisciplineService } from './competition_discipline.service';

describe('CompetitionDisciplineService', () => {
  let service: CompetitionDisciplineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompetitionDisciplineService],
    }).compile();

    service = module.get<CompetitionDisciplineService>(
      CompetitionDisciplineService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
