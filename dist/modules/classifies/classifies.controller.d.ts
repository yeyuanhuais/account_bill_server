import { ClassifiesService } from "./classifies.service";
import { CreateClassifyDto } from "./dto/create_classify.dto";
import { UpdateClassifyDto } from "./dto/update_classify.dto";
export declare class ClassifiesController {
    private readonly classifiesService;
    constructor(classifiesService: ClassifiesService);
    create(createClassifyDto: CreateClassifyDto, request: any): Promise<void>;
    findAll(query: object): Promise<import("./schemas/classify.schema").Classify[]>;
    findOne(id: string): Promise<import("./schemas/classify.schema").Classify | null>;
    update(id: string, updateClassifyDto: UpdateClassifyDto, request: any): Promise<void>;
    remove(id: string): Promise<void>;
}
