import { HeaderStyled } from '../styles/componentsStyles/Header.styles';
import { Menu } from './Menu';
import { Link } from 'react-router-dom';

export const Header = () => {
	return (
		<HeaderStyled>
			<Link to="/">
				<p>Rs Lang</p>
			</Link>
			<Menu />
		</HeaderStyled>
	);
};
