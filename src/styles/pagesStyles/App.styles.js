import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
	lightApp: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		minHeight: '100%',
		backgroundColor: '#F2F2F2',
		fontFamily: '"Itim", cursive;',
		color: '#5600E8'
	},
	darkApp: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		minHeight: '100%',
		backgroundColor: '#141414',
		fontFamily: '"Lato", sans-serif;',
		color: '#e38600'
	},
	lightHeader: {
		width: '100%',
		height: '80px',
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		gap: '5px',
		backgroundColor: '#5600E8',
		color: '#F2F2F2',
		fontFamily: 'inherit'
	},
	darkHeader: {
		width: '100%',
		height: '80px',
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		gap: '5px',
		backgroundColor: '#e38600',
		color: '#141414',
		fontFamily: 'inherit'
	},
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
	lightToast: {
		fontFamily: 'inherit',
		'& .Toastify__toast--success': {
			fontFamily: 'inherit',
			fontWeight: 'bold',
			background: '#F2F2F2',
			color: '#5600E8',
			'& .Toastify__close-button': {
				color: '#5600E8',
				opacity: '1'
			},
			'& .Toastify__progress-bar': {
				background: '#5600E8',
				height: '6px',
				margin: '5px',
				borderRadius: '10px'
			}
		},
		'& .Toastify__toast--error': {
			padding: '15px',
			fontFamily: 'inherit',
			fontWeight: 'bold',
			background: '#FF001E',
			color: '#FFF',
			'& .Toastify__close-button': {
				color: '#FFF',
				opacity: '1'
			},
			'& .Toastify__progress-bar': {
				background: '#FFF',
				height: '6px',
				margin: '5px',
				borderRadius: '10px'
			}
		}
	},
	darkToast: {
		fontFamily: 'inherit',
		'& .Toastify__toast--success': {
			fontFamily: 'inherit',
			fontWeight: 'bold',
			background: '#141414',
			color: '#E38600',
			'& .Toastify__close-button': {
				color: '#E38600',
				opacity: '1'
			},
			'& .Toastify__progress-bar': {
				background: '#E38600',
				height: '6px',
				margin: '5px',
				borderRadius: '10px'
			}
		},
		'& .Toastify__toast--error': {
			padding: '15px',
			fontFamily: 'inherit',
			fontWeight: 'bold',
			background: '#FF001E',
			color: '#FFF',
			'& .Toastify__close-button': {
				color: '#FFF',
				opacity: '1'
			},
			'& .Toastify__progress-bar': {
				background: '#FFF',
				height: '6px',
				margin: '5px',
				borderRadius: '10px'
			}
		}
	}
});
