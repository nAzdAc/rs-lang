import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
	levelTitle: {
		marginBottom: '20px',
		color: (group) =>
			group === 0
				? '#BB86FC'
				: group === 1
					? '#985EFF'
					: group === 2
						? '#7F39FB'
						: group === 3 ? '#6200EE' : group === 4 ? '#5600E8' : group === 5 ? '#3700B3' : '#3700B3',
		'@media (max-width: 670px)': {
			fontSize: '40px',
		}
	},
	pagination: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: '20px',
	}
});
