import express from 'express';
import jwt from 'jsonwebtoken';
import { currentUser } from '../middlewares/currentUser';

const router = express.Router();

router.get('/api/users/currentuser', currentUser, (req, res) => {
	res.send({ currentUser: req.currentUser || null }); // null if we dont pass current User middleware
});

export { router as currentUserRouter };
