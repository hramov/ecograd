import { ArgumentsHost, ExceptionFilter, HttpException } from '@nestjs/common';
export declare class ServerErrorException implements ExceptionFilter {
    errors: string[];
    catch(exception: HttpException, host: ArgumentsHost): void;
}
