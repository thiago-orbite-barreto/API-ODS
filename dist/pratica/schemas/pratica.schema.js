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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PraticaSchema = exports.Pratica = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let Pratica = class Pratica {
    nomeUsuario;
    tipo;
    data;
    descricao;
};
exports.Pratica = Pratica;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Pratica.prototype, "nomeUsuario", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Pratica.prototype, "tipo", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: Date }),
    __metadata("design:type", Date)
], Pratica.prototype, "data", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Pratica.prototype, "descricao", void 0);
exports.Pratica = Pratica = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Pratica);
exports.PraticaSchema = mongoose_1.SchemaFactory.createForClass(Pratica);
//# sourceMappingURL=pratica.schema.js.map