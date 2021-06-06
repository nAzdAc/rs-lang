import Switch from '@material-ui/core/Switch';
import Slider from '@material-ui/core/Slider';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';

export const useStyles = makeStyles({
	root: {
		fontFamily: 'inherit',
		color: 'inherit',
		background: 'inherit',
		padding: '20px 10px 10px 20px',
		display: 'flex',
		flexDirection: 'column',
		'& > header': {
			background: 'inherit'
		}
	},
	buttonsWrapper: {
		width: '200px',
		display: 'flex',
		flexWrap: 'wrap',
		alignItems: 'center',
		textAlign: 'center',
		justifyContent: 'space-between',
		marginBottom: '10px',
		color: 'inherit',
		backgroundColor: 'inherit',
		'& .MuiSwitch-root': {
			color: 'inherit'
		}
	},
	title: {
		color: 'inherit',
		fontSize: '5rem',
		marginBottom: '25px',
		fontFamily: 'inherit',
		marginRight: 'auto',
		'@media (max-width: 768px)': {
			fontSize: '3.5rem'
		}
	},
	gameTitle: {
		fontSize: '3.5rem',
		marginBottom: '10px',
		fontFamily: 'inherit',
		marginRight: 'auto',
		'@media (max-width: 768px)': {
			fontSize: '2.5rem'
		}
	},
	subtitle1: {
		fontFamily: 'inherit',
		fontSize: '1.5rem',
		fontWeight: '650',
		marginRight: 'auto',
		marginBottom: '15px'
	},
	subtitle2: {
		fontFamily: 'inherit',
		fontSize: '1.05rem',
		fontWeight: '500',
		marginRight: 'auto'
	},
	avatarImage: {
		width: '100px',
		height: '100px',
		borderRadius: '50%',
		margin: '20px'
	},
	lightButton: {
		padding: '3px',
		width: '100%',
		height: '36px',
		background: '#5600E8',
		color: '#F2F2F2',
		fontFamily: 'inherit',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-around',
		borderRadius: '6px',
		cursor: 'pointer',
		outline: 'none',
		border: 'none',
		fontSize: '1rem',
		'&:hover': {
			transform: 'scale(1.2)'
		}
	},
	darkButton: {
		padding: '3px',
		width: '100%',
		height: '36px',
		background: '#E38600',
		color: '#141414',
		fontFamily: 'inherit',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-around',
		borderRadius: '6px',
		cursor: 'pointer',
		outline: 'none',
		border: 'none',
		fontSize: '1rem',
		'&:hover': {
			transform: 'scale(1.2)'
		}
	},
	outlainedLightButton: {
		padding: '3px',
		height: '36px',
		fontFamily: 'inherit',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-around',
		borderRadius: '6px',
		cursor: 'pointer',
		outline: 'none',
		fontSize: '1rem',
		width: '130px',
		background: '#F2F2F2',
		color: '#5600E8',
		border: '3px solid #5600E8',
		marginLeft: '40px',
		'&:hover': {
			transform: 'scale(1.2)'
		}
	},
	outlainedDarkButton: {
		padding: '3px',
		height: '36px',
		fontFamily: 'inherit',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-around',
		borderRadius: '6px',
		cursor: 'pointer',
		outline: 'none',
		fontSize: '1rem',
		width: '130px',
		background: '#141414',
		color: '#E38600',
		border: '3px solid #E38600',
		marginLeft: '40px',
		'&:hover': {
			transform: 'scale(1.2)'
		}
	},
	buttonBox: {
		display: 'flex',
		flexWrap: 'wrap',
		marginBottom: '20px',
		gap: '30px'
	},
	cardsWrap: {
		display: 'flex',
		flexWrap: 'wrap'
	},
	card: {
		backgroundColor: 'inherit',
		color: 'inherit',
		fontFamily: 'inherit',
		padding: '20px 30px 20px 30px',
		width: '230px',
		margin: '20px',
		display: 'flex',
		flexDirection: 'column',
		gap: '10px',
		alignItems: 'center',
		boxShadow: '3px 0px 10px 3px rgba(0,0,0,0.25)'
	},
	cardTitle: {
		marginBottom: '10px',
		marginRight: 'auto'
	},
	cardText: {
		marginBottom: '10px'
	},
	link: { textDecoration: 'none', color: 'inherit', fontStyle: 'inherit' },
	tabsContainer: {
		backgroundColor: 'inherit',
		color: 'inherit',
		width: '100%',
		maxWidth: '600px'
	},
	lightTab: {
		backgroundColor: '#5600E8',
		color: '#F2F2F2',
		'& .MuiTab-root': {
			fontWeight: '600',
			fontFamily: 'inherit'
		},
		'& .MuiTabs-indicator': {
			height: '4px',
			backgroundColor: '#BB86FC'
		}
	},
	darkTab: {
		backgroundColor: '#E38600',
		color: '#141414',
		'& .MuiTab-root': {
			fontWeight: '600',
			fontFamily: 'inherit'
		},
		'& .MuiTabs-indicator': {
			height: '4px',
			backgroundColor: '#FCCA81'
		}
	},
	formCard: {
		width: '90%',
		maxWidth: '500px',
		padding: '20px',
		boxShadow: '3px 0px 10px 3px rgba(0,0,0,0.25)',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		color: 'inherit',
		'& .MuiInputBase-root': {
			color: 'inherit'
		}
	},
	form: {
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		'& > div': {
			margin: '0px'
		}
	},
	info: {
		fontSize: '0.8rem',
		margin: '0px 0px 25px 10px',
		opacity: '0.8'
	},
	passwordField: {
		marginTop: '20px'
	},
	nameField: {
		margin: '30px 0px 20px 0px',
		'& .MuiInputBase-root': {
			color: 'inherit'
		}
	},
	passwordIcon: {
		color: 'inherit'
	},
	field: {
		color: 'inherit',
		fontFamily: 'inherit',
		'& .MuiOutlinedInput-inputAdornedEnd': {
			color: 'inherit',
			fontFamily: 'inherit'
		},
		'& label.Mui-focused': {
			color: 'inherit',
			fontFamily: 'inherit'
		},
		'& .MuiInputLabel-outlined': {
			color: 'inherit',
			fontFamily: 'inherit'
		},
		'& .MuiInput-underline:after': {
			borderBottomColor: 'inherit',
			fontFamily: 'inherit'
		},
		'& .MuiOutlinedInput-root': {
			'& fieldset': {
				borderColor: 'inherit',
				fontFamily: 'inherit'
			},
			'& .MuiOutlinedInput-input': {
				color: 'inherit',
				fontFamily: 'inherit'
			},
			'&:hover fieldset': {
				borderColor: 'inherit',
				fontFamily: 'inherit'
			},
			'&.Mui-focused fieldset': {
				borderColor: 'inherit',
				fontFamily: 'inherit'
			}
		}
	}
});

