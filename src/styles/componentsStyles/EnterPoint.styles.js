import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
	root: {
		display: 'flex',
		gap: 8,
		width: 200,
		alignItems: 'center',

		'@media (max-width: 1080px)': {
			width: '50px'
		}
	},

	name: {
		margin: 0,
		padding: 0,
		color: '#ffffff',
		'@media (max-width: 1080px)': {
			display: 'none'
		}
	},

	logout: {
		margin: 0,
		padding: 0,
		color: '#ffffff',
		'&:hover': {
			color: '#01A299',
			cursor: 'pointer'
		}
	},

	button: {
		fontWeight: 'bold',
		width: '109px',
		height: '36px',
		background: '#01A299',
		color: '#FFF',
		'&:hover': {
			background: '#00D9CE'
		},
		'@media (max-width: 1080px)': {
			width: '48px'
		}
	},

	link: {
		textDecoration: 'none'
	}
}));
