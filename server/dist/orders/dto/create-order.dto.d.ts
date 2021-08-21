export declare class CreateOrderDto {
    userid: number;
    object: string;
    object_type: 1 | 2;
    isDocs: boolean;
    docsUrl: string;
    status: 'new' | 'inWork' | 'done';
}
