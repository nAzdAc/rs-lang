import { makeStyles } from '@material-ui/core/styles';
import { icons } from '../../assets/icons/IconsRequire';

export const useStyles = makeStyles({
	gameStatsRoot: {
		display: 'flex',
		flexDirection: 'column',
		flexWrap: 'wrap',
		alignItems: 'center',
		color: 'inherit',
		fontFamily: 'inherit',
		background: 'inherit',
		gap: '15px'
	},
	gameStatsTitle: {
		marginLeft: '15px',
		fontSize: '3rem',
		fontFamily: 'inherit',
		marginRight: 'auto',
		'@media (max-width: 768px)': {
			fontSize: '1.8rem'
		}
	},
	contentContainer: {
		width: '100%',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},
	tableContainer: (props) => ({
		margin: '0px 20px 0px 20px',
		backgroundColor: 'inherit',
		fontFamily: 'inherit',
		color: 'inherit',
		maxHeight: '450px',
		overflowY: 'scroll',
		width: '100%',
		maxWidth: '700px',
		boxShadow:
			props.theme === 'dark' ? '3px 0px 10px 3px rgba(227, 134, 0, 0.5)' : '3px 0px 10px 3px rgba(86, 0, 232, 0.6)',
		'&::-webkit-scrollbar': {
			width: '5px',
			height: '5px'
		},
		'&::-webkit-scrollbar-thumb': {
			borderRadius: '20px',
			backgroundColor: props.theme === 'dark' ? '#E38600' : '#5600E8'
		}
	}),
	table: (props) => ({
		boxShadow:
			props.theme === 'dark' ? '3px 0px 10px 3px rgba(227, 134, 0, 0.5)' : '3px 0px 10px 3px rgba(86, 0, 232, 0.6)',
		'& .MuiTableRow-root': {
			fontSize: '1.4rem',
			padding: '0px',
			borderColor: props.theme === 'dark' ? '#FCCA81' : '#BB86FC',
			'@media (max-width: 768px)': {
				fontSize: '1.1rem'
			},
			'@media (max-width: 600px)': {
				fontSize: '0.8rem'
			},
			'& .MuiTableCell-head': {
				fontSize: '1em',
				fontWeight: '600',
				color: 'inherit',
				fontFamily: 'inherit',
				padding: '10px',
				textAlign: 'center',
				borderColor: 'inherit'
			},
			'& .MuiTableCell-body': {
				fontSize: '0.8em',
				color: 'inherit',
				fontFamily: 'inherit',
				padding: '0px',
				textAlign: 'center',
				borderColor: 'inherit'
			}
		}
	}),
	cancelIcon: (props) => ({
		cursor: props.theme === 'dark' ? `url(${icons.darkPointer}), pointer` : `url(${icons.lightPointer}), pointer`,
		width: '40px',
		height: '40px',
		'&:hover': {
			transform: 'scale(1.1)'
		}
	})
});
