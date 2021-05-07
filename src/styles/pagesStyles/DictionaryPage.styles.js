import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			marginTop: theme.spacing(2)
		}
	},
	container: {
		width: '100%',
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'center',
		aligneItems: 'flex-start'
	},
	title: {
		marginRight: '40px',
		fontSize: '60px',
		fontStyle: 'normal',
		fontWeight: '300',
		lineHeight: '80px',
		textAlign: 'left',
		color: '#000000',
		verticalAlign: 'middle'
	},
	message: {
		// marginRight: "40px",
		fontSize: '30px',
		fontStyle: 'italic',
		fontWeight: '300',
		verticalAlign: 'middle'
	},
	titleBox: {
		height: '72px',
		display: 'flex',
		marginTop: '80px',
		marginRight: 'auto',
		width: '100%'
	},
	typeBox: {
		width: '100%',
		height: '48px',
		display: 'flex',
		marginTop: '40px',
		// backgroundColor:'#6200EE',
		justifyContent: 'space-around'
		// marginRight: "auto",
	},
	typeButton: {
		width: '100%',
		fontSize: '14px',
		fontWeight: '500',
		color: 'white',
		backgroundColor: '#6200EE',
		borderRadius: '0'
	},
	typeButtonActive: {
		borderBottom: '4px solid white',
		margiBottom: '-4px',
		color: 'white',
		backgroundColor: '#6200EE'
	},
	buttonBox: {
		width: '100%',
		display: 'flex',
		marginTop: '40px',
		marginRight: 'auto',
		flexWrap: 'wrap'
	},
	link: {
		textDecoration: 'none'
	},
	pagination: {
		margin: '40px',
		fontSize: '40px'
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
	}
}));
