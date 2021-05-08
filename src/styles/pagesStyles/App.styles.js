import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
	app: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'space-between',
		minHeight: '100%',
	},
	header: {
		width: '100%',
		height: '80px',
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: '#5600e8',
	},
	logo: {
		fontFamily: '"Permanent Marker", cursive',
		fontSize: '55px',
		lineHeight: '80px',
		color: '#f2f2f2',
		textDecoration: 'none',
		margin: '0px 10px 0px 10px',
		'@media (max-width: 900px)': {
			fontSize: '45px',
		},
		'@media (max-width: 715px)': {
			fontSize: '32px',
		},
	}
});
