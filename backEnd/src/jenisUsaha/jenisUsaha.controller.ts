import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { JenisUsahaService } from './jenisUsaha.service';
import { CreateJenisUsahaDto, UpdateJenisUsahaDto } from './dto/jenisUsaha.dto';

// Mendukung URL /jenis-usaha dan /business-types
@Controller(['jenis-usaha', 'business-types'])
export class JenisUsahaController {
  constructor(private readonly jenisUsahaService: JenisUsahaService) {}

  @Get()
  findAll() {
    return this.jenisUsahaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jenisUsahaService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateJenisUsahaDto) {
    return this.jenisUsahaService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateJenisUsahaDto) {
    return this.jenisUsahaService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jenisUsahaService.remove(id);
  }
}
