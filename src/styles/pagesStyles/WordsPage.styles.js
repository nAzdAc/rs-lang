import { makeStyles } from '@material-ui/core/styles';
import { icons } from '../../assets/icons/IconsRequire';

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
	typeBox: (props) => ({
		color: props.theme === 'dark' ? '#141414' : '#F2F2F2',
		backgroundColor: props.theme === 'dark' ? '#E38600' : '#5600E8',
		width: '100%',
		display: 'flex',
		marginBottom: '20px'
	}),
	typeButton: (props) => ({
		fontFamily: 'inherit',
		width: '100%',
		height: '50px',
		fontSize: '0.95rem',
		fontWeight: '600',
		color: 'inherit',
		backgroundColor: 'inherit',
		borderRadius: '0',
		cursor: props.theme === 'dark' ? `url(${icons.darkPointer}), default` : `url(${icons.lightPointer}), default`,
		padding: '2px',
		'&:hover': {
			color: props.theme === 'dark' ? '#E38600' : '#5600E8',
			backgroundColor: props.theme === 'dark' ? '#141414' : '#F2F2F2',
			boxShadow: '3px 0px 10px 3px rgba(0,0,0,0.25)'
		},
		'@media (max-width: 768px)': {
			fontSize: '0.65rem'
		}
	}),
	typeButtonActive: (props) => ({
		borderBottom: '7px solid',
		borderColor: props.theme === 'dark' ? '#FCCA81' : '#BB86FC',
		marginBottom: '-7px'
	}),
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
	pagination: (props) => ({
		cursor: props.theme === 'dark' ? `url(${icons.darkPointer}), default` : `url(${icons.lightPointer}), default`,
		display: 'flex',
		margin: '25px',
		justifyContent: 'center',
		'& li': {
			cursor: props.theme === 'dark' ? `url(${icons.darkPointer}), default` : `url(${icons.lightPointer}), default`,
			color: 'inherit',
			fontFamily: 'inherit',
			'& .MuiPaginationItem-textPrimary.Mui-selected': {
				cursor: props.theme === 'dark' ? `url(${icons.darkPointer}), default` : `url(${icons.lightPointer}), default`,
				backgroundColor: props.theme === 'dark' ? '#E38600' : '#5600E8',
				color: props.theme === 'dark' ? '#141414' : '#F2F2F2'
			},
			'& .MuiPaginationItem-root': {
				cursor: props.theme === 'dark' ? `url(${icons.darkPointer}), default` : `url(${icons.lightPointer}), default`,
				fontSize: '1.1rem',
				fontWeight: 'bold',
				color: 'inherit'
			}
		}
	}),
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
	levelTitle: (props) => ({
		fontSize: '4.3rem',
		marginBottom: '25px',
		fontFamily: 'inherit',
		marginRight: 'auto',
		color:
			props.theme === 'dark'
				? props.group === 1
					? '#FCCA81'
					: props.group === 2
						? '#FCBD60'
						: props.group === 3
							? '#FAAC39'
							: props.group === 4
								? '#FC9F14'
								: props.group === 5 ? '#E38600' : props.group === 6 ? '#B86D00' : '#FCCA81'
				: props.group === 1
					? '#BB86FC'
					: props.group === 2
						? '#985EFF'
						: props.group === 3
							? '#7F39FB'
							: props.group === 4
								? '#7314FA'
								: props.group === 5 ? '#5600E8' : props.group === 6 ? '#3700B3' : '#BB86FC',
		'@media (max-width: 768px)': {
			fontSize: '3.3rem'
		}
	})
});
