import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
	wordCard: {
		display: 'flex',
		flexDirection: 'column',
		flexWrap: 'wrap',
		alignItems: 'center',
		gap: '15px',
		padding: '10px',
		cursor: 'pointer'
	},
	mainInfo: {
		display: 'flex',
		justifyContent: 'space-around',
		alignItems: 'center'
	},
	cardImage: {
		width: '200px',
		height: '200px',
		borderRadius: '10px',
		marginRight: '10px',
		'@media (max-width: 600px)': {
			width: '150px',
			height: '150px'
		}
	},
	cardContent: {
		display: 'flex',
		flexDirection: 'column',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
		marginBottom: '20px'
	},
	infoPanel: {
		display: 'flex',
		flexWrap: 'wrap',
		alignItems: 'center',
		marginBottom: '80px',
		'@media (max-width: 600px)': {
			marginBottom: '50px'
		}
	},
	deleteButton: {
		cursor: 'pointer',
		border: 'none',
		borderRadius: '5px',
		padding: '5px',
		outline: 'none',
		fontWeight: 'bold',
		height: '50px',
		background: '#01A299',
		color: '#FFF',
		marginRight: '10px',
		'&:hover': {
			background: '#00D9CE'
		}
	},
	iconWrap: {
		marginRight: '5px',
		border: 'none',
		outline: 'none',
		cursor: 'pointer',
		fontWeight: 'bold',
		background: 'inherit',
		color: '#FFF'
	},
	goldIcon: {
		color: 'gold'
	},
	bigCardIcon: {
		cursor: 'pointer',
		fontSize: '3rem',
		color: 'black',
		'&:hover': {
			transform: 'scale(1.2)'
		},
		'@media (max-width: 800px)': {
			fontSize: '2rem'
		},
		'@media (max-width: 600px)': {
			fontSize: '1.5rem'
		}
	},
	cardUnitWrap: {
		display: 'flex',
		flexWrap: 'wrap',
		alignItems: 'center',
		gap: '10px',
		marginBottom: '5px'
	},
	littleCardIcon: {
		cursor: 'pointer',
		fontSize: '2rem',
		color: 'black',
		'&:hover': {
			transform: 'scale(1.2)'
		},
		'@media (max-width: 800px)': {
			fontSize: '1.5rem'
		},
		'@media (max-width: 600px)': {
			fontSize: '1rem'
		}
	},
	correctText: {
		color: 'red',
		fontSize: '2.5rem',
		'@media (max-width: 1300px)': {
			fontSize: '2rem'
		},
		'@media (max-width: 1000px)': {
			fontSize: '1.5rem'
		},
		'@media (max-width: 800px)': {
			fontSize: '1.25rem'
		}
	},
	failText: {
		color: 'green',
		fontSize: '2.5rem',
		'@media (max-width: 1300px)': {
			fontSize: '2rem'
		},
		'@media (max-width: 1000px)': {
			fontSize: '1.5rem'
		},
		'@media (max-width: 800px)': {
			fontSize: '1.25rem'
		}
	},
	englishText: {
		color: 'black',
		fontWeight: '600',
		fontSize: '2rem',
		'@media (max-width: 1300px)': {
			fontSize: '1.5rem'
		},
		'@media (max-width: 1000px)': {
			fontSize: '1rem'
		},
		'@media (max-width: 800px)': {
			fontSize: '0.8rem'
		},
		'@media (max-width: 600px)': {
			fontSize: '0.7rem'
		}
	},
	translateText: {
		color: 'black',
		fontStyle: 'italic',
		fontSize: '2rem',
		'@media (max-width: 1300px)': {
			fontSize: '1.5rem'
		},
		'@media (max-width: 1000px)': {
			fontSize: '1rem'
		},
		'@media (max-width: 800px)': {
			fontSize: '0.8rem'
		},
		'@media (max-width: 600px)': {
			fontSize: '0.7rem'
		}
	},
	wordText: {
		fontSize: '3rem',
		'@media (max-width: 1300px)': {
			fontSize: '2rem'
		},
		'@media (max-width: 1000px)': {
			fontSize: '1.5rem'
		},
		'@media (max-width: 800px)': {
			fontSize: '1rem'
		},
		'@media (max-width: 600px)': {
			fontSize: '0.85rem'
		}
	},
	additionalInfo: {
		display: 'flex',
		flexDirection: 'column',
		alignSelf: 'auto',
		marginTop: '30px'
	}
});
