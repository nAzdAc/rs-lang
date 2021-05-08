import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import { Link as RouterLink } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { AuthContext } from '../context/AuthContext';
import { useStyles } from '../styles/componentsStyles/EnterPoint.styles';

export const EnterPoint = ({ link }) => {
	const classes = useStyles();

	const { isAuthenticated, userName, avatar, logout } = useContext(AuthContext);

	return (
		<React.Fragment>
			{isAuthenticated ? (
				<div className={classes.root}>
					<div className={classes.avatarWrap}>
						<Avatar className={classes.avatar} alt="Remy Sharp" src={avatar} />
						<Typography variant="body2" className={classes.name}>
							{userName}
						</Typography>
					</div>
					<ExitToAppIcon className={classes.logout} onClick={logout} />
				</div>
			) : (
				<RouterLink to={link} className={classes.link}>
					<Button variant="contained" size="small" className={classes.button}>
						Войти
					</Button>
				</RouterLink>
			)}
		</React.Fragment>
	);
};
