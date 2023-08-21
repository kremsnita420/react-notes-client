import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/vite.svg';
const Header = () => {
	return (
		<header>
			<Link to='/' className='logo'>
				<img src={logo} alt='Header logo' />
			</Link>
			<nav>
				<NavLink to='/'>Home</NavLink>
				<NavLink to='/about'>About</NavLink>
				<NavLink to='/add-note'>+Add note</NavLink>
			</nav>
		</header>
	);
};

export default Header;
