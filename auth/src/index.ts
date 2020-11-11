import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import { currentUserRouter } from './routes/currentuser';
import { signInRouter } from './routes/signin';
import { signOutRouter } from './routes/signout';
import { signUpRouter } from './routes/signup';
import { errorHandler } from './middlewares/errorHandler';
import { NotFoundError } from './errors/notFoundError';

const app = express();
app.use(json());

app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter);

// routes that dont exist will throw our custom not found error
app.get('*', async (req, res, next) => {
	next(new NotFoundError());
});

app.use(errorHandler);

app.listen(3000, () => {
	console.log(`listening on port 3000, busterssssss`);
});
