import { ApiService } from './api.service';
import { creacionObjetoDto } from './dtos/creacionObjeto.dto';
import { Directories } from './api.entity';
export declare class ApiController {
    private apiService;
    constructor(apiService: ApiService);
    getStatus(): string;
    getDirectories(page: number, limit: number): Promise<any>;
    postDirectories(directory: creacionObjetoDto): Promise<{
        name: string;
        emails: string[];
    }>;
    getDirectoriesById(id: number): Promise<any>;
    updateDirectories(id: number, updatedDirectoryData: Directories): Promise<Directories>;
    updateDirectoriesPatch(id: number, partialDirectoryData: Partial<Directories>): Promise<Directories>;
    removeDirectories(id: string): Promise<void>;
}
