import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
	translateText: {
		fontFamily: 'inherit',
		color: 'inherit',
		fontStyle: 'italic'
	},
	englishText: {
		fontFamily: 'inherit',
		color: 'inherit',
		fontWeight: '600'
	},
	iconWrap: {
		marginRight: '5px',
		border: 'none',
		outline: 'none',
		cursor: 'pointer',
		fontWeight: 'bold',
		background: 'inherit',
		color: 'inherit'
	},
	icon: {
		cursor: 'pointer',
		fontSize: '2.5rem',
		color: 'inherit',
		'&:hover': {
			transform: 'scale(1.2)'
		},
		'@media (max-width: 900px)': {
			fontSize: '2rem'
		},
		'@media (max-width: 600px)': {
			fontSize: '1.5rem'
		}
	},
	addContainer: {
		backgroundColor: 'inherit',
		fontFamily: 'inherit',
		display: 'flex',
		flexWrap: 'wrap',
		alignItems: 'center',
		justifyContent: 'space-around',
		gap: '20px',
		padding: '10px'
	},
	addImage: {
		width: '200px',
		height: '200px',
		borderRadius: '5px'
	},
	addTextWrapper: {
		display: 'flex',
		flexDirection: 'column',
		flexWrap: 'wrap',
		alignItems: 'center',
		gap: '30px'
	}
});
