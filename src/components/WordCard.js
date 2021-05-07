import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { originURL } from '../utils/backRoutes';
import Box from '@material-ui/core/Box';
import { useStyles } from '../styles/componentsStyles/WordCard.styles';

export const WordCard = (props) => {
	const classes = useStyles();

	function FormRow() {
		return (
			<React.Fragment>
				<Grid className={classes.item} item xs={3}>
					<Paper className={classes.paper}>
						<img className={classes.img} src={`${originURL}/${props.image}`} alt="img" />
					</Paper>
				</Grid>
				<Grid className={classes.item} item xs={4}>
					<Paper className={classes.paper}>
						<Box className={classes.wordExample}>
							<Box component="span" mr={1}>
								{props.word}
							</Box>
							<Box component="span" mr={1}>
								{props.transcription}
							</Box>
							<Box component="span">{props.wordTranslate}</Box>
						</Box>
						<Box className={classes.textEx}>{props.textMeaning}</Box>
						<Box className={classes.textExTr}>{props.textMeaningTranslate}</Box>
					</Paper>
				</Grid>
				<Grid className={classes.item} item xs={4}>
					<Paper className={classes.paper}>
						{props.infoPanel}
						<Box className={classes.textEx}>{props.textExample}</Box>
						<Box className={classes.textExTr}>{props.textExampleTranslate}</Box>
					</Paper>
				</Grid>
			</React.Fragment>
		);
	}

	return (
		<div className={classes.root}>
			<Grid className={classes.conteiner} container item xs={12} spacing={3}>
				<FormRow />
			</Grid>
		</div>
	);
}
