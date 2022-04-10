export class Logger {
	writeInfo(msg: string) {
		console.log(`INFO | ${new Date().toLocaleString()} | ${msg}`);
	}
	writeError(msg: string) {
		console.log(`ERROR | ${new Date().toLocaleString()} | ${msg}`);
	}
}
