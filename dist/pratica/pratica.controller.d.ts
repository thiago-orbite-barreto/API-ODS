import { PraticaService } from './pratica.service';
import { CreatePraticaDto } from './dto/create-pratica.dto';
export declare class PraticaController {
    private readonly praticaService;
    constructor(praticaService: PraticaService);
    createPratica(dto: CreatePraticaDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/pratica.schema").PraticaDocument> & import("./schemas/pratica.schema").Pratica & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getHistorico(nomeUsuario?: string, tipo?: string, dataInicial?: string, dataFinal?: string): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/pratica.schema").PraticaDocument> & import("./schemas/pratica.schema").Pratica & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    getEstatisticas(): Promise<{
        tipoMaisRegistrado: any;
        usuarioMaisAtivo: any;
        totalPerType: any;
        total: number;
        mediaDiaria: number;
    }>;
}
