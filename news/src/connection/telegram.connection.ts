import { Result } from "../core/types/result.type";
import { Sender } from "./sender.interface";

export class Telegram implements Sender {
  send(results: Result[]) {}
}
