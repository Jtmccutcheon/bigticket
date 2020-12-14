import axios from 'axios';

const LandingPage = ({ currentUser }) => {
	console.log(currentUser);

	return <h1>lading page</h1>;
};

// in next js we cant get props inside our component
// we have to do that in this function
// and we will have access to it as props normally
LandingPage.getInitialProps = async () => {
	if (typeof window === 'undefined') {
		// we are on the server
		// requests made to full endpoint

		const { data } = await axios.get(
			// 'http://auth-srv:3000/api/users/currentuser', // could also use this
			// ingress-nginx-controller comes from this command kubectl get services -n ingress-nginx

			'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser',
			{
				headers: { Host: 'ticketing.dev' },
			},
		);

		return data;
	} else {
		// we are on the browser
		// requests can be short hand
		const { data } = await axios.get('/api/users/currentuser');
		return data;
	}
};
export default LandingPage;
