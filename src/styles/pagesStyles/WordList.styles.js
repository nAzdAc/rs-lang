import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
	root: {
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		flexWrap: 'wrap',
		justifyContent: 'center',
		alignItems: 'center'
	},
	title: {
		marginBottom: '25px',
		marginRight: 'auto',
		'@media (max-width: 800px)': {
			fontSize: '3.5rem'
		}
	},
	buttonBox: {
		display: 'flex',
		flexWrap: 'wrap',
		marginBottom: '20px',
		gap: '30px',
		marginRight: 'auto',
		'@media (max-width: 800px)': {
			gap: '20px'
		}
	},
	typeBox: {
		width: '100%',
		display: 'flex',
		marginBottom: '20px'
	},
	typeButton: {
		width: '100%',
		height: '50px',
		fontSize: '1rem',
		fontWeight: '500',
		color: 'white',
		backgroundColor: '#6200EE',
		borderRadius: '0',
		padding: '2px',
		'@media (max-width: 800px)': {
			fontSize: '0.7rem'
		}
	},
	typeButtonActive: {
		borderBottom: '4px solid white',
		color: 'white',
		backgroundColor: '#6200EE'
	},
	subtitle: {
		marginBottom: '15px',
		marginRight: 'auto'
	},
	link: {
		textDecoration: 'none',
		color: '#fff',
		width: '100%',
		height: '100%'
	},
	pagination: {
		display: 'flex',
		margin: '25px',
		fontSize: '40px',
		justifyContent: 'center'
	},
	titleGames: {
		marginBottom: '24px'
	},
	gamesButtonsWrapper: {
		width: '500px',
		display: 'flex',
		justifyContent: 'space-between'
	},
	gamesWrapper: {
		width: '100%',
		marginTop: '24px',
		textAlign: 'left'
	},
	wordList: {
		display: 'flex',
		flexDirection: 'column',
		gap: '20px'
	},
	levelTitle: {
		marginBottom: '20px',
		color: (group) =>
			group === 0
				? '#BB86FC'
				: group === 1
					? '#985EFF'
					: group === 2
						? '#7F39FB'
						: group === 3 ? '#6200EE' : group === 4 ? '#5600E8' : group === 5 ? '#3700B3' : '#3700B3',
		'@media (max-width: 800px)': {
			fontSize: '2.5rem'
		}
	}
});
