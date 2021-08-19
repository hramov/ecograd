export class CreateOrderUnauthorizedDto {

  /** Client data when unauthorized*/
  name: string;
  email: string;
  phone: string;
  company: string;

  /** Order data */
  object: string;
  object_type: 1 | 2;
  isDocs: boolean;
  docsUrl: string;
  status: 'new' | 'inWork' | 'done';
}