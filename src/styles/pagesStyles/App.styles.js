import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
	app: (props) => ({
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		minHeight: '100%',
		backgroundColor: props.theme === 'dark' ? '#141414' : '#F2F2F2',
		color: props.theme === 'dark' ? '#E38600' : '#5600E8',
		fontFamily: props.theme === 'dark' ? '"Lato", sans-serif;' : '"Itim", cursive;'
	}),
	header: (props) => ({
		width: '100%',
		height: '80px',
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		gap: '5px',
		color: props.theme === 'dark' ? '#141414' : '#F2F2F2',
		backgroundColor: props.theme === 'dark' ? '#E38600' : '#5600E8',
		fontFamily: 'inherit'
	}),
	link: {
		textDecoration: 'none',
		fontFamily: 'inherit',
		color: 'inherit'
	},
	logo: {
		margin: '0px 10px 0px 10px',
		width: '400px',
		fontFamily: '"Permanent Marker", cursive',
		fontSize: '55px',
		color: 'inherit',
		'@media (max-width: 950px)': {
			fontSize: '40px',
			width: '300px'
		},
		'@media (max-width: 768px)': {
			fontSize: '30px'
		}
	},
	toast: (props) => ({
		fontFamily: 'inherit',
		'& .Toastify__toast--success': {
			fontFamily: 'inherit',
			fontWeight: 'bold',
			backgroundColor: props.theme === 'dark' ? '#141414' : '#F2F2F2',
			color: props.theme === 'dark' ? '#E38600' : '#5600E8',
			'& .Toastify__close-button': {
				color: props.theme === 'dark' ? '#E38600' : '#5600E8',
				opacity: '1'
			},
			'& .Toastify__progress-bar': {
				backgroundColor: props.theme === 'dark' ? '#E38600' : '#5600E8',
				height: '6px',
				margin: '5px',
				borderRadius: '10px'
			}
		},
		'& .Toastify__toast--error': {
			padding: '15px',
			fontFamily: 'inherit',
			fontWeight: 'bold',
			backgroundColor: '#FF001E',
			color: '#FFF',
			'& .Toastify__close-button': {
				color: '#FFF',
				opacity: '1'
			},
			'& .Toastify__progress-bar': {
				backgroundColor: '#FFF',
				height: '6px',
				margin: '5px',
				borderRadius: '10px'
			}
		}
	})
});
