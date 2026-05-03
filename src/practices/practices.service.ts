import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePracticeDto } from './dto/create-practice.dto';
import { Practice, PracticeDocument } from './practice.schema';

@Injectable()
export class PracticesService {
  constructor(@InjectModel(Practice.name) private practiceModel: Model<PracticeDocument>) {}

  async create(dto: CreatePracticeDto) {
    const doc = new this.practiceModel({
      nomeUsuario: dto.nomeUsuario,
      tipo: dto.tipo,
      data: new Date(dto.data),
      descricao: dto.descricao,
    });
    return doc.save();
  }

  async findAll(filters: { nomeUsuario?: string; tipo?: string; dataInicial?: string; dataFinal?: string }) {
    const query: any = {};
    if (filters.nomeUsuario) query.nomeUsuario = filters.nomeUsuario;
    if (filters.tipo) query.tipo = filters.tipo;
    if (filters.dataInicial || filters.dataFinal) {
      query.data = {};
      if (filters.dataInicial) query.data.$gte = new Date(filters.dataInicial);
      if (filters.dataFinal) {
        // include end of day
        const d = new Date(filters.dataFinal);
        d.setHours(23, 59, 59, 999);
        query.data.$lte = d;
      }
    }
    return this.practiceModel.find(query).sort({ data: -1 }).lean().exec();
  }

  async statistics() {
    const now = new Date();
    const start30 = new Date(now);
    start30.setDate(start30.getDate() - 29);
    start30.setHours(0, 0, 0, 0);

    const [byType, topTypeArr, byUser, topUserArr, total, last30Total] = await Promise.all([
      this.practiceModel.aggregate([
        { $group: { _id: '$tipo', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]),
      this.practiceModel.aggregate([
        { $group: { _id: '$tipo', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 1 },
      ]),
      this.practiceModel.aggregate([
        { $group: { _id: '$nomeUsuario', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]),
      this.practiceModel.aggregate([
        { $group: { _id: '$nomeUsuario', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 1 },
      ]),
      this.practiceModel.countDocuments(),
      this.practiceModel.countDocuments({ data: { $gte: start30 } }),
    ] as any);

    const totalsPerType = byType.reduce((acc, cur) => {
      acc[cur._id] = cur.count;
      return acc;
    }, {} as Record<string, number>);

    const result = {
      tipoMaisRegistrado: topTypeArr && topTypeArr[0] ? topTypeArr[0]._id : null,
      usuarioMaisAtivo: topUserArr && topUserArr[0] ? topUserArr[0]._id : null,
      totalPorTipo: totalsPerType,
      totalGeral: total,
      mediaDiariaUltimos30Dias: Number(((last30Total || 0) / 30).toFixed(2)),
    };

    return result;
  }
}
