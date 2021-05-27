import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
	button: {
		width: '72px',
		minWidth: '36px',
		height: '72px',
		fontWeight: '600',
		fontSize: '52px',
		color: '#F2F2F2',
		'@media (max-width: 768px)': {
			width: '57px',
			height: '57px',
			fontSize: '27px'
		},
		'&:hover': {
			color: '#5600E8',
			backgroundColor: '#F2F2F2',
			boxShadow: '3px 0px 10px 3px rgba(0,0,0,0.25)'
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
		borderBottom: '5px solid #F2F2F2',
		marginBottom: '-5px'
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
