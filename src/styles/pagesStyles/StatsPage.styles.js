import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
	wrapper: {
		backgroundColor: '#FCFCFF',
		padding: '20px',
		maxWidth: '1440px',
		margin: '0 auto',
		display: 'flex',
		gap: '1rem'
	},
	content: {
		maxWidth: '700px',
		width: '60%',
		paddingTop: '80px',
		paddingLeft: '120px',
		'@media (max-width: 1200px)': {
			paddingTop: '40px'
		},
		'@media (max-width: 960px)': {
			width: '100%'
		}
	},
	illustrationWrapper: {
		width: '40%',
		display: 'flex',
		alignItems: 'flex-end',
		justifyContent: 'end'
	},

	illustration: {
		width: '100%',
		opacity: 0.8,
		'@media (max-width: 960px)': {
			display: 'none'
		}
	},
	title: {
		marginBottom: '40px'
	}
});
