import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreatePracticeDto } from './dto/create-practice.dto';
import { PracticesService } from './practices.service';

@Controller()
export class PracticesController {
  constructor(private readonly service: PracticesService) {}

  @Post('pratica')
  async create(@Body() dto: CreatePracticeDto) {
    const created = await this.service.create(dto);
    return { id: created._id, ...created.toObject() };
  }

  @Get('historico')
  async historico(
    @Query('nomeUsuario') nomeUsuario?: string,
    @Query('tipo') tipo?: string,
    @Query('dataInicial') dataInicial?: string,
    @Query('dataFinal') dataFinal?: string,
  ) {
    return this.service.findAll({ nomeUsuario, tipo, dataInicial, dataFinal });
  }

  @Get('estatisticas')
  async estatisticas() {
    return this.service.statistics();
  }
}
