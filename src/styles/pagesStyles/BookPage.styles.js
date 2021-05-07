import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			marginTop: theme.spacing(2)
		}
	},
	container: {
		display: 'flex',
		flexWrap: 'wrap',
		flexDirection: 'column',
		alignItems: 'flex-start'
	},
	title: {
		marginTop: '160px',
		width: '100%',
		fontSize: '60px',
		fontStyle: 'normal',
		fontWeight: '300',
		lineHeight: '72px',
		textAlign: 'left',
		verticalAlign: 'middle'
	},
	buttonBox: {
		display: 'flex',
		marginTop: '40px',
		marginRight: 'auto',
		flexWrap: 'wrap'
	},
	link: {
		textDecoration: 'none'
	},
	illustration: {
		display: 'flex',
		justifyContent: 'flex-end',
		width: '100%'
	}
}));
