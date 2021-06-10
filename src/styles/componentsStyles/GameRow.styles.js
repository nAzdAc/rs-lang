import { makeStyles } from '@material-ui/core/styles';
import { icons } from '../../assets/icons/IconsRequire';

export const useStyles = makeStyles({
	translateText: {
		fontFamily: 'inherit',
		color: 'inherit',
		fontStyle: 'italic'
	},
	englishText: {
		fontFamily: 'inherit',
		color: 'inherit',
		fontWeight: '600'
	},
	iconWrap: (props) => ({
		marginRight: '5px',
		border: 'none',
		outline: 'none',
		cursor: props.theme === 'dark' ? `url(${icons.darkPointer}), default` : `url(${icons.lightPointer}), default`,
		fontWeight: 'bold',
		background: 'inherit',
		color: 'inherit'
	}),
	icon: (props) => ({
		cursor: props.theme === 'dark' ? `url(${icons.darkPointer}), default` : `url(${icons.lightPointer}), default`,
		fontSize: '2.5rem',
		color: 'inherit',
		'&:hover': {
			transform: 'scale(1.2)'
		},
		'@media (max-width: 900px)': {
			fontSize: '2rem'
		},
		'@media (max-width: 600px)': {
			fontSize: '1.5rem'
		}
	}),
	addContainer: {
		backgroundColor: 'inherit',
		fontFamily: 'inherit',
		display: 'flex',
		flexWrap: 'wrap',
		alignItems: 'center',
		justifyContent: 'space-around',
		gap: '20px',
		padding: '10px 0px'
	},
	addImage: {
		width: '200px',
		height: '200px',
		borderRadius: '5px'
	},
	addTextWrapper: {
		display: 'flex',
		flexDirection: 'column',
		flexWrap: 'wrap',
		alignItems: 'center',
		gap: '30px'
	}
});
