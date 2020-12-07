import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
	id: string;
	email: string;
}

// how to reach in to an existing type definition and add something to it
// and how we are going to add currentUser to the Request Object
declare global {
	namespace Express {
		interface Request {
			currentUser?: UserPayload;
		}
	}
}

export const currentUser = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	if (!req.session?.jwt) {
		return next();
	}
	try {
		// verify takes in two arguments the token from the user and our secret
		const payload = jwt.verify(
			req.session.jwt,
			process.env.JWT_KEY!,
		) as UserPayload;
		req.currentUser = payload;
	} catch (error) {}
	next();
};
