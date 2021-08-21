export declare class CreateOrderUnauthorizedDto {
    name: string;
    email: string;
    phone: string;
    company: string;
    object: string;
    object_type: 1 | 2;
    isDocs: boolean;
    docsUrl: string;
    status: 'new' | 'inWork' | 'done';
}