export const LightSwitch = withStyles({
	switchBase: {
		color: '#BB86FC',
		'&$checked': {
			color: 'inherit'
		},
		'&$checked  + $track': {
			backgroundColor: '#5600E8'
		}
	},
	checked: {},
	track: {
		backgroundColor: '#BB86FC'
	}
})(Switch);

export const DarkSwitch = withStyles({
	switchBase: {
		color: '#FCCA81',
		'&$checked': {
			color: 'inherit'
		},
		'&$checked  + $track': {
			backgroundColor: '#E38600'
		}
	},
	checked: {},
	track: {
		backgroundColor: '#FCCA81'
	}
})(Switch);

export const marks = [
	{
		value: 0,
		label: '0'
	},
	{
		value: 25,
		label: '25'
	},
	{
		value: 50,
		label: '50'
	},
	{
		value: 75,
		label: '75'
	},
	{
		value: 100,
		label: '100'
	}
];

export const LightSlider = withStyles({
	root: {
		width: '200px',
		color: '#5600E8',
		height: '8px',
		fontFamily: '"Itim", cursive;'
	},
	thumb: {
		height: '24px',
		width: '24px',
		marginTop: '-8px',
		marginLeft: '-12px'
	},
	active: {},
	valueLabel: {
		left: 'calc(-50% + 8px)'
	},
	track: {
		height: '8px'
	},
	rail: {
		height: '8px',
		color: '#BB86FC'
	},
	mark: {
		color: 'inherit',
		height: 12,
		width: 2
	},
	markLabel: {
		color: '#BB86FC',
		fontFamily: 'inherit'
	},
	markLabelActive: {
		color: 'inherit'
	},
	markActive: {
		opacity: 2,
		color: 'inherit',
		backgroundColor: 'currentColor'
	}
})(Slider);

export const DarkSlider = withStyles({
	root: {
		width: '200px',
		color: '#E38600',
		height: '8px',
		fontFamily: '"Lato", sans-serif;'
	},
	thumb: {
		height: '24px',
		width: '24px',
		marginTop: '-8px',
		marginLeft: '-12px'
	},
	active: {},
	valueLabel: {
		left: 'calc(-50% + 8px)'
	},
	track: {
		height: '8px'
	},
	rail: {
		height: '8px',
		color: '#FCCA81'
	},
	mark: {
		color: 'inherit',
		height: 12,
		width: 2
	},
	markLabel: {
		color: '#FCCA81',
		fontFamily: 'inherit'
	},
	markLabelActive: {
		color: 'inherit'
	},
	markActive: {
		opacity: 2,
		color: 'inherit',
		backgroundColor: 'currentColor'
	}
})(Slider);

export const CssTextField = withStyles({
	root: {
		'& label.Mui-focused': {
			color: 'inherit',
			fontFamily: 'inherit'
		},
		'& .MuiInputLabel-outlined': {
			color: 'inherit',
			fontFamily: 'inherit'
		},
		'& .MuiInput-underline:after': {
			borderBottomColor: 'inherit',
			fontFamily: 'inherit'
		},
		'& .MuiOutlinedInput-root': {
			'& fieldset': {
				borderColor: 'inherit',
				fontFamily: 'inherit'
			},
			'& .MuiOutlinedInput-input': {
				color: 'inherit',
				fontFamily: 'inherit'
			},
			'&:hover fieldset': {
				borderColor: 'inherit',
				fontFamily: 'inherit'
			},
			'&.Mui-focused fieldset': {
				borderColor: 'inherit',
				fontFamily: 'inherit'
			}
		}
	}
})(TextField);
