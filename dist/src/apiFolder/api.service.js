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
exports.ApiService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const api_entity_1 = require("./api.entity");
const email_entity_1 = require("./email.entity");
let ApiService = class ApiService {
    constructor(repoDir, repoEm) {
        this.repoDir = repoDir;
        this.repoEm = repoEm;
    }
    async create(nameE, emailsE) {
        const newDirectory = this.repoDir.create({
            name: nameE,
        });
        const savedDirectory = await this.repoDir.save(newDirectory);
        const emails = await Promise.all(emailsE.map(async (emailAddress) => {
            const email = this.repoEm.create({
                emails: emailAddress,
                directory: savedDirectory,
            });
            return await this.repoEm.save(email);
        }));
        const emailAddresses = emails.map((email) => email.emails);
        return { name: savedDirectory.name, emails: emailAddresses };
    }
    async findOne(id) {
        const directory = await this.repoDir
            .createQueryBuilder('directory')
            .leftJoinAndSelect('directory.emails', 'email')
            .where('directory.id = :id', { id })
            .getOne();
        if (directory) {
            return {
                id: directory.id,
                name: directory.name,
                emails: directory.emails ? directory.emails.map(email => email.emails) : [],
            };
        }
        return null;
    }
    async findAll(page = 1, limit = 10) {
        const [results, total] = await this.repoDir
            .createQueryBuilder('directory')
            .leftJoinAndSelect('directory.emails', 'email')
            .skip((page - 1) * limit)
            .take(limit)
            .getManyAndCount();
        const totalPages = Math.ceil(total / limit);
        return {
            count: total,
            next: page < totalPages ? `?page=${page + 1}&limit=${limit}` : null,
            previous: page > 1 ? `?page=${page - 1}&limit=${limit}` : null,
            results: results.map(dir => ({
                id: dir.id,
                name: dir.name,
                emails: dir.emails ? dir.emails.map(email => email.emails) : [],
            })),
        };
    }
    async updatePatch(id, partialDirectoryData) {
        const directory = await this.repoDir.findOneBy({ id });
        if (!directory) {
            throw new common_1.NotFoundException('Directorio no encontrado');
        }
        Object.assign(directory, partialDirectoryData);
        return await this.repoDir.save(directory);
    }
    async updatePut(id, updatedDirectoryData) {
        const directory = await this.repoDir
            .createQueryBuilder('directory')
            .leftJoinAndSelect('directory.emails', 'emails')
            .where('directory.id = :id', { id })
            .getOne();
        if (!directory) {
            throw new common_1.NotFoundException('Directorio no encontrado');
        }
        directory.name = updatedDirectoryData.name;
        if (updatedDirectoryData.emails) {
            directory.emails = updatedDirectoryData.emails.map((email) => {
                const existingEmail = directory.emails.find((existingEmail) => existingEmail.id === email.id);
                if (existingEmail) {
                    existingEmail.emails = email.emails;
                    return existingEmail;
                }
                else {
                    return this.repoEm.create({
                        emails: email.emails,
                        directory: directory
                    });
                }
            });
        }
        return await this.repoDir.save(directory);
    }
    async deleteDirectoryById(id) {
        await this.repoDir
            .createQueryBuilder()
            .delete()
            .from('email')
            .where('directoryId = :id', { id })
            .execute();
        await this.repoDir.delete(id);
    }
};
exports.ApiService = ApiService;
exports.ApiService = ApiService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(api_entity_1.Directories)),
    __param(1, (0, typeorm_2.InjectRepository)(email_entity_1.Email)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository])
], ApiService);
//# sourceMappingURL=api.service.js.map