import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
	root: {
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		fontFamily: '"Itim", cursive;',
		background: '#F2F2F2'
	},
	gameContainer: {
		position: 'relative',
		width: '100%',
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
		flexWrap: 'wrap',
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: '20px 0px 10px 0px',
		background: '#F2F2F2',
		color: '#5600E8'
	},
	buttonsWrap: {
		display: 'flex',
		flexWrap: 'wrap',
		alignItems: 'center',
		justifyContent: 'space-around',
		marginBottom: '15px',
		gap: '20px'
	},
	purpleButton: {
		padding: '5px',
		minWidth: '100px',
		height: '50px',
		backgroundColor: '#5600E8',
		color: '#F2F2F2',
		fontFamily: '"Itim", cursive;',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-around',
		borderRadius: '10px',
		cursor: 'pointer',
		outline: 'none',
		border: '3px solid #F2F2F2',
		fontSize: '1rem',
		'&:hover': {
			border: '3px solid #5600E8',
			backgroundColor: '#F2F2F2',
			color: '#5600E8'
		}
	},
	failButton: {
		backgroundColor: '#FF001E',
		border: '3px solid #FF001E',
		'&:hover': {
			border: '3px solid #FF001E',
			backgroundColor: '#F2F2F2',
			color: '#FF001E'
		}
	},
	correctButton: {
		backgroundColor: '#28FC03',
		border: '3px solid #28FC03',
		'&:hover': {
			border: '3px solid #28FC03',
			backgroundColor: '#F2F2F2',
			color: '#28FC03'
		}
	},
	speaker: {
		width: '150px',
		height: '120px',
		marginBottom: '60px',
		cursor: 'pointer',
		color: '#5600E8',
		'&:hover': {
			transform: 'scale(1.2)'
		}
	},
	progressText: {
		fontFamily: 'inherit',
		color: 'inherit',
		marginBottom: '10px',
		fontSize: '1.5rem'
	},
	failText: {
		fontFamily: 'inherit',
		color: '#FF001E',
		fontSize: '1.2em'
	},
	correctText: {
		fontFamily: 'inherit',
		color: '#28FC03',
		fontSize: '1.2em'
	},
	loader: {
		position: 'absolute',
		color: '#5600E8',
		top: '50%',
		left: '50%'
	},
	savannaWord: {
		marginBottom: '300px',
		fontSize: '2rem',
		fontFamily: '"Itim", cursive;'
	},
	fullScreenBtn: {
		position: 'absolute',
		right: '20px',
		bottom: '20px',
		border: 'none',
		outline: 'none',
		cursor: 'pointer',
		fontWeight: 'bold',
		width: '50px',
		height: '50px',
		background: 'inherit'
	},
	fullScreenIcon: {
		cursor: 'pointer',
		fontSize: '50px',
		color: '#5600E8',
		'&:hover': {
			transform: 'scale(1.2)'
		}
	},
	series: {
		minHeight: '100px',
		display: 'flex',
		flexWrap: 'wrap',
		alignItems: 'center',
		justifyContent: 'flex-start',
		marginBottom: '15px',
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
		margin: '20px 0px 10px 0px',
		gap: '10px'
	},
	imageWrap: {
		borderRadius: '5px',
		cursor: 'pointer',
		position: 'relative',
		width: '180px',
		height: '180px',
		'@media (max-width: 900px)': {
			width: '140px',
			height: '140px'
		},
		'@media (max-width: 700px)': {
			width: '100px',
			height: '100px'
		}
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
		background: '#FF001E'
	},
	goodOverlay: {
		zIndex: '1',
		opacity: '0.4',
		background: '#28FC03'
	},
	image: {
		position: 'absolute',
		top: '0px',
		left: '0px',
		width: '100%',
		height: '100%',
		borderRadius: 'inherit',
		cursor: 'pointer'
	},
	currentWord: {
		fontSize: '3rem',
		fontFamily: 'inherit'
	},
	example: {
		margin: '10px',
		fontSize: '1.5rem',
		fontFamily: 'inherit',
		alignSelf: 'center'
	},
	finishLine: {
		marginBottom: '10px',
		backgroundColor: '#5600E8',
		width: '80%',
		maxWidth: '800px',
		height: '3px',
		color: 'red',
		border: 'none'
	}
});
