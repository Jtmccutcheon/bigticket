import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/buildClient';
import Header from '../components/Header';

const AppComponent = ({ Component, pageProps, currentUser }) => {
	// we can also put components that render
	// on every page in here

	return (
		<>
			<Header currentUser={currentUser} />
			<Component {...pageProps} />
		</>
	);
};

// in next js we cant get props inside our component
// we have to do that in this function
// and we will have access to it as props normally
AppComponent.getInitialProps = async (appContext) => {
	const client = buildClient(appContext.ctx);
	const { data } = await client.get('/api/users/currentuser');

	let pageProps = {};
	if (appContext.Component.getInitialProps) {
		pageProps = await appContext.Component.getInitialProps(appContext.ctx);
	}

	return {
		pageProps,
		...data,
	};
};

export default AppComponent;
