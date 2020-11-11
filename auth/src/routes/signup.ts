import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator'; // https://express-validator.github.io/docs/
import { RequestValidationError } from '../errors/requestValidtationError';
import { DatabaseConnectionError } from '../errors/databaseConnectionError';

// create router instance
const router = express.Router();

// signup route
router.post(
	'/api/users/signup',

	[
		body('email').isEmail().withMessage('Email must be vaild'),
		body('password')
			.trim() // will remove extra or trailing whitespace
			.isLength({ min: 4, max: 20 })
			.withMessage('Password must be between 4-20 characters'),
	],

	async (req: Request, res: Response) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			throw new RequestValidationError(errors.array());
		}

		console.log('Creating a user...');
		throw new DatabaseConnectionError();

		res.send({});
	},
);

export { router as signUpRouter };
