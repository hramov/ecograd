import { UsersService } from 'src/users/users.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './models/client.model';
export declare class ClientsService {
    private clientRepository;
    private userService;
    constructor(clientRepository: typeof Client, userService: UsersService);
    create(createClientDto: CreateClientDto): Promise<Client>;
    findAll(): Promise<Client[]>;
    findOne(id: number): Promise<Client>;
    findByUserId(id: number): Promise<Client>;
    update(id: number, updateClientDto: UpdateClientDto): Promise<Client>;
    remove(id: number): Promise<Client>;
    assignToClient(id: number, userid: number): Promise<Client>;
}
