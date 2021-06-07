import { Paper } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useStyles } from '../styles/pagesStyles/StatsGamesSettings.styles';

export const GameCard = ({ name, todo, to }) => {
	const { theme } = useSelector((state) => state.settings);
	const classes = useStyles({ theme });
	const { level } = useSelector((state) => state);
	return (
		<Paper className={classes.card}>
			<h4 className={classes.subtitle1}>{name}</h4>
			<p className={classes.subtitle2}>{todo}</p>
			<NavLink to={to} className={classes.link}>
				{level !== null && <button className={classes.button}>Начать</button>}
			</NavLink>
		</Paper>
	);
};
