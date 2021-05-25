import React from 'react';
import Button from '@material-ui/core/Button';
import { Link as RouterLink } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useStyles } from '../styles/componentsStyles/EnterPoint.styles';
import { useDispatch, useSelector } from 'react-redux';
import { reduxLogOut } from '../redux/actions';

export const EnterPoint = ({ link }) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const { token, avatarURL, userName } = useSelector((state) => state.userData);

	const handleLogOut = () => {
		dispatch(reduxLogOut());
	};

	return (
		<React.Fragment>
			{!!token ? (
				<div className={classes.root}>
					<div className={classes.avatarWrap}>
						<Avatar className={classes.avatar} alt={userName || ''} title={userName || ''} src={avatarURL} />
						<Typography variant="body2" className={classes.name}>
							{userName || 'raccon :)'}
						</Typography>
					</div>
					<ExitToAppIcon className={classes.logout} onClick={handleLogOut} />
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
