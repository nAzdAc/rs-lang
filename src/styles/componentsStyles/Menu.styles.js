import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
	list: {
		width: '100%',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-evenly',
		zIndex: '2'
	},
	link: {
		color: '#FFF',
		textDecoration: 'none'
	},
	icon: {
		opacity: '0',
		'&:hover, &:focus': {
			transform: 'rotate(360deg)',
			transition: '0.5s'
		},
		'@media (max-width: 800px)': {
			opacity: '1'
		}
	},
	text: {
		fontFamily: '"Itim", cursive;',
		fontSize: '24px',
		'@media (max-width: 950px)': {
			fontSize: '17px'
		},
		'@media (max-width: 800px)': {
			display: 'none'
		}
	}
});
