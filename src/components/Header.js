import { HeaderStyled } from '../styles/Header.styled'
import Menu from './Menu';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';


const Header = () => {
  return (
    <HeaderStyled>
      <Link to='/'>
        <Typography>Rs Lang</Typography>
      </Link>
      <Menu/>
    </HeaderStyled>
  )
} 

export default Header;
