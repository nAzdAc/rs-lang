import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
	root: {
		backgroundColor: '#FCFCFF',
		padding: '10px 10px 10px 20px',
		display: 'flex',
		flexDirection: 'column',
		'& > header': {
			backgroundColor: '#5600e8'
		}
	},
	title: {
		marginBottom: '20px',
		fontFamily: '"Permanent Marker", cursive',
		fontSize: '96px',
		lineHeight: '112px',
		fontWeight: '400',
		color: '#5600E8',
		'@media (max-width: 750px)': {
			fontSize: '60px'
		}
	},
	subtitle: {
		marginBottom: '20px',
		'@media (max-width: 750px)': {
			fontSize: '30px'
		}
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
		display: 'flex',
		flexDirection: 'column'
	},
	text: {
		margin: '20px 0px'
	},
	advantagesSection: {
		borderRadius: '5px',
		background: '#C8FFF4',
		padding: '30px',
		marginBottom: '30px'
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
		minWidth: '200px',
		margin: '10px'
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
		margin: '20px',
		padding: '10px',
		width: '350px',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'space-evenly',
		gap: '10px'
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
	}
});
