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
exports.ApiController = void 0;
const common_1 = require("@nestjs/common");
const api_service_1 = require("./api.service");
const creacionObjeto_dto_1 = require("./dtos/creacionObjeto.dto");
const api_entity_1 = require("./api.entity");
let ApiController = class ApiController {
    constructor(apiService) {
        this.apiService = apiService;
    }
    getStatus() {
        return "pong";
    }
    getDirectories(page, limit) {
        return this.apiService.findAll(page, limit);
    }
    async postDirectories(directory) {
        const { name, emails } = directory;
        return await this.apiService.create(name, emails);
    }
    async getDirectoriesById(id) {
        return this.apiService.findOne(id);
    }
    async updateDirectories(id, updatedDirectoryData) {
        return await this.apiService.updatePut(id, updatedDirectoryData);
    }
    async updateDirectoriesPatch(id, partialDirectoryData) {
        return await this.apiService.updatePatch(id, partialDirectoryData);
    }
    removeDirectories(id) {
        return this.apiService.deleteDirectoryById(parseInt(id));
    }
};
exports.ApiController = ApiController;
__decorate([
    (0, common_1.Get)("/status"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ApiController.prototype, "getStatus", null);
__decorate([
    (0, common_1.Get)("/directories"),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], ApiController.prototype, "getDirectories", null);
__decorate([
    (0, common_1.Post)("/directories"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [creacionObjeto_dto_1.creacionObjetoDto]),
    __metadata("design:returntype", Promise)
], ApiController.prototype, "postDirectories", null);
__decorate([
    (0, common_1.Get)("/directories/:id"),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ApiController.prototype, "getDirectoriesById", null);
__decorate([
    (0, common_1.Put)("/directories/:id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, api_entity_1.Directories]),
    __metadata("design:returntype", Promise)
], ApiController.prototype, "updateDirectories", null);
__decorate([
    (0, common_1.Patch)("/directories/:id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ApiController.prototype, "updateDirectoriesPatch", null);
__decorate([
    (0, common_1.Delete)("/directories/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ApiController.prototype, "removeDirectories", null);
exports.ApiController = ApiController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [api_service_1.ApiService])
], ApiController);
//# sourceMappingURL=api.controller.js.map