import Switch from '@material-ui/core/Switch';
import Slider from '@material-ui/core/Slider';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import { icons } from '../../assets/icons/IconsRequire';

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
	button: (props) => ({
		padding: '3px',
		width: '100%',
		height: '36px',
		background: props.theme === 'dark' ? '#E38600' : '#5600E8',
		color: props.theme === 'dark' ? '#141414' : '#F2F2F2',
		fontFamily: 'inherit',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-around',
		borderRadius: '6px',
		cursor: props.theme === 'dark' ? `url(${icons.darkPointer}), default` : `url(${icons.lightPointer}), default`,
		outline: 'none',
		border: 'none',
		fontSize: '1rem',
		'&:hover': {
			transform: 'scale(1.1)'
		}
	}),
	outlainedButton: (props) => ({
		padding: '3px',
		height: '36px',
		fontFamily: 'inherit',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-around',
		borderRadius: '6px',
		cursor: props.theme === 'dark' ? `url(${icons.darkPointer}), default` : `url(${icons.lightPointer}), default`,
		outline: 'none',
		fontSize: '1rem',
		width: '130px',
		background: props.theme === 'dark' ? '#141414' : '#F2F2F2',
		color: props.theme === 'dark' ? '#E38600' : '#5600E8',
		border: '3px solid',
		borderColor: props.theme === 'dark' ? '#E38600' : '#5600E8',
		marginLeft: '40px',
		'&:hover': {
			transform: 'scale(1.1)'
		}
	}),
	buttonBox: {
		display: 'flex',
		flexWrap: 'wrap',
		marginBottom: '20px',
		gap: '30px'
	},
	cardsWrap: {
		display: 'flex',
		flexWrap: 'wrap',
		gap: '20px'
	},
	card: {
		perspective: '1000px',
		transformStyle: 'preserve-3d',
		backgroundColor: 'inherit',
		color: 'inherit',
		fontFamily: 'inherit',
		width: '300px',
		margin: '20px'
	},
	cardItem: (props) => ({
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		gap: '10px',
		padding: '20px',
		transition: 'transform 0.2s',
		color: props.theme === 'dark' ? '#E38600' : '#5600E8',
		boxShadow:
			props.theme === 'dark' ? '3px 0px 10px 3px rgba(227, 134, 0, 0.5)' : '3px 0px 10px 3px rgba(86, 0, 232, 0.6)'
	}),
	cardTitle: {
		marginBottom: '10px',
		marginRight: 'auto'
	},
	cardText: {
		marginBottom: '10px'
	},
	link: {
		textDecoration: 'none',
		color: 'inherit',
		fontStyle: 'inherit'
	},
	tabsContainer: {
		backgroundColor: 'inherit',
		color: 'inherit',
		width: '100%',
		maxWidth: '600px'
	},
	tab: (props) => ({
		backgroundColor: props.theme === 'dark' ? '#E38600' : '#5600E8',
		color: props.theme === 'dark' ? '#141414' : '#F2F2F2',
		'& .MuiTab-root': {
			cursor: props.theme === 'dark' ? `url(${icons.darkPointer}), pointer` : `url(${icons.lightPointer}), pointer`,
			fontWeight: '600',
			fontFamily: 'inherit'
		},
		'& .MuiTabs-indicator': {
			height: '4px',
			backgroundColor: props.theme === 'dark' ? '#FCCA81' : '#BB86FC'
		}
	}),
	formCard: (props) => ({
		width: '90%',
		maxWidth: '500px',
		padding: '20px',
		boxShadow:
			props.theme === 'dark' ? '3px 0px 10px 3px rgba(227, 134, 0, 0.5)' : '3px 0px 10px 3px rgba(86, 0, 232, 0.6)',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		color: 'inherit',
		'& .MuiInputBase-root': {
			color: 'inherit'
		}
	}),
	form: (props) => ({
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		'& > div': {
			margin: '0px'
		},
		'& .MuiInputBase-root': {
			'& .MuiOutlinedInput-input': {
				cursor: props.theme === 'dark' ? `url(${icons.darkInput}), default` : `url(${icons.lightInput}), default`
			}
		}
	}),
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
	passwordIcon: (props) => ({
		color: 'inherit',
		cursor: props.theme === 'dark' ? `url(${icons.darkPointer}), default` : `url(${icons.lightPointer}), default`
	}),
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

export const SettingsSwitch = withStyles({
	switchBase: (props) => ({
		cursor: props.theme === 'dark' ? `url(${icons.darkPointer}), pointer` : `url(${icons.lightPointer}), pointer`,
		color: props.theme === 'dark' ? '#FCCA81' : '#BB86FC',
		'&$checked': {
			color: 'inherit'
		},
		'&$checked  + $track': {
			backgroundColor: props.theme === 'dark' ? '#E38600' : '#5600E8'
		}
	}),
	checked: (props) => ({
		color: props.theme === 'dark' ? '#E38600' : '#5600E8'
	}),
	track: (props) => ({
		backgroundColor: props.theme === 'dark' ? '#FCCA81' : '#BB86FC'
	})
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

export const SettingsSlider = withStyles({
	root: (props) => ({
		cursor: props.theme === 'dark' ? `url(${icons.darkPointer}), pointer` : `url(${icons.lightPointer}), pointer`,
		width: '200px',
		color: props.theme === 'dark' ? '#E38600' : '#5600E8',
		height: '8px',
		fontFamily: '"Itim", cursive;'
	}),
	thumb: (props) => ({
		cursor: props.theme === 'dark' ? `url(${icons.darkPointer}), pointer` : `url(${icons.lightPointer}), pointer`,
		height: '24px',
		width: '24px',
		marginTop: '-8px',
		marginLeft: '-12px',
		'&:hover': {
			boxShadow: props.theme ? '0px 0px 0px 8px rgb(227, 134, 0, 0.2)' : '0px 0px 0px 8px rgb(85, 0, 232, 0.2)'
		}
	}),
	active: {},
	valueLabel: (props) => ({
		left: 'calc(-50% + 8px)',
		'& > span > span': {
			color: props.theme === 'dark' ? '#141414' : '#F2F2F2',
			fontWeight: 'bold'
		}
	}),
	track: {
		height: '8px'
	},
	rail: (props) => ({
		height: '8px',
		color: props.theme === 'dark' ? '#FCCA81' : '#BB86FC'
	}),
	mark: {
		color: 'inherit',
		height: 12,
		width: 2
	},
	markLabel: (props) => ({
		color: props.theme === 'dark' ? '#FCCA81' : '#BB86FC',
		fontFamily: 'inherit'
	}),
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
	root: (props) => ({
		cursor: props.theme === 'dark' ? `url(${icons.darkPointer}), pointer` : `url(${icons.lightPointer}), pointer`,
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
	})
})(TextField);
