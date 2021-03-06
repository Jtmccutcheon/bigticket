import React from 'react';
import Link from 'next/link';
const Header = ({ currentUser }) => {
	const links = [
		!currentUser && { label: 'Sign Up', href: '/auth/signup' },
		!currentUser && { label: 'Sign In', href: '/auth/signin' },
		currentUser && { label: 'Sign Out', href: 'auth/signout' },
	]
		.filter((linkConfig) => linkConfig) // filter will remove our falsey values
		.map(({ label, href }) => {
			// will return the object(s) remaining
			return (
				<li key={href} className='nav-item'>
					<Link href={href}>
						<a className='nav-link'>{label}</a>
					</Link>
				</li>
			);
		});

	return (
		<nav className='navbar navbar-light bg-light'>
			<Link href='/'>
				<a className='navbar-brand'>GitTix</a>
			</Link>
			<div className='d-flex justify-content-end'>
				<ul className='nav d-flex align-items-center'>{links}</ul>
			</div>
		</nav>
	);
};

export default Header;
