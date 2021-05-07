import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
	list: {
		display: 'Flex',
		justifyContent: 'center',
		flexDirection: 'column',
		marginBottom: '40px',
		marginTop: '40px'
	},
	loader: {
		position: 'relative',
		margin: '40px',
		alignSelf: 'center',
		justifySelf: 'center'
	}
}));
