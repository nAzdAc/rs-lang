import { makeStyles } from '@material-ui/core/styles';
import { icons } from '../../assets/icons/IconsRequire';

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
		fontFamily: 'logo',
		marginTop: '0px',
		fontSize: '96px',
		lineHeight: '112px',
		fontWeight: '900',
		color: 'inherit',
		'@media (max-width: 768px)': {
			marginTop: '-15px',
			fontSize: '70px'
		}
	},
	title: (props) => ({
		fontSize: '4rem',
		marginBottom: '10px',
		fontFamily: props.theme === 'dark' ? 'darkTitle' : 'lightTitle',
		color: 'inherit',
		marginRight: 'auto',
		'@media (max-width: 768px)': {
			fontSize: '3rem'
		}
	}),
	subtitle: (props) => ({
		marginBottom: '20px',
		fontSize: '50px',
		color: 'inherit',
		fontFamily: props.theme === 'dark' ? 'darkTitle' : 'lightTitle',
		'@media (max-width: 768px)': {
			fontSize: '35px'
		}
	}),
	subtitle1: (props) => ({
		fontSize: '1.5rem',
		fontWeight: '400',
		marginRight: 'auto',
		margin: '15px',
		fontFamily: props.theme === 'dark' ? 'darkTitle' : 'lightTitle'
	}),
	subtitle2: {
		fontSize: '1.05rem',
		fontWeight: '400',
		margin: 'auto',
		color: 'inherit'
	},
	video: (props) => ({
		boxShadow:
			props.theme === 'dark' ? '3px 0px 10px 3px rgba(227, 134, 0, 0.5)' : '3px 0px 10px 3px rgba(86, 0, 232, 0.6)',
		margin: '15px 0px',
		border: 'none',
		borderRadius: '5px',
		width: '100%',
		maxWidth: '700px',
		height: '400px',
		cursor: props.theme === 'dark' ? `url(${icons.darkPointer}), pointer` : `url(${icons.lightPointer}), pointer`
	}),
	textImgWrapper: {
		color: 'inherit',
		display: 'flex',
		flexDirection: 'column'
	},
	text: {
		fontFamily: 'inherit',
		fontWeight: '400',
		margin: '10px 0px'
	},
	advantagesSection: (props) => ({
		color: 'inherit',
		backgroundColor: 'inherit',
		width: '85%',
		borderRadius: '5px',
		padding: '30px',
		marginBottom: '30px',
		marginTop: '10px',
		boxShadow:
			props.theme === 'dark' ? '3px 0px 10px 3px rgba(227, 134, 0, 0.5)' : '3px 0px 10px 3px rgba(86, 0, 232, 0.6)'
	}),
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
	}
});
