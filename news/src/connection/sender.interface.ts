import { Result } from "../core/types/result.type";

export interface Sender {
  send(results: Result[]): any;
}
