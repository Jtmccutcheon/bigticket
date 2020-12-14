import axios from 'axios';

//

const buildClient = ({ req }) => {
	if (typeof window === 'undefined') {
		// we are on the server

		return axios.create({
			// 'http://auth-srv:3000/api/users/currentuser', // could also use this
			// this url comes from running kubctl get namespace then = kubectl get services -n ingress-nginx
			baseURL:
				'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
			headers: req.headers, // will include host and cookies
		});
	}
	{
		// we are on the brower
		// and that will take care of headers for us
		// dont think we even need to give it the baseURL
		return axios.create({
			baseURL: '/',
		});
	}
};

export default buildClient;
