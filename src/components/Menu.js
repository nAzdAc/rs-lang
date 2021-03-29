import React from 'react';
import { MenuStyled } from '../styles/Menu.styled'
import List from '@material-ui/core/List';
import {ExpandLess, ExpandMore} from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { Link as RouterLink } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { bookLinks, gamesLinks } from './routeData';
import SettingsIcon from '@material-ui/icons/Settings';

const useStyles = makeStyles({
  settings: {
    '&:hover, &:focus': {
      transform: 'rotate(180deg)',
      transition: '0.5s'
    }
  },
  button: {
		fontWeight: 'bold',
		width: '109px',
		height: '36px',
		background: '#01A299',
		color: '#FFF',
		'&:hover': {
			background: '#00D9CE'
		}
	}
});

const NavItem = ({to, text, onClick, handleClose, Icon}) => {
  const classes = useStyles();
  return (
    <MenuItem component={RouterLink} to={to} onClick={onClick ? (e => handleClose(e, onClick)) : null}>
      {Icon ? <Icon className={classes.settings}/> : <Typography variant='body2' gutterBottom>{text}</Typography>}
    </MenuItem>
  );
}

const Menu = () => {
  const [openBook, setOpenBook] = React.useState(false);
  const [openGames, setOpenGames] = React.useState(false);
  const anchorRefBook = React.useRef(null);
  const anchorRefGames = React.useRef(null);
  const classes = useStyles();


  const handleClickBook = () => {
    setOpenBook((prevOpen) => !prevOpen);
  };

  const handleClickGames = () => {
    setOpenGames((prevOpen) => !prevOpen);
  };

  const handleClose = (event, setOpen) => {
    if (anchorRefBook.current && anchorRefBook.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event, setOpen) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }


  return (
    <>
      <MenuStyled>
        <List>
          <div >
            <NavItem to="/book" text="Книга"/>
            <Button
              ref={anchorRefBook}
              aria-controls={openBook ? 'menu-list-grow' : undefined}
              aria-haspopup="true"
              onClick={handleClickBook}
              className={classes.btn}
            >
              {openBook ? <ExpandLess style={{ color: '#FFFFFF' }}/> : <ExpandMore style={{ color: '#FFFFFF' }}/>}
            </Button>
            <Popper open={openBook} anchorEl={anchorRefBook.current} role={undefined} transition disablePortal>
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={e => handleClose(e, setOpenBook)}>
                      <MenuList autoFocusItem={openBook} id="menu-list-grow" onKeyDown={e => handleListKeyDown(e, setOpenBook)}>
                        {bookLinks.map((link, i) => <NavItem key={i} to={link.to} text={link.text} onClick={handleClickBook} handleClose={handleClose}/>)}
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </div>
          <div>
          <NavItem to="/games" text="Игры"/>
            <Button
              ref={anchorRefGames}
              aria-controls={openGames ? 'menu-list-grow' : undefined}
              aria-haspopup="true"
              onClick={handleClickGames}
            >
              {openGames ? <ExpandLess style={{ color: '#FFFFFF' }}/> : <ExpandMore style={{ color: '#FFFFFF' }}/>}
            </Button>
            <Popper open={openGames} anchorEl={anchorRefGames.current} role={undefined} transition disablePortal>
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={e => handleClose(e, setOpenGames)}>
                      <MenuList autoFocusItem={openGames} id="menu-list-grow" onKeyDown={e => handleListKeyDown(e, setOpenGames)}>
                        {gamesLinks.map((link, i) => <NavItem key={i} to={link.to} text={link.text} onClick={handleClickGames} handleClose={handleClose}/>)}
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </div>
          <NavItem to="/dictionary" text="Словарь"/>
          <NavItem to="/stats" text="Статистика"/>
          <NavItem to="/settings" Icon={SettingsIcon}/>
        </List>
      </MenuStyled>
      <RouterLink to="/signin">
        <Button variant="contained" size="small" className={classes.button} >Войти</Button>
      </RouterLink>
    </>
  )
} 

export default Menu;
