import { HttpException } from '@nestjs/common';
export declare class VueResponseException extends HttpException {
    constructor(response: string);
}
