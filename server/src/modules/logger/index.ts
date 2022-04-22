import appRoot from 'app-root-path';
import path from 'path';
import fs from 'fs';

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
		// const today = new Date().toLocaleDateString().split('.').join('_');
		const today = new Date().toLocaleDateString();
		const year = new Date().getFullYear().toString();
		const month = (new Date().getMonth() + 1).toString();

		const dir = path.resolve(appRoot.path, 'logs', year, month);
		if (!fs.existsSync(dir)) {
			fs.mkdirSync(dir, { recursive: true });
		}

		const file = path.resolve(dir, today + '.txt');
		if (fs.existsSync(file)) {
			fs.appendFileSync(file, msg + '\n');
		} else {
			fs.writeFileSync(file, msg + '\n');
		}
	}
}
