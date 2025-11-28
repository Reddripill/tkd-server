import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CompetitionPlaceService } from './competition_place.service';
import { CreateCompetitionPlaceDto } from './dto/create-competition_place.dto';
import { UpdateCompetitionPlaceDto } from './dto/update-competition_place.dto';

@Controller('competition-place')
export class CompetitionPlaceController {
  constructor(
    private readonly competitionPlaceService: CompetitionPlaceService,
  ) {}

  @Post()
  create(@Body() createCompetitionPlaceDto: CreateCompetitionPlaceDto) {
    return this.competitionPlaceService.create(createCompetitionPlaceDto);
  }

  @Get()
  findAll() {
    return this.competitionPlaceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.competitionPlaceService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCompetitionPlaceDto: UpdateCompetitionPlaceDto,
  ) {
    return this.competitionPlaceService.update(+id, updateCompetitionPlaceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.competitionPlaceService.remove(+id);
  }
}
