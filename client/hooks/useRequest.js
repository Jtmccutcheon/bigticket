import axios from 'axios';
import { useState } from 'react';

const useRequest = ({ url, method, body, onSuccess }) => {
	// method will be a str of 'put' 'post' 'get' 'delete'
	const [errors, setErrors] = useState(null);

	const doRequest = async () => {
		try {
			setErrors(null);
			const response = await axios[method](url, body);

			if (onSuccess) {
				onSuccess(response.data);
			}
			return response.data;
		} catch (error) {
			setErrors(
				<div className='alert alert-danger'>
					<h4>Ooops.....</h4>
					<ul className='my-0'>
						{error.response.data.errors.map((e) => {
							return <li key={e.message}>{e.message}</li>;
						})}
					</ul>
				</div>,
			);
		}
	};

	return { doRequest, errors };
};

export default useRequest;
