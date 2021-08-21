import { HttpException } from "@nestjs/common";
export declare class InnerProblemsException extends HttpException {
    messages: string[];
    constructor(response: string[]);
}
