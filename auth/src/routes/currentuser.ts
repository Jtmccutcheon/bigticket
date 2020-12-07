import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.get('/api/users/currentuser', (req, res) => {
	// if the session doesnt exist with our token on it
	if (!req.session?.jwt) {
		return res.send({ currentUser: null });
	}

	try {
		// verify takes in two arguments the token from the user and our secret
		const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!);
		res.send({ currentUser: payload });
	} catch (error) {
		res.send({ currentUser: null });
	}
});

export { router as currentUserRouter };
