import { Test, TestingModule } from '@nestjs/testing';
import { CompetitionPlaceService } from './competition_place.service';

describe('CompetitionPlaceService', () => {
  let service: CompetitionPlaceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompetitionPlaceService],
    }).compile();

    service = module.get<CompetitionPlaceService>(CompetitionPlaceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
