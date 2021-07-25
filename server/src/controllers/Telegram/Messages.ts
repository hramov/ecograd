import { IUser } from "../Controller";
import { IOrder } from "../Controller";
import { emit } from "./Utils";

// export async function sendOrder(order: IOrder) {
//   const messageToSend = `Привет! Отличные новости! ${order.name} из ${order.company} хочет заказать на экспертизу объект ${order.object}. Связаться можно по электронной почте: ${order.email} и по телефону: ${order.phone}`;
//   emit(messageToSend, 'admin');
// }

export async function sendNewMember(member: IUser) {
  const messageToSend = `К нам присоединился ${member.last_name} ${member.name}. Email: ${member.email}.`;
  emit(messageToSend, 'admin');
}

export async function sendNewLogin(member: IUser) {
  const messageToSend = `На сайт зашел ${member.last_name} ${member.name}. Email: ${member.email}.`;
  emit(messageToSend, 'admin');
}

export async function sendNewLogout(member: IUser) {
  const messageToSend = `С сайта вышел ${member.last_name} ${member.name}. Email: ${member.email}.`;
  emit(messageToSend, 'admin');
}
