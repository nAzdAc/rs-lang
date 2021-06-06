import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
	wordCard: {
		fontFamily: 'inherit',
		color: 'inherit',
		backgroundColor: 'inherit',
		boxShadow: '3px 0px 10px 3px rgba(0,0,0,0.25)',
		display: 'flex',
		flexDirection: 'column',
		flexWrap: 'wrap',
		alignItems: 'center',
		gap: '15px',
		padding: '10px 5px',
		cursor: 'pointer'
	},
	mainInfo: {
		fontFamily: 'inherit',
		display: 'flex',
		justifyContent: 'space-around',
		alignItems: 'center'
	},
	cardImage: {
		width: '200px',
		height: '200px',
		borderRadius: '5px',
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
	lightDeleteButton: {
		background: '#5600E8',
		color: '#F2F2F2',
		fontFamily: 'inherit',
		fontSize: '0.8rem',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-around',
		cursor: 'pointer',
		border: 'none',
		borderRadius: '6px',
		padding: '5px',
		outline: 'none',
		fontWeight: 'bold',
		height: '36px',
		marginRight: '12px',
		marginLeft: '5px',
		'&:hover': {
			transform: 'scale(1.2)'
		},
		'@media (max-width: 768px)': {
			fontSize: '0.65rem'
		}
	},
	darkDeleteButton: {
		background: '#E38600',
		color: '#141414',
		fontFamily: 'inherit',
		fontSize: '0.8rem',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-around',
		cursor: 'pointer',
		border: 'none',
		borderRadius: '6px',
		padding: '5px',
		outline: 'none',
		fontWeight: 'bold',
		height: '36px',
		marginRight: '12px',
		marginLeft: '5px',
		'&:hover': {
			transform: 'scale(1.2)'
		},
		'@media (max-width: 768px)': {
			fontSize: '0.65rem'
		}
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
	bigCardIcon: {
		cursor: 'pointer',
		fontSize: '3rem',
		color: 'inherit',
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
		alignText: 'center',
		gap: '10px',
		marginBottom: '5px'
	},
	cardUnitPlayWrap: {
		display: 'flex',
		alignItems: 'center',
		alignText: 'center',
		flexWrap: 'wrap'
	},
	littleCardIcon: {
		cursor: 'pointer',
		fontSize: '2rem',
		color: 'inherit',
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
		color: '#28FC03',
		fontSize: '2.5rem',
		'@media (max-width: 1300px)': {
			fontSize: '2rem'
		},
		'@media (max-width: 1000px)': {
			fontSize: '1.5rem'
		},
		'@media (max-width: 768px)': {
			fontSize: '1.1rem'
		}
	},
	failText: {
		color: '#FF001E',
		fontSize: '2.5rem',
		'@media (max-width: 1300px)': {
			fontSize: '2rem'
		},
		'@media (max-width: 1000px)': {
			fontSize: '1.5rem'
		},
		'@media (max-width: 768px)': {
			fontSize: '1.1rem'
		}
	},
	englishText: {
		fontFamily: 'inherit',
		color: 'inherit',
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
		color: 'inherit',
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
		fontSize: '2.5rem',
		'@media (max-width: 1300px)': {
			fontSize: '1.8rem'
		},
		'@media (max-width: 1000px)': {
			fontSize: '1.4rem'
		},
		'@media (max-width: 800px)': {
			fontSize: '1rem'
		},
		'@media (max-width: 600px)': {
			fontSize: '0.85rem'
		}
	},
	infoText: {
		fontSize: '2rem',
		'@media (max-width: 1300px)': {
			fontSize: '1.6rem'
		},
		'@media (max-width: 1000px)': {
			fontSize: '1.2rem'
		},
		'@media (max-width: 800px)': {
			fontSize: '0.8rem'
		},
		'@media (max-width: 600px)': {
			fontSize: '0.65rem'
		}
	},
	additionalInfo: {
		display: 'flex',
		flexDirection: 'column',
		alignSelf: 'auto',
		marginTop: '30px'
	},
	goldIcon: {
		color: '#FFD700',
		fontSize: '3.5rem',
		'&:hover': {
			transform: 'scale(1.2)'
		},
		'@media (max-width: 800px)': {
			fontSize: '2.5rem'
		},
		'@media (max-width: 600px)': {
			fontSize: '2rem'
		}
	}
});
