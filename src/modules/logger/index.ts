import appRoot from 'app-root-path';
import path from 'path';
import { appendFileSync, existsSync, mkdirSync, writeFileSync } from 'fs';

export class Logger {
	public static writeInfo(msg: string) {
		const result = `INFO | ${new Date().toLocaleString()} | ${msg}`;
		console.log(result);
		Logger.writeToFile(result);
	}

	public static writeError(msg: string) {
		const result = `ERROR | ${new Date().toLocaleString()} | ${msg}`;
		console.log(result);
		Logger.writeToFile(result);
	}

	private static writeToFile(msg: string) {
		const today = new Date().toLocaleDateString().split('/').join('_');
		const year = new Date().getFullYear().toString();
		const month = (new Date().getMonth() + 1).toString();

		const dir = path.resolve(appRoot.path, 'logs', year, month);
		if (!existsSync(dir)) {
			mkdirSync(dir, { recursive: true });
		}

		const file = path.resolve(dir, today + '.txt');
		if (existsSync(file)) {
			appendFileSync(file, msg + '\n');
		} else {
			writeFileSync(file, msg + '\n');
		}
	}
}
