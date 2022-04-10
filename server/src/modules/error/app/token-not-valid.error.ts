export class TokenNotValidError extends Error {
	constructor() {
		super('Token not valid');
	}
}
