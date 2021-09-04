export interface IClient {
  id: number;
  orders_count: number;
  orders: IOrder[];
  userid: number;
  user: IUser;
}

export interface IExpert {
  id: number;
  position: string;
  cert: string;
  direction: string;
  misc: string;
  orders: IOrder[];
  userid: number;
  user: IUser;
}

export interface IOrder {
  name?: string;
  email?: string;
  object: string;
  address: string;
  object_type: 1 | 2,
  phone?: string;
}

export interface IUser {
  id: number;
  last_name: string;
  name: string;
  second_name: string;
  phone: string;
  birth_date: Date;
  email: string;
  password: string;
  role: string;
  cert: string
  directions: string;
  misc: string
}
