import { Test, TestingModule } from '@nestjs/testing';
import { CompetitionPlaceController } from './competition_place.controller';
import { CompetitionPlaceService } from './competition_place.service';

describe('CompetitionPlaceController', () => {
  let controller: CompetitionPlaceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompetitionPlaceController],
      providers: [CompetitionPlaceService],
    }).compile();

    controller = module.get<CompetitionPlaceController>(
      CompetitionPlaceController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
