import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import { CompetitionsService } from './competitions.service';
import { CreateCompetitionDto } from './dto/create-competition.dto';
import { UpdateCompetitionDto } from './dto/update-competition.dto';
import { FindCompetitionsDto } from './dto/find-competitions.dto';

@Controller('competitions')
export class CompetitionsController {
  constructor(private readonly competitionsService: CompetitionsService) {}

  @Post()
  create(@Body(ValidationPipe) createCompetitionDto: CreateCompetitionDto) {
    return this.competitionsService.create(createCompetitionDto);
  }

  @Get()
  findAll(@Query() query: FindCompetitionsDto) {
    return this.competitionsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.competitionsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) updateCompetitionDto: UpdateCompetitionDto,
  ) {
    return this.competitionsService.update(id, updateCompetitionDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.competitionsService.remove(id);
  }
}
