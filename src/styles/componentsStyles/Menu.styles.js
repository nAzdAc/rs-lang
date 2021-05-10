import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
	list: {
		display: 'flex',
		alignItems: 'center',
		position: 'relative',
		zIndex: '2',
		color: '#fff',
		'& > a, button': {
			padding: '0px 5px 0px 5px',
			margin: '0px 5px 0px 5px',
			'@media (max-width: 750px)': {
				padding: '0px 2px 0px 2px',
			margin: '0px 2px 0px 2px',
			}
		}
	},
	sectionWrap: {
		display: 'flex',
		'& > button': {
			width: '20px',
			minWidth: '20px',
			color: '#fff',
			marginBottom: '5px'
		},
		'& > a, button': {
			padding: '0px 5px 0px 5px',
			margin: '0px 5px 0px 5px',
			'@media (max-width: 750px)': {
				padding: '0px 2px 0px 2px',
			margin: '0px 2px 0px 2px',
			}
		}
	},
	settings: {
		'&:hover, &:focus': {
			transform: 'rotate(360deg)',
			transition: '0.5s'
		}
	},
	button: {
		fontWeight: 'bold',
		width: '109px',
		height: '36px',
		background: '#01A299',
		color: '#FFF',
		'&:hover': {
			background: '#00D9CE'
		}
	},
	full: {
		'@media (max-width: 750px)': {
			display: 'none'
		}
	},
	icon: {
		'@media (min-width: 750px)': {
			display: 'none'
		}
	},
	text: {
		fontFamily: '"Itim", cursive;',
		fontSize: '25px',
		'@media (max-width: 920px)': {
			fontSize: '17px'
		}
	}
});
