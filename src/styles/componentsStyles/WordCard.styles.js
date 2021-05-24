import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
	wordCard: {
		background: 'grey',
		display: 'flex',
		flexWrap: 'wrap',
		alignItems: 'center',
		justifyContent: 'space-around',
		gap: '15px',
		padding: '10px',
		cursor: 'pointer',
		minHeight: '220px'
	},
	cardImage: {
		width: '200px',
		height: '200px',
		borderRadius: '10px'
	},
	cardContent: {
		display: 'flex',
		flexDirection: 'column',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
		marginBottom: '20px'
	},
	cardUnitWrap: {
		display: 'flex',
		flexWrap: 'wrap',
		alignItems: 'center',
		gap: '10px',
		marginBottom: '5px'
	},
	bigCardIcon: {
		cursor: 'pointer',
		fontSize: '50px',
		color: 'black',
		'&:hover': {
			transform: 'scale(1.2)'
		}
	},
	goldIcon: {
		color: 'gold'
	},
	littleCardIcon: {
		cursor: 'pointer',
		fontSize: '30px',
		color: 'black',
		'&:hover': {
			transform: 'scale(1.2)'
		}
	},
	correct: {
		color: 'red'
	},
	fail: {
		color: 'green'
	},
	englishText: {
		color: 'black',
		fontWeight: '600'
	},
	translateText: {
		color: 'black',
		fontStyle: 'italic'
	},
	iconWrap: {
		marginRight: '5px',
		border: 'none',
		outline: 'none',
		cursor: 'pointer',
		fontWeight: 'bold',
		background: 'inherit',
		color: '#FFF'
	}
});
