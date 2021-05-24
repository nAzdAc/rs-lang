import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
	app: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		minHeight: '100%'
	},
	header: {
		width: '100%',
		height: '80px',
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		gap: '15px',
		backgroundColor: '#5600e8'
	},
	link: {
		textDecoration: 'none'
	},
	logo: {
		marginLeft: '10px',
		width: '250px',
		fontFamily: '"Permanent Marker", cursive',
		fontSize: '55px',
		color: '#f2f2f2',
		'@media (max-width: 950px)': {
			width: '190px',
			fontSize: '45px'
		},
		'@media (max-width: 820px)': {
			width: '140px',
			fontSize: '32px'
		}
	}
});
