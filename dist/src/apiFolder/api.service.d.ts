import { Repository } from "typeorm";
import { Directories } from "./api.entity";
import { Email } from './email.entity';
export declare class ApiService {
    private repoDir;
    private repoEm;
    constructor(repoDir: Repository<Directories>, repoEm: Repository<Email>);
    create(nameE: string, emailsE: string[]): Promise<{
        name: string;
        emails: string[];
    }>;
    findOne(id: number): Promise<any>;
    findAll(page?: number, limit?: number): Promise<any>;
    updatePatch(id: number, partialDirectoryData: Partial<Directories>): Promise<Directories>;
    updatePut(id: number, updatedDirectoryData: Directories): Promise<Directories>;
    deleteDirectoryById(id: number): Promise<void>;
}
