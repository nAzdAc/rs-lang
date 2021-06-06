import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
	root: {
		padding: '10px 10px 10px 20px',
		display: 'flex',
		flexDirection: 'column',
		backgroundColor: 'inherit',
		fontFamily: 'inherit',
		'& > header': {
			backgroundColor: '#5600E8'
		}
	},
	logo: {
		fontFamily: '"Permanent Marker", cursive',
		fontSize: '96px',
		lineHeight: '112px',
		fontWeight: '400',
		color: 'inherit',
		'@media (max-width: 768px)': {
			fontSize: '70px'
		}
	},
	title: {
		fontSize: '4rem',
		marginBottom: '10px',
		fontFamily: 'inherit',
		color: 'inherit',
		marginRight: 'auto',
		'@media (max-width: 768px)': {
			fontSize: '3rem'
		}
	},
	subtitle: {
		marginBottom: '20px',
		fontSize: '50px',
		color: 'inherit',
		fontFamily: 'inherit',
		'@media (max-width: 768px)': {
			fontSize: '35px'
		}
	},
	subtitle1: {
		fontSize: '1.5rem',
		fontWeight: '650',
		marginRight: 'auto',
		margin: '15px',
		fontFamily: 'inherit'
	},
	subtitle2: {
		fontSize: '1.05rem',
		fontWeight: '500',
		margin: 'auto',
		color: 'inherit'
	},
	video: {
		margin: '15px 0px',
		border: 'none',
		borderRadius: '5px',
		width: '100%',
		maxWidth: '700px',
		height: '400px'
	},
	textImgWrapper: {
		color: 'inherit',
		display: 'flex',
		flexDirection: 'column'
	},
	text: {
		fontFamily: 'inherit',
		fontWeight: '500',
		margin: '10px 0px'
	},
	advantagesSection: {
		color: 'inherit',
		backgroundColor: 'inherit',
		width: '85%',
		borderRadius: '5px',
		padding: '30px',
		marginBottom: '30px',
		marginTop: '10px',
		boxShadow: '3px 0px 10px 3px rgba(0,0,0,0.25)'
	},
	advantagesWrapper: {
		display: 'flex',
		justifyContent: 'space-evenly',
		alignItems: 'center',
		flexWrap: 'wrap',
		'@media (max-width: 540px)': {
			justifyContent: 'center'
		}
	},
	advantage: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		textAlign: 'center',
		minWidth: '200px',
		margin: '10px',
		color: 'inherit'
	},
	advantageImg: {
		width: '100px',
		height: '100px',
		marginBottom: '10px'
	},
	developers: {
		display: 'flex',
		justifyContent: 'center',
		flexWrap: 'wrap'
	},
	developerCard: {
		backgroundColor: 'inherit',
		boxShadow: '3px 0px 10px 3px rgba(0,0,0,0.25)',
		margin: '20px',
		padding: '10px',
		width: '350px',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'space-evenly',
		gap: '10px',
		color: 'inherit'
	},
	developerImg: {
		width: '300px',
		borderRadius: 'inherit'
	},
	githubLink: {
		color: 'inherit'
	},
	githubWrap: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		gap: '10px',
		cursor: 'pointer'
	},
	githubImage: {
		fontSize: '30px'
	}
});
