import { makeStyles } from '@material-ui/core/styles';

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
		height: '450px',
		overflowY: 'scroll',
		width: '100%',
		maxWidth: '700px',
		boxShadow: '3px 0px 10px 3px rgba(0,0,0,0.25)',
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
		'& .MuiTableRow-root': {
			padding: '0px',
			borderColor: props.theme === 'dark' ? '#FCCA81' : '#BB86FC',
			'& .MuiTableCell-head': {
				fontSize: '1.3rem',
				fontWeight: '600',
				color: 'inherit',
				fontFamily: 'inherit',
				padding: '10px',
				textAlign: 'center',
				borderColor: 'inherit',
				'@media (max-width: 768px)': {
					fontSize: '1rem'
				},
				'@media (max-width: 550px)': {
					fontSize: '0.85rem'
				}
			},
			'& .MuiTableCell-body': {
				fontSize: '1.1rem',
				color: 'inherit',
				fontFamily: 'inherit',
				padding: '0px',
				textAlign: 'center',
				borderColor: 'inherit',
				'@media (max-width: 768px)': {
					fontSize: '0.85rem'
				},
				'@media (max-width: 550px)': {
					fontSize: '0.75rem'
				}
			}
		}
	}),
	cancelIcon: {
		cursor: 'pointer',
		width: '40px',
		height: '40px',
		'&:hover': {
			transform: 'scale(1.2)'
		}
	}
});
