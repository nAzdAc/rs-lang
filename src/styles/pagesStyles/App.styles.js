import { makeStyles } from '@material-ui/core/styles';
import { icons } from '../../assets/icons/IconsRequire';
import { images } from '../../assets/images/imagesRequire';

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
		position: 'relative',
		'&::after': {
			content: '""',
			position: 'absolute',
			top: '0',
			left: '0',
			width: '100%',
			height: '100%',
			cursor: 'inherit',
			transition: 'all 0.5s ease 0s',
			background:
				props.theme === 'dark'
					? `rgba(227, 134, 0, 0.8) url(${images.downloadGif}) center / 300px no-repeat`
					: `rgba(86, 0, 232, 0.8) url(${images.downloadGif}) center / 300px no-repeat`,
			zIndex: '20',
			visibility: props.block ? 'visible' : 'hidden',
			opacity: props.block ? '1' : '0'
		}
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
