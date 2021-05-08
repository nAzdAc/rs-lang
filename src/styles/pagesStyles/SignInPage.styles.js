import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
	mainBox: {
		width: '400px',
		padding: '20px 60px 50px 40px ',
		margin: '40px auto 40px 0px ',
		boxShadow: '2px 0px 14px 2px rgba(0,0,0,0.09)'
	},
	main: {
		width: '100%',
		height: '100%',
		display: 'flex'
	},
	paper: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		height: '100%'
	},
	avatar: {
		backgroundColor: theme.palette.secondary.main
	},
	form: {
		width: '100%',
		display: 'flex',
		flexDirection: 'column'
	},
	buttonBox: {
		marginTop: '30px',
		marginBottom: '0px',
		display: 'flex'
	},
	link: {
		textDecoration: 'none'
	},
	submit: {
		width: '180px',
		height: '36px',
		backgroundColor: '#01A299',
		marginTop: 'auto',
		fontSize: '14px'
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
	register: {
		margin: 'auto',
		fontSize: '14px',
		textDecoration: 'none'
	},
	email: {
		marginBottom: '0'
	},
	image: {
		width: '400px',
		height: '400px',
		marginTop: 'auto',
		marginLeft: 'auto'
	},
	message: {
		position: 'absolute',
		top: '50%',
		left: '50%'
	}
}));
