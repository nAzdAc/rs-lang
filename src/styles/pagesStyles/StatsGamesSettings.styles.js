import Switch from '@material-ui/core/Switch';
import Slider from '@material-ui/core/Slider';
import { makeStyles, withStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
	root: {
		backgroundColor: '#FCFCFF',
		padding: '20px 10px 10px 20px',
		display: 'flex',
		flexDirection: 'column',
		'& > header': {
			backgroundColor: '#5600e8',
		}
	},
	buttonsWrapper: {
		width: '200px',
		display: 'flex',
		flexWrap: 'wrap',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: '10px'
	},
	title: {
		marginBottom: '25px',
		marginRight: 'auto',
	},
	subtitle: {
		marginBottom: '15px',
		marginRight: 'auto',
	},
	avatarImage: {
		width: '100px',
		height: '100px',
		borderRadius: '50%',
		margin: '10px'
	},
	upload: {
		width: '134px',
		height: '36px',
		background: '#6200EE',
		color: '#FFFFFF',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-around',
		borderRadius: '6px',
		cursor: 'pointer',
		marginTop: '20px',
	},
	buttonBox: {
		display: 'flex',
		flexWrap: 'wrap',
		marginBottom: '20px',
		gap: '30px',
	},
	cardsWrap: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	card: {
		padding: '20px 30px 20px 30px',
		width: '220px',
		margin: '20px',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	cardTitle: {
		marginBottom: '10px',
		marginRight: 'auto',
	},
	cardText: {
		marginBottom: '10px',
	},
	button: {
		backgroundColor: '#01A299',
		color: '#fff',
		'&:hover': {
			background: '#00D9CE'
		}
	},
	link: { textDecoration: 'none' },
	tab: {
		width: '100%',
		maxWidth: '600px',
	},
	formCard: {
		width: '90%',
		maxWidth: '400px',
		padding: '20px',
		boxShadow: '2px 0px 14px 2px rgba(0,0,0,0.09)',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	form: {
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		'& > div': {
			margin: '0px',
		}
	},
	info: {
		margin: '0px 0px 25px 10px',
		opacity: '0.6'
	},
	passwordField: {
		marginTop: '20px'
	},
	register: {
		border: '2px solid #01A299',
		padding: '5px',
		marginLeft: '40px',
		fontSize: '14px',
		'&:hover': {
			background: '#00D9CE',
			color: '#fff',
		},
	},
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
