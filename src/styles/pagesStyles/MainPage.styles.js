import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
	root: {
		backgroundColor: '#F2F2F2',
		padding: '10px 10px 10px 20px',
		display: 'flex',
		flexDirection: 'column',
		'& > header': {
			backgroundColor: '#5600e8'
		}
	},
	logo: {
		fontFamily: '"Permanent Marker", cursive',
		fontSize: '96px',
		lineHeight: '112px',
		fontWeight: '400',
		color: '#5600E8',
		'@media (max-width: 768px)': {
			fontSize: '70px'
		}
	},
	title: {
		fontSize: '4rem',
		marginBottom: '10px',
		fontFamily: '"Itim", cursive;',
		color: '#5600E8',
		marginRight: 'auto',
		'@media (max-width: 768px)': {
			fontSize: '3rem'
		}
	},
	subtitle: {
		marginBottom: '20px',
		fontSize: '50px',
		color: '#5600E8',
		fontFamily: '"Itim", cursive;',
		'@media (max-width: 768px)': {
			fontSize: '35px'
		}
	},
	subtitle1: {
		fontSize: '1.5rem',
		fontWeight: '650',
		marginRight: 'auto',
		margin: '15px'
	},
	subtitle2: {
		fontSize: '1.05rem',
		fontWeight: '500',
		margin: 'auto'
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
		color: '#5600E8',
		display: 'flex',
		flexDirection: 'column'
	},
	text: {
		fontFamily: '"Itim", cursive;',
		fontWeight: '500',
		margin: '10px 0px'
	},
	advantagesSection: {
		backgroundColor: '#F2F2F2',
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
		color: '#5600E8'
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
		backgroundColor: '#F2F2F2',
		boxShadow: '3px 0px 10px 3px rgba(0,0,0,0.25)',
		margin: '20px',
		padding: '10px',
		width: '350px',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'space-evenly',
		gap: '10px',
		color: '#5600E8'
	},
	developerImg: {
		width: '300px',
		borderRadius: 'inherit'
	},
	githubWrap: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		gap: '10px',
		cursor: 'pointer'
	},
	gitImage: {
		color: '#5600E8'
	}
});
