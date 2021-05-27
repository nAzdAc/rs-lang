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
		color: '#F2F2F2',
		width: '90px'
	},
	avatar: {
		marginBottom: '3px',
		width: '55px',
		height: '55px'
	},
	logout: {
		color: '#F2F2F2',
		cursor: 'pointer',
		marginRight: '10px',
		'&:hover': {
			transform: 'scale(1.2)'
		}
	},
	button: {
		fontFamily: '"Itim", cursive;',
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
		background: '#5600E8',
		border: '3px solid #F2F2F2',
		color: '#F2F2F2',
		marginRight: '10px',
		'&:hover': {
			transform: 'scale(1.2)'
		}
	},
	link: {
		textDecoration: 'none'
	},
	name: {
		fontSize: '0.9rem',
		color: '#F2F2F2'
	}
}));
