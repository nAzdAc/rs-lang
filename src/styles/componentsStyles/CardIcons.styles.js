import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		boxSizing: 'border-box'
	},
	boxIcons: {
		paddingLeft: '40px',
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'left',
		fontSize: '34px'
	},
	icons: {
		marginRight: '10px',
		fontSize: '34px',
		color: '#000000',
		cursor: 'pointer'
	},
	iconActive: {
		color: '#FFD700',
		marginRight: '10px',
		fontSize: '34px',
		cursor: 'pointer'
	}
}));
