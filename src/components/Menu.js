import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { MenuStyled, useStyles } from '../styles/componentsStyles/Menu.styles';
import List from '@material-ui/core/List';
import { ExpandLess, ExpandMore, MenuBook, Settings, Bookmarks, VideogameAsset, ShowChart } from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { Link as RouterLink } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { bookLinks, gamesLinks } from '../utils/links';
import { useHistory } from 'react-router-dom';
import { frontRoutes } from '../utils/frontRoutes';
import { EnterPoint } from '../components/EnterPoint';

const NavItem = ({ to, text, onClick, handleClose, Icon, navClass }) => {
	const classes = useStyles();

	return (
		<MenuItem
			className={navClass}
			component={RouterLink}
			to={to}
			onClick={onClick ? (e) => handleClose(e, onClick) : null}
		>
			{Icon ? (
				<Icon className={classes.settings} />
			) : (
				<Typography variant="body2" gutterBottom>
					{text}
				</Typography>
			)}
		</MenuItem>
	);
};

export const Menu = () => {
	const [ openBook, setOpenBook ] = React.useState(false);
	const [ openGames, setOpenGames ] = React.useState(false);
	const anchorRefBook = React.useRef(null);
	const anchorRefGames = React.useRef(null);
	const classes = useStyles();
	const { token } = useContext(AuthContext);
	const {
		// eslint-disable-next-line no-unused-vars
		location: { pathname }
	} = useHistory();

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
		<React.Fragment>
			<MenuStyled>
				<List>
					<div>
						<NavItem to={frontRoutes.book} text="Книга" navClass={classes.full} />
						<NavItem to={frontRoutes.book} Icon={MenuBook} navClass={classes.icon} />
						<Button
							ref={anchorRefBook}
							aria-controls={openBook ? 'menu-list-grow' : undefined}
							aria-haspopup="true"
							onClick={handleClickBook}
							className={classes.btn}
						>
							{openBook ? <ExpandLess style={{ color: '#FFFFFF' }} /> : <ExpandMore style={{ color: '#FFFFFF' }} />}
						</Button>
						<Popper open={openBook} anchorEl={anchorRefBook.current} role={undefined} transition disablePortal>
							{({ TransitionProps, placement }) => (
								<Grow
									{...TransitionProps}
									style={{
										transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'
									}}
								>
									<Paper>
										<ClickAwayListener onClickAway={(e) => handleClose(e, setOpenBook)}>
											<MenuList
												autoFocusItem={openBook}
												id="menu-list-grow"
												onKeyDown={(e) => handleListKeyDown(e, setOpenBook)}
											>
												{bookLinks.map((link, i) => (
													<NavItem
														key={i}
														to={`/book${link.to}`}
														text={link.text}
														onClick={handleClickBook}
														handleClose={handleClose}
													/>
												))}
											</MenuList>
										</ClickAwayListener>
									</Paper>
								</Grow>
							)}
						</Popper>
					</div>
					<div>
						<NavItem to={frontRoutes.games} text="Игры" navClass={classes.full} />
						<NavItem to={frontRoutes.games} Icon={VideogameAsset} navClass={classes.icon} />
						<Button
							ref={anchorRefGames}
							aria-controls={openGames ? 'menu-list-grow' : undefined}
							aria-haspopup="true"
							onClick={handleClickGames}
						>
							{openGames ? <ExpandLess style={{ color: '#FFFFFF' }} /> : <ExpandMore style={{ color: '#FFFFFF' }} />}
						</Button>
						<Popper open={openGames} anchorEl={anchorRefGames.current} role={undefined} transition disablePortal>
							{({ TransitionProps, placement }) => (
								<Grow
									{...TransitionProps}
									style={{
										transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'
									}}
								>
									<Paper>
										<ClickAwayListener onClickAway={(e) => handleClose(e, setOpenGames)}>
											<MenuList
												autoFocusItem={openGames}
												id="menu-list-grow"
												onKeyDown={(e) => handleListKeyDown(e, setOpenGames)}
											>
												{gamesLinks.map((link, i) => (
													<NavItem
														key={i}
														to={link.to}
														text={link.text}
														onClick={handleClickGames}
														handleClose={handleClose}
													/>
												))}
											</MenuList>
										</ClickAwayListener>
									</Paper>
								</Grow>
							)}
						</Popper>
					</div>
					{token ? (
						<React.Fragment>
							<NavItem to={frontRoutes.dictionary} text="Словарь" navClass={classes.full} />
							<NavItem to={frontRoutes.dictionary} Icon={Bookmarks} navClass={classes.icon} />
							<NavItem to={frontRoutes.stats} text="Статистика" navClass={classes.full} />
							<NavItem to={frontRoutes.stats} Icon={ShowChart} navClass={classes.icon} />
							<NavItem to={frontRoutes.settings} Icon={Settings} />
						</React.Fragment>
					) : null}
				</List>
			</MenuStyled>
			<EnterPoint to={frontRoutes.signIn} />
		</React.Fragment>
	);
};
