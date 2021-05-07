import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
	root: {
		display: 'flex',
		flexDirection: 'column',
		flexWrap: 'wrap',
		alignItems: 'center',
		paddingTop: '30px',
		width: '100%'
	},
	title: {
		marginBottom: '20px'
	},
	subtitle: {
		marginTop: '10px',
		marginBottom: '10px'
	},
	rowsWrap: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-start',
		width: '90%',
		marginBottom: '30px'
	},
	row: {
		width: '100%',
		display: 'flex',
		alignItems: 'center',
		marginBottom: '5px'
	},
	rowItem: {
		marginRight: '10px'
	},
	button: {
		marginRight: '10px',
		border: 'none',
		outline: 'none',
		cursor: 'pointer',
		fontWeight: 'bold',
		width: '30px',
		height: '40px',
		background: 'white',
		color: '#FFF'
	},
	goodSpeaker: {
		cursor: 'pointer',
		color: '#01A299',
		'&:hover': {
			color: '#00D9CE'
		}
	},
	badSpeaker: {
		cursor: 'pointer',
		color: '#f50057',
		'&:hover': {
			color: '#f74383'
		}
	},
	cardsContainer: {
		display: 'flex',
		flexWrap: 'wrap'
	},
	savannaContainer: {
		display: 'flex',
    flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		width: '100%',
		height: '300px',
	},
  image: {
    width: '200px',
    height: '200px',
    marginRight: '40px',
  },
	content: {
    display: 'flex',
    flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'space-between',
  },
  textMeaning: {
    marginBottom: '30px',
  },
  translate: {
    fontWeight: 'bold',
  },
  failColor: {
    color: '#f50057',
  }
});
