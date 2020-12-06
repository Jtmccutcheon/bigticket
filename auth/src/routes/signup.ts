import express, { Request, Response } from 'express';
import { body } from 'express-validator'; // https://express-validator.github.io/docs/
import jwt from 'jsonwebtoken'; // https://www.npmjs.com/package/jsonwebtoken
import { User } from '../models/user';
import { BadRequestError } from '../errors/badRequestError';
import { validateRequest } from '../middlewares/validateRequest';

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
	validateRequest,
	async (req: Request, res: Response) => {
		const { email, password } = req.body;
		const existingUser = await User.findOne({ email });

		if (existingUser) {
			throw new BadRequestError('Email in use');
		}

		const user = User.build({ email, password });
		await user.save();

		// generate jwt
		const userJwt = jwt.sign(
			{
				id: user.id,
				email: user.email,
			},
			process.env.JWT_KEY!, // ! means typescript ignore
		);

		// store on the session obj
		req.session = {
			jwt: userJwt,
		};

		res.status(201).send(user);
	},
);

export { router as signUpRouter };
