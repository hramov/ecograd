import { Ecograd } from '../Ecograd.model';
import { Client } from '../user/profiles/Client.model';
import { Expert } from '../user/profiles/Expert.model';
import { Attach } from './Attach.model';
import { Section } from './Section.model';
export declare class Order extends Ecograd {
    title: string;
    exp_type: string;
    object_type: string;
    docs_cipher: string;
    rii_cipher: string;
    status: string;
    client: Client;
    expert: Expert;
    files: Attach[];
    sections: Section[];
}
