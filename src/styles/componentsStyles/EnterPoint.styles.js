import { makeStyles } from '@material-ui/core/styles';

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
		width: '90px'
	},
	avatar: {
		marginBottom: '3px',
		width: '55px',
		height: '55px'
	},
	logout: {
		color: 'inherit',
		cursor: 'pointer',
		marginRight: '10px',
		'&:hover': {
			transform: 'scale(1.2)'
		}
	},
	lightButton: {
		fontFamily: 'inherit',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-around',
		fontSize: '1rem',
		cursor: 'pointer',
		borderRadius: '6px',
		outline: 'none',
		fontWeight: '600',
		width: '84px',
		height: '36px',
		background: 'inherit',
		border: '3px solid #F2F2F2',
		color: 'inherit',
		marginRight: '10px',
		'&:hover': {
			transform: 'scale(1.2)'
		}
	},
	darkButton: {
		fontFamily: 'inherit',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-around',
		fontSize: '1rem',
		cursor: 'pointer',
		borderRadius: '6px',
		outline: 'none',
		fontWeight: '600',
		width: '84px',
		height: '36px',
		background: 'inherit',
		border: '3px solid #1f2c38',
		color: 'inherit',
		marginRight: '10px',
		'&:hover': {
			transform: 'scale(1.2)'
		}
	},
	link: {
		textDecoration: 'none',
		color: 'inherit'
	},
	name: {
		fontSize: '0.9rem',
		color: 'inherit'
	}
}));
