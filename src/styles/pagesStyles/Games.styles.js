import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
	root: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},
	gameContainer: {
		position: 'relative',
		width: '90%',
    height: '100%',
		display: 'flex',
		flexDirection: 'column',
		flexWrap: 'wrap',
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: '20px 0px 10px 0px',
		background: 'white'
	},
	buttonsWrap: {
		width: '100%',
		display: 'flex',
		flexWrap: 'wrap',
		alignItems: 'center',
		justifyContent: 'space-around',
		marginBottom: '30px'
	},
  button: {
		marginRight: '10px',
		borderRadius: '5px',
		border: 'none',
		cursor: 'pointer',
		fontWeight: 'bold',
		width: '20%',
		maxWidth: '150px',
		height: '50px',
		background: '#01A299',
		color: '#FFF',
		'&:hover': {
			background: '#00D9CE'
		}
	},
	badButton: {
		background: '#B00020',
		'&:hover': {
			background: '#E6002A'
		}
	},
	goodButton: {
		background: '#16a600',
		'&:hover': {
			background: '#28fc03'
		}
	},
  speaker: {
		width: '150px',
		height: '120px',
		marginBottom: '60px',
		cursor: 'pointer',
		color: '#01A299',
		'&:hover': {
			color: '#00D9CE'
		}
	},
  fail: {
		marginBottom: '10px'
	},
	loader: {
		position: 'absolute',
		top: '50%',
		left: '50%'
	},
	fullScreenBtn: {
		position: 'absolute',
		right: '0',
		bottom: '0',
		border: 'none',
		outline: 'none',
		cursor: 'pointer',
		fontWeight: 'bold',
		width: '50px',
		height: '50px',
		background: 'white',
		color: '#FFF'
	},
	fullScreenIcon: {
		cursor: 'pointer',
		fontSize: '50px',
		color: '#01A299',
		'&:hover': {
			color: '#00D9CE'
		}
	},
	series: {
		minHeight: '100px',
		display: 'flex',
		flexWrap: 'wrap',
		alignItems: 'center',
		justifyContent: 'flex-start',
		marginBottom: '30px',
		width: '90%'
	},
	starIcon: {
		fontSize: '50px',
		color: 'gold'
	},
  imagesContainer: {
		width: '100%',
		display: 'flex',
		flexWrap: 'wrap',
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: '20px'
	},
	imageWrap: {
		cursor: 'pointer',
		position: 'relative',
		width: '180px',
		height: '180px',
		margin: '10px'
	},
	overlay: {
		display: 'block',
		position: 'absolute',
		top: '0px',
		left: '0px',
		right: '0px',
		bottom: '0px',
		opacity: '0',
		background: 'white'
	},
	badOverlay: {
		zIndex: '1',
		opacity: '0.4',
		background: '#B00020',
		'&:hover': {
			background: '#E6002A'
		}
	},
	goodOverlay: {
		zIndex: '1',
		opacity: '0.4',
		background: '#16a600',
		'&:hover': {
			background: '#28fc03'
		}
	},
	image: {
		position: 'absolute',
		top: '0px',
		left: '0px',
		width: '100%',
		height: '100%',
		cursor: 'pointer'
	},
	word: {
		marginBottom: '10px'
	},
	meaning: {
		marginBottom: '30px'
	},
});
