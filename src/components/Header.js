import { HeaderStyled } from '../styles/Header.styled';
import Menu from './Menu';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { changeTest } from '../store/testSlice';

const Header = () => {
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(changeTest('logo'));
    console.log('click on main logo');
  };

  return (
    <HeaderStyled onClick={onClick}>
      <Link to="/">
        <p>Rs Lang</p>
      </Link>
      <Menu />
    </HeaderStyled>
  );
};

export default Header;
