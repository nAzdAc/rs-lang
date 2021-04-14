import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { backRoutes } from '../utils/backRoutes';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		boxSizing: 'border-box'
	},
	box: {
		paddingLeft: '0px',
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'left',
		fontSize: '34px',
		gap: '20px',
		marginBottom: '10px'
	},
	title: {
		fontSize: '20px',
		fontStyle: 'normal',
		fontWeight: '700',
		lineHeight: '100%',
		textAlign: 'left',
		color: '#000000',
		verticalAlign: 'middle',
		alignSelf: 'center'
	},
	button: {
		height: '36px',
		width: '180px',
		borderRadius: '4px',
		backgroundColor: '#01a299',
		color: '#ffffff'
	},
	correct: {
		color: 'green'
	},
	wrong: {
		color: 'red'
	}
}));

export default function Answers({ fail, correct, token, userId, wordId }) {
	const classes = useStyles();

	const handleButtonClick = () => {
		backRoutes.createUserWord({
			userId: userId,
		wordId: wordId,
		word: {
			deleted: true,
		},
		token: token,
		});
	};
	return (
		<Box className={classes.box}>
			<Typography className={classes.title} variant="h1" component="h4">
				Правильные ответы: <span className={classes.correct}>{correct ? correct : 0}</span>
			</Typography>
			<Typography className={classes.title} variant="h1" component="h4">
				Ошибки: <span className={classes.wrong}>{fail ? fail : 0}</span>
			</Typography>
			{/* <Button variant="contained" className={classes.button} onClick={handleButtonClick}>
				Удалить
			</Button> */}
		</Box>
	);
}
