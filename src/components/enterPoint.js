import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import { Link as RouterLink } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { AuthContext } from '../context/AuthContext';
import { useStyles } from '../styles/componentsStyles/EnterPoint.styles';

export const EnterPoint = (props) => {
	const classes = useStyles();

	const { userName, token, avatar, logout } = useContext(AuthContext);
	const isAuthenticated = !!token;

	if (isAuthenticated) {
		return (
			<div className={classes.root}>
				<Avatar alt="Remy Sharp" src={avatar} />
				<Typography variant="body2" className={classes.name}>
					{userName}
				</Typography>
				<ExitToAppIcon className={classes.logout} onClick={logout} />
			</div>
		);
	}
	return (
		<div className={classes.root}>
			<RouterLink to={props.to} className={classes.link}>
				<Button variant="contained" size="small" className={classes.button}>
					Войти
				</Button>
			</RouterLink>
		</div>
	);
};
