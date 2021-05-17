import { Button, Paper, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useStyles } from '../styles/pagesStyles/StatsGamesSettings.styles';

export const GameCard = ({ name, todo, to }) => {
	const classes = useStyles();
	const { level } = useSelector(state => state);
	return (
		<Paper className={classes.card}>
			<Typography variant="h4" className={classes.cardTitle}>
				{name}
			</Typography>
			<Typography variant="subtitle1" className={classes.cardText}>
				{todo}
			</Typography>
			<NavLink to={to} className={classes.link}>
				{level !== null ? (
					<Button className={classes.button} variant="contained" size="medium">
						Начать
					</Button>
				) : null}
			</NavLink>
		</Paper>
	);
};
