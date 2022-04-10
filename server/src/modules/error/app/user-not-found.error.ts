export class UserNotFoundError extends Error {
	constructor(private readonly username?: string) {
		super('User not found');
	}
}
