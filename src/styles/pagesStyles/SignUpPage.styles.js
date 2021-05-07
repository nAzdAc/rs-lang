import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
	main: {
		width: '100%',
		display: 'flex'
	},
	paper: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		height: '100%'
	},
	mainBox: {
		width: '400px',
		padding: '20px 50px 50px 40px ',
		boxShadow: '2px 0px 14px 2px rgba(0,0,0,0.09)',
		margin: '40px auto 40px 0px '
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		height: '100%',
		display: 'flex',
		flexDirection: 'column'
	},
	button: {
		width: '180px',
		height: '36px',
		backgroundColor: '#6200EE',
		marginTop: '30px',
		fontSize: '14px'
	},
	submit: {
		width: '180px',
		height: '36px',
		backgroundColor: '#01A299',
		fontSize: '14px'
	},
	link: {
		textDecoration: 'none'
	},
	title: {
		marginBottom: '30px',
		marginRight: 'auto'
	},
	info: {
		marginLeft: '1rem',
		opacity: '0.8'
	},
	passwordField: {
		marginTop: '30px'
	},
	buttonBox: {
		marginTop: '30px',
		display: 'flex'
	},
	register: {
		margin: 'auto',
		fontSize: '14px'
	},
	email: {
		marginTop: '30px'
	},
	image: {
		width: '400px',
		height: '400px',
		marginTop: 'auto',
		marginLeft: 'auto'
	}
}));
