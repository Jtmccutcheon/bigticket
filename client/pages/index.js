import axios from 'axios';

const LandingPage = ({ currentUser }) => {
	console.log(currentUser);

	return <h1>lading page</h1>;
};

// in next js we cant get props inside our component
// we have to do that in this function
// and we will have access to it as props normally
LandingPage.getInitialProps = async () => {
	const response = await axios.get('/api/users/currentuser');
	return response.data;
};
export default LandingPage;
