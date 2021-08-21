import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
export declare class ClientsController {
    private readonly clientsService;
    constructor(clientsService: ClientsService);
    create(createClientDto: CreateClientDto): Promise<import("./models/client.model").Client>;
    findAll(): Promise<import("./models/client.model").Client[]>;
    findOne(id: number): Promise<import("./models/client.model").Client>;
    update(id: number, updateClientDto: UpdateClientDto): Promise<import("./models/client.model").Client>;
    remove(id: number): Promise<import("./models/client.model").Client>;
    assignToClient(id: number, userid: number): Promise<import("./models/client.model").Client>;
}
