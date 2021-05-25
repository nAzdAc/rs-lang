import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
	button: {
		width: '72px',
		minWidth: '36px',
		height: '72px',
		fontSize: '52px',
		color: 'white',
		'@media (max-width: 650px)': {
			width: '53px',
			height: '53px',
			fontSize: '26px'
		},
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
		marginBottom: '-4px'
	}
});

export const LevelButton = ({ group, isActive, click, ...atr }) => {
	const classes = useStyles(group);

	return (
		<Button
			onClick={click}
			className={isActive ? `${classes.button} ${classes.buttonActive}` : `${classes.button}`}
			variant="contained"
		>
			{group}
		</Button>
	);
};
