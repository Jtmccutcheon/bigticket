import { CustomError } from './customError';

// import { CustomError } from './customError';
// this makes no sense i have an error when importing  but not in the custom request error
export class DatabaseConnectionError extends CustomError {
	statusCode = 500;
	reason = 'Error connecting to database';
	constructor() {
		super('Database connection error');

		Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
	}

	serializeErrors() {
		return [{ message: this.reason }];
	}
}
