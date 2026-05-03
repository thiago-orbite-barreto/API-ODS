"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PraticaModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const pratica_schema_1 = require("./schemas/pratica.schema");
const pratica_service_1 = require("./pratica.service");
const pratica_controller_1 = require("./pratica.controller");
let PraticaModule = class PraticaModule {
};
exports.PraticaModule = PraticaModule;
exports.PraticaModule = PraticaModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: pratica_schema_1.Pratica.name, schema: pratica_schema_1.PraticaSchema }])],
        controllers: [pratica_controller_1.PraticaController],
        providers: [pratica_service_1.PraticaService],
    })
], PraticaModule);
//# sourceMappingURL=pratica.module.js.map