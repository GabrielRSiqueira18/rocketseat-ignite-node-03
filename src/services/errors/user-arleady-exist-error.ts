export class UserArleadyExistError extends Error {
	constructor() {
		super('E-mail arleady exist.')
	}
}