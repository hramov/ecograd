export class ValidationError extends Error {
	constructor(private readonly field: string) {
		super('Validation error');
	}
}
