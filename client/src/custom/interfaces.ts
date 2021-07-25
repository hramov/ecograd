export interface User {
  status: boolean;
  jwt_token: string;
}

export interface IExpert {
  id: number
  name: string;
  last_name: string;
  second_name: string;
  email: string;
  phone: string;
  created_at: Date;
  position: string;
  birth_date: string;
  cert: string;
  direction: string;
  misc: string;
}

export interface IOrder {
  name: string;
  email: string;
  company: string;
  object: string;
  phone: number;
}

export interface IAuthResponse {
  status: boolean;
  jwt_token: string;
  user: {
    id: number
  }
}
