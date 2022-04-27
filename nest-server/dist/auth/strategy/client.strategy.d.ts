import { Strategy } from 'passport-jwt';
import { User } from 'src/database/models/user/User.model';
declare const ClientStrategy_base: new (...args: any[]) => Strategy;
export declare class ClientStrategy extends ClientStrategy_base {
    constructor();
    validate(jwt_payload: any): Promise<User | Error>;
}
export {};
