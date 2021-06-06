import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
	list: {
		width: '100%',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-evenly',
		zIndex: '2',
		fontFamily: 'inherit',
		color: 'inherit'
	},
	link: {
		fontFamily: 'inherit',
		color: 'inherit',
		'& .MuiSvgIcon-root': {
			color: 'inherit',
			display: 'none',
			'&:hover, &:focus': {
				transform: 'rotate(360deg)',
				transition: '0.5s'
			},
			'@media (max-width: 768px)': {
				display: 'block'
			}
		}
	},
	text: {
		color: 'inherit',
		fontFamily: 'inherit',
		fontSize: '24px',
		'&:hover': {
			textDecoration: 'underline'
		},
		'@media (max-width: 950px)': {
			fontSize: '17px'
		},
		'@media (max-width: 768px)': {
			display: 'none'
		}
	}
});
