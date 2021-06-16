import { makeStyles } from '@material-ui/core/styles';
import { icons } from '../../assets/icons/IconsRequire';
export const useStyles = makeStyles({
	app: (props) => ({
		display: 'flex',
		cursor: props.theme === 'dark' ? `url(${icons.darkCursor}), default` : `url(${icons.lightCursor}), default`,
		flexDirection: 'column',
		justifyContent: 'space-between',
		minHeight: '100%',
		backgroundColor: props.theme === 'dark' ? '#141414' : '#F2F2F2',
		color: props.theme === 'dark' ? '#E38600' : '#5600E8',
		fontFamily: props.theme === 'dark' ? 'darkText' : 'lightText',
		position: 'relative'
	}),
	preloader: (props) => ({
		height: '100vh',
		width: '100%',
		position: 'fixed',
		zIndex: '100',
		backgroundColor: props.theme === 'dark' ? '#E38600' : '#5600E8',
		color: props.theme === 'dark' ? '#141414' : '#F2F2F2',
		display: 'flex',
		flexDirection: 'column',
		gap: '20px',
		alignItems: 'center',
		justifyContent: 'center',
		fontSize: '40px',
		fontFamily: props.theme === 'dark' ? 'darkTitle' : 'lightTitle'
	}),
	loader: (props) => ({
		backdropFilter: 'blur(2px)',
		backgroundColor: props.theme === 'dark' ? 'rgba(20, 20, 20, 0.5)' : 'rgba(242, 242, 242, 0.7)',
		color: props.theme === 'dark' ? '#E38600' : '#5600E8',
		height: '100vh',
		width: '100%',
		position: 'fixed',
		zIndex: '99',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		gap: '20px',
		fontSize: '40px',
		fontFamily: props.theme === 'dark' ? 'darkTitle' : 'lightTitle',
		visibility: props.block ? 'visible' : 'hidden',
		opacity: props.block ? '1' : '0'
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
	logo: (props) => ({
		cursor: props.theme === 'dark' ? `url(${icons.darkPointer}), pointer` : `url(${icons.lightPointer}), pointer`,
		margin: '0px 10px 0px 10px',
		width: '400px',
		fontFamily: 'logo',
		fontWeight: '900',
		fontSize: '55px',
		color: 'inherit',
		'@media (max-width: 950px)': {
			margin: '-10px 10px 0px 10px',
			fontSize: '45px',
			width: '300px'
		},
		'@media (max-width: 768px)': {
			margin: '-25px 10px 0px 10px',
			fontSize: '35px'
		}
	}),
	toast: (props) => ({
		fontSize: '1.3rem',
		cursor: props.theme === 'dark' ? `url(${icons.darkPointer}), pointer` : `url(${icons.lightPointer}), pointer`,
		fontFamily: 'inherit',
		'& .Toastify__toast--success': {
			cursor: props.theme === 'dark' ? `url(${icons.darkPointer}), pointer` : `url(${icons.lightPointer}), pointer`,
			fontFamily: 'inherit',
			fontWeight: '400',
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
			cursor: props.theme === 'dark' ? `url(${icons.darkPointer}), pointer` : `url(${icons.lightPointer}), pointer`,
			padding: '15px',
			fontFamily: 'inherit',
			fontWeight: '400',
			backgroundColor: '#FF001E',
			color: '#F2F2F2',
			'& .Toastify__close-button': {
				color: '#F2F2F2',
				opacity: '1'
			},
			'& .Toastify__progress-bar': {
				backgroundColor: '#F2F2F2',
				height: '6px',
				margin: '5px',
				borderRadius: '10px'
			}
		}
	})
});
