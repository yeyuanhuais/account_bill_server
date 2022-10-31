import { BillsService } from "./bills.service";
import { CreateBillDto } from "./dto/create_bill.dto";
import { UpdateBillDto } from "./dto/update_bill.dto";
export declare class BillsController {
    private readonly billsService;
    constructor(billsService: BillsService);
    create(createBillDto: CreateBillDto, request: any): Promise<void>;
    findAll(query: object): Promise<import("./schemas/bill.schema").Bill[]>;
    findOne(id: string): Promise<import("./schemas/bill.schema").Bill | null>;
    update(id: string, updateBillDto: UpdateBillDto, request: any): Promise<void>;
    remove(id: string): Promise<void>;
}
