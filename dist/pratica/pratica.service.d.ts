import { Model } from 'mongoose';
import { Pratica, PraticaDocument } from './schemas/pratica.schema';
import { CreatePraticaDto } from './dto/create-pratica.dto';
export declare class PraticaService {
    private praticaModel;
    constructor(praticaModel: Model<PraticaDocument>);
    create(dto: CreatePraticaDto): Promise<import("mongoose").Document<unknown, {}, PraticaDocument> & Pratica & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findAll(filters: {
        nomeUsuario?: string;
        tipo?: string;
        dataInicial?: string;
        dataFinal?: string;
    }): Promise<(import("mongoose").Document<unknown, {}, PraticaDocument> & Pratica & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    getStatistics(): Promise<{
        tipoMaisRegistrado: any;
        usuarioMaisAtivo: any;
        totalPerType: any;
        total: number;
        mediaDiaria: number;
    }>;
}
