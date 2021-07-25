import { Orders } from "../database/entity/Order";

export interface IUser {
  id?: string;
  name: string;
  last_name: string;
  email: string;
  role: string;
  birthdate: Date;
  login: string;
  password: string;
  telegram_id: number;
  orders?: Orders[];
}

export interface ITelegramUser {
  username: string;
  chat_id: number;
  role: string;
  msg_counter: number;
}

export interface IOrder {
  id?: string;
  object: string;
  object_type: string,
  created_at: Date;
}

export interface IClient {
  id?: string,
  last_name: string,
  name: string,
  second_name: string,
  email: string;
  phone: string;
  login: string;
  password: string;
  role: string;
  telegram_id: number;
  orders: IOrder[]
}

/**
 *  name    | last_name | second_name |     email      |  phone   |       cr
eated_at        | position |     birth_date      | direction | misc |   cert 
 */
export interface IExpert {
  name: string;
  last_name: string;
  second_name: string;
  image_url: string;
  email: string;
  phone: string;
  created_at: Date;
  position: string;
  birth_date: string;
  cert: string;
  direction: string;
  misc: string;
}

export type isUserType = {
  authenticated: boolean;
  id: string;
};

export interface IFeedback {
  name: string;
  email: string;
  text: string;
  created_at: Date;
}

export abstract class Controller {}
