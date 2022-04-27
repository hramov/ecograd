import { Strategy } from 'passport-jwt';
import { User } from 'src/database/models/user/User.model';
declare const ExpertStrategy_base: new (...args: any[]) => Strategy;
export declare class ExpertStrategy extends ExpertStrategy_base {
    constructor();
    validate(jwt_payload: any): Promise<User | Error>;
}
export {};
