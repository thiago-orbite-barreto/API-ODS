import { Document } from 'mongoose';
export type PraticaDocument = Pratica & Document;
export declare class Pratica {
    nomeUsuario: string;
    tipo: string;
    data: Date;
    descricao?: string;
}
export declare const PraticaSchema: import("mongoose").Schema<Pratica, import("mongoose").Model<Pratica, any, any, any, Document<unknown, any, Pratica> & Pratica & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Pratica, Document<unknown, {}, import("mongoose").FlatRecord<Pratica>> & import("mongoose").FlatRecord<Pratica> & {
    _id: import("mongoose").Types.ObjectId;
}>;
