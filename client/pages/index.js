import buildClient from '../api/buildClient';
const LandingPage = ({ currentUser }) => {
	return currentUser ? (
		<h1>you are signed in</h1>
	) : (
		<h1>you are not signed in</h1>
	);
};

// in next js we cant get props inside our component
// we have to do that in this function
// and we will have access to it as props normally
LandingPage.getInitialProps = async (context) => {
	const { data } = await buildClient(context).get('/api/users/currentuser');
	return data;
};
export default LandingPage;
