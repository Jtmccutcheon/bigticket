import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import mongoose from 'mongoose';
import { currentUserRouter } from './routes/currentuser';
import { signInRouter } from './routes/signin';
import { signOutRouter } from './routes/signout';
import { signUpRouter } from './routes/signup';
import { errorHandler } from './middlewares/errorHandler';
import { NotFoundError } from './errors/notFoundError';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
	cookieSession({
		signed: false,
		secure: true,
	}),
);

app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter);

app.all('*', async (req, res) => {
	throw new NotFoundError();
});

app.use(errorHandler);

export { app };
