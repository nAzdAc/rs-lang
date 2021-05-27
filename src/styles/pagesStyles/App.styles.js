import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
	app: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		minHeight: '100%',
		backgroundColor: '#F2F2F2'
	},
	header: {
		width: '100%',
		height: '80px',
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		gap: '5px',
		backgroundColor: '#5600E8'
	},
	link: {
		textDecoration: 'none'
	},
	logo: {
		margin: '0px 10px 0px 10px',
		width: '400px',
		fontFamily: '"Permanent Marker", cursive',
		fontSize: '55px',
		color: '#F2F2F2',
		'@media (max-width: 950px)': {
			fontSize: '40px',
			width: '300px'
		},
		'@media (max-width: 768px)': {
			fontSize: '30px'
		}
	}
});
