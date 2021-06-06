import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
	root: {
		fontFamily: 'inherit',
		color: 'inherit',
		backgroundColor: 'inherit',
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		flexWrap: 'wrap',
		justifyContent: 'center',
		alignItems: 'center'
	},
	title: {
		fontSize: '5rem',
		marginBottom: '25px',
		marginRight: 'auto',
		'@media (max-width: 768px)': {
			fontSize: '3.5rem'
		}
	},
	buttonBox: {
		display: 'flex',
		flexWrap: 'wrap',
		marginBottom: '20px',
		gap: '30px',
		marginRight: 'auto',
		'@media (max-width: 768px)': {
			gap: '20px'
		}
	},
	lightTypeBox: {
		color: '#F2F2F2',
		backgroundColor: '#5600E8',
		width: '100%',
		display: 'flex',
		marginBottom: '20px'
	},
	darkTypeBox: {
		color: '#141414',
		backgroundColor: '#E38600',
		width: '100%',
		display: 'flex',
		marginBottom: '20px'
	},
	lightTypeButton: {
		fontFamily: 'inherit',
		width: '100%',
		height: '50px',
		fontSize: '0.95rem',
		fontWeight: '600',
		color: 'inherit',
		backgroundColor: 'inherit',
		borderRadius: '0',
		padding: '2px',
		'&:hover': {
			color: '#5600E8',
			backgroundColor: '#F2F2F2',
			boxShadow: '3px 0px 10px 3px rgba(0,0,0,0.25)'
		},
		'@media (max-width: 768px)': {
			fontSize: '0.65rem'
		}
	},
	lightTypeButtonActive: {
		borderBottom: '7px solid #BB86FC',
		marginBottom: '-7px'
	},
	darkTypeButton: {
		fontFamily: 'inherit',
		width: '100%',
		height: '50px',
		fontSize: '0.95rem',
		fontWeight: '600',
		color: '#141414',
		backgroundColor: '#E38600',
		borderRadius: '0',
		padding: '2px',
		'&:hover': {
			color: '#E38600',
			backgroundColor: '#141414',
			boxShadow: '3px 0px 10px 3px rgba(0,0,0,0.25)'
		},
		'@media (max-width: 768px)': {
			fontSize: '0.65rem'
		}
	},
	darkTypeButtonActive: {
		borderBottom: '7px solid #FCCA81',
		marginBottom: '-7px'
	},
	subtitle: {
		marginBottom: '20px',
		fontSize: '2.5rem',
		'@media (max-width: 768px)': {
			fontSize: '1.8rem'
		}
	},
	link: {
		fontFamily: 'inherit',
		fontWeight: '600',
		textDecoration: 'none',
		color: 'inherit',
		width: '100%',
		height: '100%'
	},
	lightPagination: {
		display: 'flex',
		margin: '25px',
		justifyContent: 'center',
		'& li': {
			color: 'inherit',
			fontFamily: 'inherit',
			'& .MuiPaginationItem-textPrimary.Mui-selected': {
				backgroundColor: '#5600E8',
				color: '#F2F2F2'
			},
			'& .MuiPaginationItem-root': {
				fontSize: '1.1rem',
				fontWeight: 'bold',
				color: 'inherit'
			}
		}
	},
	darkPagination: {
		display: 'flex',
		margin: '25px',
		justifyContent: 'center',
		'& li': {
			color: 'inherit',
			fontFamily: 'inherit',
			'& .MuiPaginationItem-textPrimary.Mui-selected': {
				backgroundColor: '#E38600',
				color: '#141414'
			},
			'& .MuiPaginationItem-root': {
				fontSize: '1.1rem',
				fontWeight: 'bold',
				color: 'inherit'
			}
		}
	},
	titleGames: {
		marginBottom: '24px'
	},
	gamesButtonsWrapper: {
		width: '500px',
		display: 'flex',
		justifyContent: 'space-between'
	},
	gamesWrapper: {
		width: '100%',
		marginTop: '24px',
		textAlign: 'left'
	},
	wordList: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		gap: '20px'
	},
	lightLevelTitle: {
		fontSize: '4.3rem',
		marginBottom: '25px',
		fontFamily: 'inherit',
		marginRight: 'auto',
		color: (group) =>
			group === 0
				? '#BB86FC'
				: group === 1
					? '#985EFF'
					: group === 2
						? '#7F39FB'
						: group === 3 ? '#6200EE' : group === 4 ? '#5600E8' : group === 5 ? '#3700B3' : '#3700B3',
		'@media (max-width: 768px)': {
			fontSize: '3.3rem'
		}
	},
	darkLevelTitle: {
		fontSize: '4.3rem',
		marginBottom: '25px',
		fontFamily: 'inherit',
		marginRight: 'auto',
		color: (group) =>
			group === 1
				? '#FCCA81'
				: group === 2
					? '#FCBD60'
					: group === 3
						? '#FAAC39'
						: group === 4 ? '#FC9F14' : group === 5 ? '#E38600' : group === 6 ? '#B86D00' : '#FCCA81',
		'@media (max-width: 768px)': {
			fontSize: '3.3rem'
		}
	}
});
