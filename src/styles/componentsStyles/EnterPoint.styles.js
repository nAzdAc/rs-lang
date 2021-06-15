import { makeStyles } from '@material-ui/core/styles';
import { icons } from '../../assets/icons/IconsRequire';

export const useStyles = makeStyles(() => ({
	root: {
		display: 'flex',
		alignItems: 'center',
		backgroundColor: 'inherit',
		fontFamily: 'inherit',
		color: 'inherit'
	},
	avatarWrap: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		color: 'inherit',
		width: '70px'
	},
	avatar: {
		marginBottom: '3px',
		width: '55px',
		height: '55px'
	},
	logout: (props) => ({
		width: '25px',
		height: '25px',
		color: 'inherit',
		padding: '10px',
		marginRight: '10px',
		cursor: props.theme === 'dark' ? `url(${icons.darkPointer}), pointer` : `url(${icons.lightPointer}), pointer`,
		'&:hover': {
			transform: 'rotate(360deg)',
			transition: '0.5s'
		}
	}),
	button: (props) => ({
		fontFamily: 'inherit',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-around',
		fontSize: '1rem',
		cursor: props.theme === 'dark' ? `url(${icons.darkPointer}), pointer` : `url(${icons.lightPointer}), pointer`,
		borderRadius: '6px',
		outline: 'none',
		fontWeight: '400',
		width: '84px',
		height: '36px',
		background: 'inherit',
		border: '3px solid',
		borderColor: props.theme === 'dark' ? '#141414' : '#F2F2F2',
		color: 'inherit',
		marginRight: '10px',
		'&:hover': {
			transform: 'scale(1.1)'
		}
	}),
	link: {
		textDecoration: 'none',
		color: 'inherit'
	},
	name: {
		letterSpacing: '1px',
		fontSize: '1.1rem',
		color: 'inherit'
	}
}));
