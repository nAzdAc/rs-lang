import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
	list: {
		width: '100%',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-evenly',
		zIndex: '2',
	},
	link: {
		color: '#FFF',
		textDecoration: 'none',
	},
	icon: {
		'&:hover, &:focus': {
			transform: 'rotate(360deg)',
			transition: '0.5s'
		},
		'@media (min-width: 801px)': {
      display: 'none',
    },
	},
	text: {
		fontFamily: '"Itim", cursive;',
    '@media (max-width: 950px)': {
      fontSize: '20px',
    },
		'@media (max-width: 800px)': {
      display: 'none',
    },
  }
});
