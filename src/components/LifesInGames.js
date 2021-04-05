import React from 'react';
import Rating from '@material-ui/lab/Rating';
import { withStyles } from '@material-ui/core/styles';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Box } from '@material-ui/core';

const StyledRating = withStyles({
	iconFilled: {
		color: 'red'
	}
})(Rating);


export const LifesInGames = ({ lifes }) => {
	return (
		<Box component="fieldset" mb={3} borderColor="transparent">
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
