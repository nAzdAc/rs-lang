import Rating from '@material-ui/lab/Rating';
import { withStyles } from '@material-ui/core/styles';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';

const StyledRating = withStyles({
	iconFilled: {
		color: '#FF001E'
	}
})(Rating);

const useStyles = makeStyles({
	lightLifesContainer: {
		'& .MuiRating-root': {
			'& .MuiRating-iconEmpty': {
				color: '#BB86FC'
			}
		}
	},
	darkLifesContainer: {
		'& .MuiRating-root': {
			'& .MuiRating-iconEmpty': {
				color: '#FCCA81'
			}
		}
	}
});

export const LifesInGames = ({ lifes }) => {
	const classes = useStyles();
	const { theme } = useSelector((state) => state.settings);
	return (
		<Box
			className={theme === 'dark' ? classes.darkLifesContainer : classes.lightLifesContainer}
			component="fieldset"
			mb={3}
			borderColor="transparent"
		>
			<StyledRating
				name="customized-color"
				readOnly={true}
				value={lifes || 0}
				size="large"
				icon={<FavoriteIcon fontSize="inherit" />}
			/>
		</Box>
	);
};
