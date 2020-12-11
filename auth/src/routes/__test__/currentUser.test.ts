import request from 'supertest';
import { app } from '../../app';

it('repsonds with details of the current user', async () => {
	const cookie = await global.signin();
	const response = await request(app)
		.get('/api/users/currentuser')
		.set('cookie', cookie)
		.send()
		.expect(200);

	expect(response.body.currentUser.email).toEqual('test@test.com');
});

it('repsonds with null if not authenticated', async () => {
	const response = await request(app)
		.get('/api/users/currentuser')
		.send()
		.expect(200);

	expect(response.body.currentUser).toEqual(null);
});
