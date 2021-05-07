import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
	root: {
		maxWidth: '1440px',
		margin: '0 auto',
		paddingBottom: '20px',
		paddingLeft: '10px'
	},
	cards: {
		display: 'flex',
		flexWrap: 'wrap',
		rowGap: '1rem'
	},
	title: {
		paddingTop: '20px',
		marginBottom: '20px'
	},
	buttonBox: {
		display: 'flex',
		marginRight: 'auto',
		flexWrap: 'wrap'
	}
});
