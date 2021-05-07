import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		boxSizing: 'border-box'
	},
	item: {
		minWidth: '360px',
		width: '100%'
	},
	paper: {
		boxSizing: 'border-box',
		padding: '1rem',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-around',
		textAlign: 'left',
		color: theme.palette.text.secondary,
		height: '100%',
		boxShadow: 'none'
	},
	wordExample: {
		display: 'flex',
		flexWrap: 'wrap',
		fontSize: '34px',
		color: '#000000'
	},
	textEx: {
		fontSize: '16px',
		fontWeight: '400',
		color: '#000000'
	},
	textExTr: {
		fontSize: '16px',
		fontWeight: '500',
		color: '#000000'
	},

	img: {
		height: '100%',
		width: '100%',
		objectFit: 'contain'
	},
	conteiner: {
		display: 'flex',
		flexWrap: 'wrap',
		margin: '0',
		marginTop: '40px',
		justifyContent: 'center',
		minHeight: '232px',
		width: '100%',
		boxShadow: '2px 0px 14px 2px rgba(0,0,0,0.09)'
	}
}));
