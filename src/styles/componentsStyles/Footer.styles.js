import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
	footer: {
		width: '100%',
		height: '70px',
		backgroundColor: '#5600E8',
		display: 'flex',
		justifyContent: 'space-around',
		alignItems: 'center'
	},
	year: {
		fontSize: '28px',
		color: '#F2F2F2',
		'@media (max-width: 730px)': {
			fontSize: '20px'
		}
	},
	developers: {
		color: '#F2F2F2'
	},
	githubLink: {
		fontSize: '20px',
		margin: '10px',
		color: '#F2F2F2',
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
