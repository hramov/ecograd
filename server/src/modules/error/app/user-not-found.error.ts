export class UserNotFoundError extends Error {
	constructor(private readonly email?: string) {
		super('User not found');
	}
}
