import React, { useContext } from 'react';
import { useStyles } from '../styles/componentsStyles/Menu.styles';
import List from '@material-ui/core/List';
import { MenuBook, Settings, Bookmarks, VideogameAsset, ShowChart } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { frontRoutes } from '../utils/frontRoutes';
import { EnterPoint } from '../components/EnterPoint';
import { AuthContext } from '../context/AuthContext';

export const Menu = () => {
	const classes = useStyles();
	const { token } = useContext(AuthContext);

	return (
		<React.Fragment>
			<List className={classes.list}>
				<Link to={frontRoutes.book} className={classes.link}>
					<MenuBook className={classes.icon} />
					<Typography className={classes.text} variant="h5">
						Книга
					</Typography>
				</Link>
				<Link to={frontRoutes.games} className={classes.link}>
					<VideogameAsset className={classes.icon} />
					<Typography className={classes.text} variant="h5">
						Игры
					</Typography>
				</Link>
				<Link to={frontRoutes.settings} className={classes.link}>
					<Settings className={classes.icon} />
					<Typography className={classes.text} variant="h5">
						Настройки
					</Typography>
				</Link>
				{token && (
					<React.Fragment>
						<Link to={frontRoutes.dictionary} className={classes.link}>
							<Bookmarks className={classes.icon} />
							<Typography className={classes.text} variant="h5">
								Словарь
							</Typography>
						</Link>
						<Link to={frontRoutes.stats} className={classes.link}>
							<ShowChart className={classes.icon} />
							<Typography className={classes.text} variant="h5">
								Статистика
							</Typography>
						</Link>
					</React.Fragment>
				)}
			</List>
			<EnterPoint link={frontRoutes.signIn} />
		</React.Fragment>
	);
};
