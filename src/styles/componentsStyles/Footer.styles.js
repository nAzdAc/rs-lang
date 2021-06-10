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
		fontFamily: 'inherit',
		color: props.theme === 'dark' ? '#141414' : '#F2F2F2'
	}),
	year: {
		fontSize: '28px',
		color: 'inherit',
		'@media (max-width: 730px)': {
			fontSize: '20px'
		}
	},
	developers: {
		color: 'inherit'
	},
	githubLink: (props) => ({
		cursor: props.theme === 'dark' ? `url(${icons.darkPointer}), pointer` : `url(${icons.lightPointer}), pointer`,
		fontSize: '20px',
		margin: '10px',
		padding: '20px 0px',
		color: 'inherit',
		'@media (max-width: 730px)': {
			fontSize: '14px'
		},
		'&:hover': {
			textDecoration: 'underline',
			cursor: props.theme === 'dark' ? `url(${icons.darkPointer}), pointer` : `url(${icons.lightPointer}), pointer`
		}
	}),
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
