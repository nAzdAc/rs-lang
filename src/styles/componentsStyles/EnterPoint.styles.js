import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
	root: {
		display: 'flex',
		alignItems: 'center'
	},
	avatarWrap: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		color: '#fff',
		width: '90px'
	},
	avatar: {
		marginBottom: '3px',
		width: '55px',
		height: '55px'
	},
	logout: {
		color: '#ffffff',
		cursor: 'pointer',
		marginRight: '10px',
		'&:hover': {
			transform: 'scale(1.2)'
		}
	},
	button: {
		fontWeight: 'bold',
		width: '84px',
		height: '36px',
		background: '#01A299',
		color: '#FFF',
		marginRight: '10px',
		'&:hover': {
			background: '#00D9CE'
		}
	},
	link: {
		textDecoration: 'none'
	},
	name: {
		fontSize: '0.9rem',
		color: '#fff'
	}
}));
