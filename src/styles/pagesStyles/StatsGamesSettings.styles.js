import Switch from '@material-ui/core/Switch';
import Slider from '@material-ui/core/Slider';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';

export const useStyles = makeStyles({
	root: {
		fontFamily: '"Itim", cursive;',
		color: '#5600E8',
		backgroundColor: '#F2F2F2',
		padding: '20px 10px 10px 20px',
		display: 'flex',
		flexDirection: 'column',
		'& > header': {
			backgroundColor: '#5600E8'
		}
	},
	buttonsWrapper: {
		width: '200px',
		display: 'flex',
		flexWrap: 'wrap',
		alignItems: 'center',
		textAlign: 'center',
		justifyContent: 'space-between',
		marginBottom: '10px'
	},
	title: {
		fontSize: '5rem',
		marginBottom: '25px',
		fontFamily: '"Itim", cursive;',
		marginRight: 'auto',
		'@media (max-width: 768px)': {
			fontSize: '3.5rem'
		}
	},
	gameTitle: {
		fontSize: '3.5rem',
		marginBottom: '10px',
		fontFamily: '"Itim", cursive;',
		marginRight: 'auto',
		'@media (max-width: 768px)': {
			fontSize: '2.5rem'
		}
	},
	subtitle1: {
		fontFamily: '"Itim", cursive;',
		fontSize: '1.5rem',
		fontWeight: '650',
		marginRight: 'auto',
		marginBottom: '15px'
	},
	subtitle2: {
		fontFamily: '"Itim", cursive;',
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
	purpleButton: {
		padding: '3px',
		width: '100%',
		height: '36px',
		background: '#5600E8',
		color: '#F2F2F2',
		fontFamily: '"Itim", cursive;',
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
	outlainedButton: {
		width: '130px',
		background: '#F2F2F2',
		color: '#5600E8',
		border: '3px solid #5600E8',
		marginLeft: '40px'
	},
	containedButton: {
		width: '130px'
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
		backgroundColor: '#F2F2F2',
		color: '#5600E8',
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
	link: { textDecoration: 'none' },
	tabsContainer: {
		backgroundColor: '#F2F2F2',
		width: '100%',
		maxWidth: '600px'
	},
	tab: {
		backgroundColor: '#5600E8',
		color: '#F2F2F2',
		'& .MuiTab-root': {
			fontWeight: '600',
			fontFamily: '"Itim", cursive;'
		},
		'& .MuiTabs-indicator': {
			height: '4px',
			backgroundColor: '#F2F2F2'
		}
	},
	// buttonZalupa: {
	// 	color: 'yellow',
	// 	backgroundColor: 'green'
	// },
	// zalupaPanel: {
	// 	backgroundColor: '#5600E8',
	// 	color: '#F2F2F2'
	// },
	formCard: {
		width: '90%',
		maxWidth: '500px',
		padding: '20px',
		boxShadow: '3px 0px 10px 3px rgba(0,0,0,0.25)',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
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
		margin: '30px 0px 20px 0px'
	},
	passwordIcon: {
		color: '#5600E8'
	},
	field: {
		color: '#5600E8',
		fontFamily: '"Itim", cursive;',
		'& .MuiOutlinedInput-inputAdornedEnd': {
			color: '#5600E8',
			fontFamily: '"Itim", cursive;'
		},
		'& label.Mui-focused': {
			color: '#5600E8',
			fontFamily: '"Itim", cursive;'
		},
		'& .MuiInputLabel-outlined': {
			color: '#5600E8',
			fontFamily: '"Itim", cursive;'
		},
		'& .MuiInput-underline:after': {
			borderBottomColor: '#5600E8',
			fontFamily: '"Itim", cursive;'
		},
		'& .MuiOutlinedInput-root': {
			'& fieldset': {
				borderColor: '#5600E8',
				fontFamily: '"Itim", cursive;'
			},
			'& .MuiOutlinedInput-input': {
				color: '#5600E8',
				fontFamily: '"Itim", cursive;'
			},
			'&:hover fieldset': {
				borderColor: '#5600E8',
				fontFamily: '"Itim", cursive;'
			},
			'&.Mui-focused fieldset': {
				borderColor: '#5600E8',
				fontFamily: '"Itim", cursive;'
			}
		}
	}
});

export const PurpleSwitch = withStyles({
	switchBase: {
		color: '#DBB2FF',
		'&$checked': {
			color: '#5600E8'
		},
		'&$checked  + $track': {
			backgroundColor: '#5600E8'
		}
	},
	checked: {},
	track: {}
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

export const VolumeSlider = withStyles({
	root: {
		width: '200px',
		color: '#5600E8',
		height: '8px'
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
		height: '8px'
	},
	mark: {
		backgroundColor: '#bfbfbf',
		height: 12,
		width: 1
	},
	markActive: {
		opacity: 1,
		backgroundColor: 'currentColor'
	}
})(Slider);

export const CssTextField = withStyles({
	root: {
		'& label.Mui-focused': {
			color: '#5600E8',
			fontFamily: '"Itim", cursive;'
		},
		'& .MuiInputLabel-outlined': {
			color: '#5600E8',
			fontFamily: '"Itim", cursive;'
		},
		'& .MuiInput-underline:after': {
			borderBottomColor: '#5600E8',
			fontFamily: '"Itim", cursive;'
		},
		'& .MuiOutlinedInput-root': {
			'& fieldset': {
				borderColor: '#5600E8',
				fontFamily: '"Itim", cursive;'
			},
			'& .MuiOutlinedInput-input': {
				color: '#5600E8',
				fontFamily: '"Itim", cursive;'
			},
			'&:hover fieldset': {
				borderColor: '#5600E8',
				fontFamily: '"Itim", cursive;'
			},
			'&.Mui-focused fieldset': {
				borderColor: '#5600E8',
				fontFamily: '"Itim", cursive;'
			}
		}
	}
})(TextField);
