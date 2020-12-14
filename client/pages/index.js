import buildClient from '../api/buildClient';
const LandingPage = ({ currentUser }) => {
	console.log(currentUser);

	return <h1>lading page</h1>;
};

// in next js we cant get props inside our component
// we have to do that in this function
// and we will have access to it as props normally
LandingPage.getInitialProps = async (context) => {
	const { data } = await buildClient(context).get('/api/users/currentuser');
	return data;
};
export default LandingPage;
