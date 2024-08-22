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
exports.EmpleadoController = void 0;
const common_1 = require("@nestjs/common");
const empleado_service_1 = require("./empleado.service");
const dto_1 = require("./dto");
let EmpleadoController = class EmpleadoController {
    constructor(empleadoService) {
        this.empleadoService = empleadoService;
    }
    register(dto) {
        return this.empleadoService.create(dto);
    }
    findAll() {
        return this.empleadoService.findAll();
    }
};
exports.EmpleadoController = EmpleadoController;
__decorate([
    (0, common_1.Post)(''),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.EmpleadoDto]),
    __metadata("design:returntype", Promise)
], EmpleadoController.prototype, "register", null);
__decorate([
    (0, common_1.Get)(''),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EmpleadoController.prototype, "findAll", null);
exports.EmpleadoController = EmpleadoController = __decorate([
    (0, common_1.Controller)('empleado'),
    __metadata("design:paramtypes", [empleado_service_1.EmpleadoService])
], EmpleadoController);
//# sourceMappingURL=empleado.controller.js.map