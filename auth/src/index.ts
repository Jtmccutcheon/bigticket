import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session'; // https://www.npmjs.com/package/cookie-session
import { currentUserRouter } from './routes/currentuser';
import { signInRouter } from './routes/signin';
import { signOutRouter } from './routes/signout';
import { signUpRouter } from './routes/signup';
import { errorHandler } from './middlewares/errorHandler';
import { NotFoundError } from './errors/notFoundError';

const app = express();
app.set('trust proxy', true); // traffic is fed through our app using ingress nginx
app.use(json());
app.use(
	cookieSession({
		signed: false, // cookie will not be encrypted becasue we are only storing jwt
		secure: true, // must be using https to make a request to our app
	}),
);

app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter);

// routes that dont exist will throw our custom not found error
app.get('*', async (req, res, next) => {
	next(new NotFoundError());
});

app.use(errorHandler);

const start = async () => {
	if (!process.env.JWT_KEY) {
		throw new Error('JWT_KEY must be defined');
	}

	try {
		await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		});
		console.log('Connected to mongodb');
	} catch (error) {
		console.error(error);
	}
	// if we get past the try catch block we are good to start
	app.listen(3000, () => {
		console.log(`listening on port 3000, busterssssss`);
	});
};

start();
