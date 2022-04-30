import { DynamicModule } from '@nestjs/common';
export declare class AuthModule {
    static forRoot(secret: string, expiresIn: string): DynamicModule;
}
