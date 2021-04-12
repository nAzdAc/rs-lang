import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { AuthContext } from '../context/AuthContext';
import { backRoutes } from '../utils/backRoutes';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';



const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		boxSizing: 'border-box'
	},
	box: {
		paddingLeft: '40px',
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
		fontSize: '34px',
		gap: '20px',
		marginBottom: '10px'
	},
	title: {
		fontSize: '20px',
		fontStyle: 'normal',
		fontWeight: '300',
		lineHeight: '100%',
		textAlign: 'left',
		color: (group) =>
			group === 0
				? '#BB86FC'
				: group === 1
					? '#985EFF'
					: group === 2
						? '#7F39FB'
						: group === 3 ? '#6200EE' : group === 4 ? '#5600E8' : group === 5 ? '#3700B3' : '#3700B3',
		verticalAlign: 'middle',
		alignSelf: 'center'
	},
	button: {
		height: '36px',
		width: '180px',
		borderRadius: '4px',
		backgroundColor: '#01a299',
		color: '#ffffff'
	}
}));

export default function WordInfo({ group, difficulty, page, userId, wordId, activeWordButton }) {
	const auth = useContext(AuthContext);

	const classes = useStyles(group);
	
	const handleButtonClick = () => {
		console.log('click');
		if (activeWordButton === 1) {
			backRoutes.updateUserWord({
				userId: userId,
				wordId: wordId,
				word: { difficulty: 'weak', optional: { group: difficulty, page: page, deleted: false } },
				token: auth.token
			});
		} else {
			backRoutes.updateUserWord({
				userId: userId,
				wordId: wordId,
				word: { difficulty: 'weak', optional: { group: difficulty, page: page, deleted: false } },
				token: auth.token
			});
		}
	};

	return (
		<Box className={classes.box}>
			<Typography className={classes.title} variant="h1" component="h4">
				Difficulty: {group + 1}
			</Typography>
			<Button variant="contained" className={classes.button} onClick={handleButtonClick}>
				Восстановить
			</Button>
		</Box>
	);
}
