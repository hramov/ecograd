import { Result } from "../core/types/result.type";
import { Sender } from "./sender.interface";

export class Database implements Sender {
    send(results: Result[]) {}
}