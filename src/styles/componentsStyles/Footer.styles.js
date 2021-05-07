import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
	footer: {
		width: '100%',
		height: '100px',
		flex: '0 0 auto',
		backgroundColor: '#5600e8',
		display: 'flex',
		justifyContent: 'space-around',
		alignItems: 'center'
	},
  year: {
		fontSize: '16px',
		color: '#fff'
	},
  developers: {
    color: '#fff',
  },
	githubLink: {
		fontSize: '16px',
		margin: '1rem',
		color: '#fff',
		'@media (max-width: 1080px)': {
			margin: '50px',
      fontSize: '14px',
		}
	}
});
