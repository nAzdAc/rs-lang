import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
	root: {
		'& > *': {
			margin: '8px'
		}
	},
	button: {
		marginRight: '40px',
		width: '72px',
		height: '72px',
		fontSize: '52px',
		color: 'white',
		backgroundColor: (group) =>
			group === 1
				? '#BB86FC'
				: group === 2
					? '#985EFF'
					: group === 3
						? '#7F39FB'
						: group === 4 ? '#6200EE' : group === 5 ? '#5600E8' : group === 6 ? '#3700B3' : '#3700B3'
	},
	buttonActive: {
		borderBottom: '4px solid white',
		margiBottom: '-4px'
	}
});
