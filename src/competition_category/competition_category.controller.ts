import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CompetitionCategoryService } from './competition_category.service';
import { CreateCompetitionCategoryDto } from './dto/create-competition_category.dto';
import { UpdateCompetitionCategoryDto } from './dto/update-competition_category.dto';

@Controller('competition-category')
export class CompetitionCategoryController {
  constructor(
    private readonly competitionCategoryService: CompetitionCategoryService,
  ) {}

  @Post()
  create(@Body() createCompetitionCategoryDto: CreateCompetitionCategoryDto) {
    return this.competitionCategoryService.create(createCompetitionCategoryDto);
  }

  @Get()
  findAll() {
    return this.competitionCategoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.competitionCategoryService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCompetitionCategoryDto: UpdateCompetitionCategoryDto,
  ) {
    return this.competitionCategoryService.update(
      +id,
      updateCompetitionCategoryDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.competitionCategoryService.remove(+id);
  }
}
