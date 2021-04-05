import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
const classNames = require('classnames/bind');

const useStyles = makeStyles({
	root: {
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
export const SavannaStatsCard = ({ item, fail }) => {
	const { english, russian, src, meaning } = item;
  
	const classes = useStyles();
  const zalupa = classNames.bind(classes)
  const styles = zalupa({ textMeaning: true }, { failColor: fail })

	return (
		<div className={classes.root}>
			<img className={classes.image} src={src} alt={english} title={english} />
			<div className={classes.content}>
      <Typography variant="h6" className={styles}>
					{meaning}
				</Typography>
				<Typography variant="h5" className={styles}>
					{`${english} - ${russian}`}
				</Typography>
			</div>
		</div>
	);
};
