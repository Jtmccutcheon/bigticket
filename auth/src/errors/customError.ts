export abstract class CustomError extends Error {
	abstract statusCode: number;

	constructor(message: string) {
		super(message);
		Object.setPrototypeOf(this, CustomError.prototype);
	}
	abstract serializeErrors(): { message: string; field?: string }[]; // array of objects with a message and optional field property
}
