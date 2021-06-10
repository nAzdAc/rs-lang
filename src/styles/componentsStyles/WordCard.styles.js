import { makeStyles } from '@material-ui/core/styles';
import { icons } from '../../assets/icons/IconsRequire';

export const useStyles = makeStyles({
	wordCard: (props) => ({
		fontFamily: 'inherit',
		color: 'inherit',
		backgroundColor: 'inherit',
		boxShadow:
			props.theme === 'dark' ? '3px 0px 10px 3px rgba(227, 134, 0, 0.5)' : '3px 0px 10px 3px rgba(86, 0, 232, 0.6)',
		display: 'flex',
		flexDirection: 'column',
		flexWrap: 'wrap',
		alignItems: 'center',
		gap: '15px',
		padding: '10px 5px',
		cursor: props.theme === 'dark' ? `url(${icons.darkPointer}), default` : `url(${icons.lightPointer}), default`
	}),
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
	deleteButton: (props) => ({
		background: props.theme === 'dark' ? '#E38600' : '#5600E8',
		color: props.theme === 'dark' ? '#141414' : '#F2F2F2',
		fontFamily: 'inherit',
		fontSize: '0.8rem',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-around',
		cursor: props.theme === 'dark' ? `url(${icons.darkPointer}), default` : `url(${icons.lightPointer}), default`,
		border: 'none',
		borderRadius: '6px',
		padding: '5px',
		outline: 'none',
		fontWeight: 'bold',
		height: '36px',
		marginRight: '12px',
		marginLeft: '5px',
		'&:hover': {
			transform: 'scale(1.1)'
		},
		'@media (max-width: 768px)': {
			fontSize: '0.65rem'
		}
	}),
	iconWrap: (props) => ({
		marginRight: '5px',
		border: 'none',
		outline: 'none',
		cursor: props.theme === 'dark' ? `url(${icons.darkPointer}), default` : `url(${icons.lightPointer}), default`,
		fontWeight: 'bold',
		background: 'inherit',
		color: 'inherit'
	}),
	bigCardIcon: (props) => ({
		cursor: props.theme === 'dark' ? `url(${icons.darkPointer}), default` : `url(${icons.lightPointer}), default`,
		fontSize: '3rem',
		color: 'inherit',
		'&:hover': {
			transform: 'scale(1.1)'
		},
		'@media (max-width: 800px)': {
			fontSize: '2rem'
		},
		'@media (max-width: 600px)': {
			fontSize: '1.5rem'
		}
	}),
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
	littleCardIcon: (props) => ({
		cursor: props.theme === 'dark' ? `url(${icons.darkPointer}), default` : `url(${icons.lightPointer}), default`,
		fontSize: '2rem',
		color: 'inherit',
		'&:hover': {
			transform: 'scale(1.1)'
		},
		'@media (max-width: 800px)': {
			fontSize: '1.5rem'
		},
		'@media (max-width: 600px)': {
			fontSize: '1rem'
		}
	}),
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
			transform: 'scale(1.1)'
		},
		'@media (max-width: 800px)': {
			fontSize: '2.5rem'
		},
		'@media (max-width: 600px)': {
			fontSize: '2rem'
		}
	}
});
