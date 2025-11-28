import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CompetitionDisciplineService } from './competition_discipline.service';
import { CreateCompetitionDisciplineDto } from './dto/create-competition_discipline.dto';
import { UpdateCompetitionDisciplineDto } from './dto/update-competition_discipline.dto';

@Controller('competition-discipline')
export class CompetitionDisciplineController {
  constructor(
    private readonly competitionDisciplineService: CompetitionDisciplineService,
  ) {}

  @Post()
  create(
    @Body() createCompetitionDisciplineDto: CreateCompetitionDisciplineDto,
  ) {
    return this.competitionDisciplineService.create(
      createCompetitionDisciplineDto,
    );
  }

  @Get()
  findAll() {
    return this.competitionDisciplineService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.competitionDisciplineService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCompetitionDisciplineDto: UpdateCompetitionDisciplineDto,
  ) {
    return this.competitionDisciplineService.update(
      +id,
      updateCompetitionDisciplineDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.competitionDisciplineService.remove(+id);
  }
}
