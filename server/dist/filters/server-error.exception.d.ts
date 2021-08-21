import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
export declare class ServerErrorException implements ExceptionFilter {
    errors: string[];
    catch(exception: unknown, host: ArgumentsHost): void;
}
