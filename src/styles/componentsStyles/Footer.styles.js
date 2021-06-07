import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
	footer: (props) => ({
		width: '100%',
		height: '70px',
		display: 'flex',
		justifyContent: 'space-around',
		alignItems: 'center',
		backgroundColor: props.theme === 'dark' ? '#E38600' : '#5600E8',
		fontFamily: props.theme === 'dark' ? '"Lato", sans-serif;' : '"Itim", cursive;',
		color: props.theme === 'dark' ? '#141414' : '#F2F2F2'
	}),
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
