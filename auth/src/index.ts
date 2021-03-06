import mongoose from 'mongoose';
import { app } from './app';

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
