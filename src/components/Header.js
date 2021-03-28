import { HeaderStyled } from '../styles/Header.styled'
import Menu from './Menu';
import Typography from '@material-ui/core/Typography';


const Header = () => {
  return (
    <HeaderStyled>
      <Typography>Rs Lang</Typography>
      <Menu/>
      
    </HeaderStyled>
  )
} 

export default Header;
