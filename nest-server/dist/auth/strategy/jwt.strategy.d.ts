import { Strategy } from 'passport-jwt';
import { User } from 'src/database/models/user/User.model';
export interface JwtPayload {
    sub: string;
}
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    constructor();
    validate(jwt_payload: JwtPayload): Promise<User | Error>;
}
export {};
