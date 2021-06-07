import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useStyles } from '../styles/componentsStyles/EnterPoint.styles';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../redux/actions';
import { frontRoutes } from '../utils/frontRoutes';

export const EnterPoint = () => {
	const { theme } = useSelector((state) => state.settings);
	const classes = useStyles({ theme });
	const dispatch = useDispatch();
	const { token, avatarURL, userName } = useSelector((state) => state.userData);

	const handleLogOut = () => {
		dispatch(logOut());
	};

	return (
		<React.Fragment>
			{!!token ? (
				<div className={classes.root}>
					<div className={classes.avatarWrap}>
						<Avatar className={classes.avatar} alt={userName || ''} title={userName || ''} src={avatarURL} />
						<p className={classes.name}>{userName || 'raccon :)'}</p>
					</div>
					<ExitToAppIcon className={classes.logout} onClick={handleLogOut} />
				</div>
			) : (
				<Link to={frontRoutes.signIn} className={classes.link}>
					<button className={classes.button}>Войти</button>
				</Link>
			)}
		</React.Fragment>
	);
};
