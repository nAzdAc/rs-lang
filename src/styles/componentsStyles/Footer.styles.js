import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
	lightFooter: {
		width: '100%',
		height: '70px',
		display: 'flex',
		justifyContent: 'space-around',
		alignItems: 'center',
		backgroundColor: '#5600E8',
		fontFamily: '"Itim", cursive;',
		color: '#F2F2F2'
	},
	darkFooter: {
		width: '100%',
		height: '70px',
		display: 'flex',
		justifyContent: 'space-around',
		alignItems: 'center',
		backgroundColor: '#e38600',
		fontFamily: '"Lato", sans-serif;',
		color: '#141414'
	},
	year: {
		fontSize: '28px',
		color: 'inherit',
		'@media (max-width: 730px)': {
			fontSize: '20px'
		}
	},
	developers: {
		color: 'inherit'
	},
	githubLink: {
		fontSize: '20px',
		margin: '10px',
		color: 'inherit',
		'@media (max-width: 730px)': {
			fontSize: '14px'
		},
		'&:hover': {
			textDecoration: 'underline'
		}
	},
	schoolImage: {
		'@media (max-width: 730px)': {
			width: '70px',
			height: '30px'
		}
	}
});
