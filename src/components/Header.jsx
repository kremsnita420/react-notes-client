import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/vite.svg';

import { UserButton } from '@clerk/clerk-react';
const Header = () => {
	// const { isLoaded, session, isSignedIn } = useSession();
	// console.log(session.user.id);
	return (
		<header>
			<Link to='/' className='logo'>
				<img src={logo} alt='Header logo' />
			</Link>
			<nav>
				<NavLink to='/'>Home</NavLink>
				<NavLink to='/about'>About</NavLink>
				<NavLink to='/add-note'>+Add note</NavLink>
				<UserButton />
			</nav>
		</header>
	);
};

export default Header;
