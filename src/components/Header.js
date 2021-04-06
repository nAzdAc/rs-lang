import { HeaderStyled } from '../styles/Header.styled';
import Menu from './Menu';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <HeaderStyled>
      <Link to="/">
        <p>Rs Lang</p>
      </Link>
      <Menu />
    </HeaderStyled>
  );
};

export default Header;
