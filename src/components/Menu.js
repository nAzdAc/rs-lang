import React from 'react';
import { useStyles } from '../styles/componentsStyles/Menu.styles';
import List from '@material-ui/core/List';
import { MenuBook, Settings, Bookmarks, VideogameAsset, ShowChart } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { frontRoutes } from '../utils/frontRoutes';
import { useSelector } from 'react-redux';

export const Menu = () => {
	const { theme } = useSelector((state) => state.settings);
	const classes = useStyles({ theme });
	const { token } = useSelector((state) => state.userData);
	const { block } = useSelector((state) => state);

	return (
		<List className={classes.list}>
			<Link to={block ? '#!' : `${frontRoutes.book}`} className={classes.link}>
				<MenuBook className={classes.icon} />
				<span className={classes.text}>Книга</span>
			</Link>
			<Link to={block ? '#!' : `${frontRoutes.games}`} className={classes.link}>
				<VideogameAsset className={classes.icon} />
				<span className={classes.text}>Игры</span>
			</Link>
			<Link to={block ? '#!' : `${frontRoutes.settings}`} className={classes.link}>
				<Settings className={classes.icon} />
				<span className={classes.text}>Настройки</span>
			</Link>
			{!!token && (
				<React.Fragment>
					<Link to={block ? '#!' : `${frontRoutes.dictionary}`} className={classes.link}>
						<Bookmarks className={classes.icon} />
						<span className={classes.text}>Словарь</span>
					</Link>
					<Link to={block ? '#!' : `${frontRoutes.stats}`} className={classes.link}>
						<ShowChart className={classes.icon} />
						<span className={classes.text}>Статистика</span>
					</Link>
				</React.Fragment>
			)}
		</List>
	);
};
