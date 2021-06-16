import { makeStyles } from '@material-ui/core/styles';
import { icons } from '../../assets/icons/IconsRequire';

export const useStyles = makeStyles({
	footer: (props) => ({
		width: '100%',
		height: '70px',
		display: 'flex',
		justifyContent: 'space-around',
		alignItems: 'center',
		backgroundColor: props.theme === 'dark' ? '#E38600' : '#5600E8',
		fontFamily: props.theme === 'dark' ? 'darkTitle' : 'lightTitle',
		color: props.theme === 'dark' ? '#141414' : '#F2F2F2'
	}),
	year: {
		fontSize: '28px',
		color: 'inherit',
		'@media (max-width: 730px)': {
			fontSize: '20px'
		},
		'@media (max-width: 560px)': {
			fontSize: '17px'
		}
	},
	iconsWrap: {
		color: 'inherit'
	},
	link: (props) => ({
		cursor: props.theme === 'dark' ? `url(${icons.darkPointer}), pointer` : `url(${icons.lightPointer}), pointer`,
		fontSize: '40px',
		margin: '30px',
		color: 'inherit',
		'@media (max-width: 730px)': {
			fontSize: '30px'
		},
		'@media (max-width: 560px)': {
			margin: '20px',
			fontSize: '25px'
		},
		'&:hover': {
			textDecoration: 'underline',
			cursor: props.theme === 'dark' ? `url(${icons.darkPointer}), pointer` : `url(${icons.lightPointer}), pointer`
		}
	}),
	icon: {
		color: 'inherit',
		fontSize: 'inherit',
		'&:hover': {
			transform: 'rotate(360deg)',
			transition: '0.5s'
		}
	},
	imageWrap: (props) => ({
		cursor: props.theme === 'dark' ? `url(${icons.darkPointer}), pointer` : `url(${icons.lightPointer}), pointer`
	}),
	schoolImage: {
		'@media (max-width: 730px)': {
			width: '70px',
			height: '30px'
		}
	},
	schoolLink: (props) => ({
		padding: '5px',
		cursor: props.theme === 'dark' ? `url(${icons.darkPointer}), pointer` : `url(${icons.lightPointer}), pointer`
	})
});
