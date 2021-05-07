import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		boxSizing: 'border-box'
	},
	box: {
		paddingLeft: '0px',
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'left',
		fontSize: '34px',
		gap: '20px',
		marginBottom: '10px'
	},
	title: {
		fontSize: '20px',
		fontStyle: 'normal',
		fontWeight: '700',
		lineHeight: '100%',
		textAlign: 'left',
		color: '#000000',
		verticalAlign: 'middle',
		alignSelf: 'center'
	},
	button: {
		height: '36px',
		width: '180px',
		borderRadius: '4px',
		backgroundColor: '#01a299',
		color: '#ffffff'
	},
	correct: {
		color: 'green'
	},
	wrong: {
		color: 'red'
	}
}));
