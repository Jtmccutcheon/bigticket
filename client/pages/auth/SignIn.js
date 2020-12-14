import React, { useState } from 'react';
import useRequest from '../../hooks/useRequest';
import Router from 'next/router';

const SignIn = () => {
	const [user, setUser] = useState({
		email: '',
		password: '',
	});
	const { doRequest, errors } = useRequest({
		url: '/api/users/signin',
		method: 'post',
		body: user,
		onSuccess: () => Router.push('/'),
	});

	const changeHandler = (e) => {
		setUser({
			...user,
			[e.target.name]: e.target.value,
		});
	};

	const submitHandler = async (e) => {
		e.preventDefault();

		doRequest();

		// console.log(response.data);
	};

	return (
		<form onSubmit={submitHandler}>
			<h1>Sign In</h1>

			<div className='form-groups'>
				<label>Email Address</label>
				<input
					name='email'
					value={user.email}
					onChange={changeHandler}
					className='form-control'
					autoComplete='email'
				></input>
			</div>
			<div className='form-groups'>
				<label>Password</label>
				<input
					name='password'
					value={user.password}
					onChange={changeHandler}
					type='password'
					className='form-control'
					autoComplete='current-password'
				></input>
			</div>
			{errors}
			<button className='btn btn-primary'>Sign In</button>
		</form>
	);
};

export default SignIn;
