import { AssetsService } from "./assets.service";
import { CreateAssetDto } from "./dto/create_asset.dto";
import { UpdateAssetDto } from "./dto/update_asset.dto";
export declare class AssetsController {
    private readonly assetsService;
    constructor(assetsService: AssetsService);
    create(createAssetDto: CreateAssetDto, request: any): Promise<void>;
    findAll(request: any): Promise<({
        title: string;
        assets: number;
        netAssets: number;
        childData: import("./schemas/asset.schema").Asset[];
    } | {
        title: string;
        assets: number;
        childData: import("./schemas/asset.schema").Asset[];
        netAssets?: undefined;
    })[]>;
    findOne(id: string): Promise<import("./schemas/asset.schema").Asset | null>;
    update(id: string, updateAssetDto: UpdateAssetDto, request: any): Promise<void>;
    remove(id: string): Promise<void>;
}
