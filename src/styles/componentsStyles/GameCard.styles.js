import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
	root: {
		marginRight: '1rem'
	},
	card: {
		paddingTop: 20,
		paddingLeft: 40,
		paddingRight: 60,
		paddingBottom: 40,
		width: 200
	},

	cardTitle: {
		marginBottom: 20
	},
	cardText: {
		marginBottom: 40
	},
	button: {
		backgroundColor: '#01A299',
		color: '#fff',
		'&:hover': {
			background: '#00D9CE'
		}
	},
	link: { textDecoration: 'none' }
});
