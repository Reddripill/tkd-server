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
import { ArenasService } from './arenas.service';
import { CreateArenaDto } from './dto/create-arena.dto';
import { UpdateArenaDto } from './dto/update-arena.dto';
import { FindArenasDto } from './dto/find-arenas.dto';

@Controller('arenas')
export class ArenasController {
  constructor(private readonly arenasService: ArenasService) {}

  @Post()
  create(@Body(ValidationPipe) createArenaDto: CreateArenaDto) {
    return this.arenasService.create(createArenaDto);
  }

  @Get()
  findAll(@Query() query: FindArenasDto) {
    return this.arenasService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.arenasService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) updateArenaDto: UpdateArenaDto,
  ) {
    return this.arenasService.update(id, updateArenaDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.arenasService.remove(id);
  }
}
