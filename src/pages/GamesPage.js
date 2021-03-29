import React from 'react';
import { NavLink } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { gameCardsContent } from '../utils/initConsts';

const useStyles = makeStyles({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		alignItems: 'center',
		padding: '30px 0px 20px 30px'
	},
	card: {
		width: '350px',
		height: '300px',
		display: 'flex',
		flexDirection: 'column',
		flexWrap: 'wrap',
		alignItems: 'flex-start',
		justifyContent: 'space-around',
		border: '2px solid #000',
		marginRight: '50px',
		marginBottom: '30px',
		padding: '0px 20px 10px 20px',
		'&:hover': {
			transform: 'translateY(-5px)',
			boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)'
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

export const GamesPage = () => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			{gameCardsContent.map((card, index) => {
				return (
					<div className={classes.card} key={index}>
						<Typography variant="h3" className={classes.title}>
							{card.name}
						</Typography>
						<Typography variant="h5" className={classes.title}>
							Как играть:
						</Typography>
						<Typography variant="subtitle1" className={classes.title}>
							{card.todo}
						</Typography>
						<NavLink style={{ textDecoration: 'none' }} to={card.to}>
							<Button variant="contained" size="medium" className={classes.button}>
								Начать
							</Button>
						</NavLink>
					</div>
				);
			})}
		</div>
	);
};
