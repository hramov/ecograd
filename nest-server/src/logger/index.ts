import path, { resolve } from 'path';
import { appendFileSync, existsSync, mkdirSync, writeFileSync } from 'fs';
import { Logger as NestLogger } from '@nestjs/common';
export class Logger {
	public static writeInfo(msg: string) {
		const result = `INFO | ${new Date().toLocaleString()} | ${msg}`;
		NestLogger.log(result);
		Logger.writeToFile(result);
	}

	public static writeError(method: string, msg: string) {
		const result = `ERROR | ${new Date().toLocaleString()} | ${method} | ${msg}`;
		NestLogger.error(result);
		Logger.writeToFile(result);
	}

	private static writeToFile(msg: string) {
		const today = new Date().toLocaleDateString().split('/').join('_');
		const year = new Date().getFullYear().toString();
		const month = (new Date().getMonth() + 1).toString();

		const dir = resolve(__dirname, '../../logs', year, month);
		if (!existsSync(dir)) {
			mkdirSync(dir, { recursive: true });
		}

		const file = resolve(dir, today + '.txt');
		if (existsSync(file)) {
			appendFileSync(file, msg + '\n');
		} else {
			writeFileSync(file, msg + '\n');
		}
	}
}
