import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { DisciplinesService } from './disciplines.service';
import { CreateDisciplineDto } from './dto/create-discipline.dto';
import { UpdateDisciplineDto } from './dto/update-discipline.dto';
import { FindDisciplinesDto } from './dto/find-disciplines.dto';
import { RemoveDisciplinesDto } from './dto/remove-disciplines.dto';

@Controller('disciplines')
export class DisciplinesController {
  constructor(private readonly disciplinesService: DisciplinesService) {}

  @Post()
  create(@Body(ValidationPipe) createDisciplineDto: CreateDisciplineDto) {
    return this.disciplinesService.create(createDisciplineDto);
  }

  @Get()
  findAll(@Query() query: FindDisciplinesDto) {
    return this.disciplinesService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.disciplinesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) updateDisciplineDto: UpdateDisciplineDto,
  ) {
    return this.disciplinesService.update(id, updateDisciplineDto);
  }

  @Delete()
  removeMany(@Body() dto: RemoveDisciplinesDto) {
    return this.disciplinesService.removeMany(dto.items);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.disciplinesService.remove(id);
  }
}
