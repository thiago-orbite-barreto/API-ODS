"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PraticaService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const pratica_schema_1 = require("./schemas/pratica.schema");
let PraticaService = class PraticaService {
    praticaModel;
    constructor(praticaModel) {
        this.praticaModel = praticaModel;
    }
    async create(dto) {
        const created = new this.praticaModel({
            nomeUsuario: dto.nomeUsuario,
            tipo: dto.tipo,
            data: new Date(dto.data),
            descricao: dto.descricao,
        });
        return created.save();
    }
    async findAll(filters) {
        const query = {};
        if (filters.nomeUsuario)
            query.nomeUsuario = filters.nomeUsuario;
        if (filters.tipo)
            query.tipo = filters.tipo;
        if (filters.dataInicial || filters.dataFinal) {
            query.data = {};
            if (filters.dataInicial)
                query.data.$gte = new Date(filters.dataInicial);
            if (filters.dataFinal)
                query.data.$lte = new Date(filters.dataFinal);
        }
        return this.praticaModel.find(query).sort({ data: -1 }).exec();
    }
    async getStatistics() {
        const total = await this.praticaModel.countDocuments();
        const totalPerTypeAgg = await this.praticaModel
            .aggregate([
            { $group: { _id: '$tipo', count: { $sum: 1 } } },
            { $project: { tipo: '$_id', count: 1, _id: 0 } },
            { $sort: { count: -1 } },
        ])
            .exec();
        const tipoMaisRegistrado = totalPerTypeAgg.length ? totalPerTypeAgg[0].tipo : null;
        const usuarioMaisAtivoAgg = await this.praticaModel
            .aggregate([
            { $group: { _id: '$nomeUsuario', count: { $sum: 1 } } },
            { $project: { nomeUsuario: '$_id', count: 1, _id: 0 } },
            { $sort: { count: -1 } },
            { $limit: 1 },
        ])
            .exec();
        const usuarioMaisAtivo = usuarioMaisAtivoAgg.length ? usuarioMaisAtivoAgg[0].nomeUsuario : null;
        const end = new Date();
        const start = new Date();
        start.setDate(end.getDate() - 29);
        start.setHours(0, 0, 0, 0);
        const dailyAgg = await this.praticaModel
            .aggregate([
            { $match: { data: { $gte: start, $lte: end } } },
            {
                $group: {
                    _id: { $dateToString: { format: '%Y-%m-%d', date: '$data' } },
                    count: { $sum: 1 },
                },
            },
            { $group: { _id: null, avgPerDay: { $avg: '$count' } } },
        ])
            .exec();
        const mediaDiaria = dailyAgg.length ? dailyAgg[0].avgPerDay : 0;
        const totalPerType = totalPerTypeAgg.reduce((acc, cur) => {
            acc[cur.tipo] = cur.count;
            return acc;
        }, {});
        return {
            tipoMaisRegistrado,
            usuarioMaisAtivo,
            totalPerType,
            total,
            mediaDiaria: Number(mediaDiaria?.toFixed?.(2) ?? mediaDiaria),
        };
    }
};
exports.PraticaService = PraticaService;
exports.PraticaService = PraticaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(pratica_schema_1.Pratica.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], PraticaService);
//# sourceMappingURL=pratica.service.js.map