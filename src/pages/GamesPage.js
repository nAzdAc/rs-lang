import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const cards = [
	{
		name: 'Саванна',
		todo: 'Сверху падает английское слово, надо выбрать его русский аналог'
	},
	{
		name: 'Аудио вызов',
		todo:
			'Мини-игра «Аудиовызов» - это тренировка, развивающая навыки речи и перевода. Вы слышите слово и видите 5 вариантов перевода.'
	},
	{
		name: 'Спринт',
		todo: 'Вам дается слово с переводом. Вы должны отметить, подходит ли этот перевод к слову. Игра идет на время.'
	},
	{
		name: 'Сопоставьте картинку',
		todo:
			'Вам дается слово и вариант его использования. Нужно определить, какая картинка из четырех предложенных подходит под описание.'
	}
];

const useStyles = makeStyles({
	root: {
		display: 'flex',
		flexDirection: 'column',
		flexWrap: 'wrap',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	card: {
		display: 'flex',
		flexDirection: 'column',
		flexWrap: 'wrap',
		alignItems: 'flex-start',
		justifyContent: 'space-around'
	},
	button: {
		width: '109px',
		height: '36px',
		background: '#01A299',
		color: '#FFF'
	}
});

export const GamesPage = () => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			{cards.map((card, index) => {
        console.log(card)
				return (
					<div className={classes.card}
          key={index}>
						<Typography  variant="h2" className={classes.title} gutterBottom={card.name}>
              card
						</Typography>
            <Typography variant="h3" className={classes.title} gutterBottom={card.todo}>
						</Typography>
						<Button variant="contained" size="medium" className={classes.button}>
							Начать
						</Button>
					</div>
				);
			})}
		</div>
	);
};
