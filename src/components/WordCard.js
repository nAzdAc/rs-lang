import React, { useState } from 'react';
import { originURL } from '../utils/backRoutes';
import GradeIcon from '@material-ui/icons/Grade';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import DeleteIcon from '@material-ui/icons/Delete';
import { useStyles } from '../styles/componentsStyles/WordCard.styles';
import { Paper, Typography } from '@material-ui/core';
import { convertText, createSound } from '../utils/helpers';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import { updateUserWord } from '../redux/actions';
import { Howler } from 'howler';

export const WordCard = ({ word }) => {
	// console.log(word.deleted);
	// console.log(typeof word.deleted);
	const classes = useStyles();
	const dispatch = useDispatch();
	const styles = classNames.bind(classes);
	const starIcon = styles({ bigCardIcon: true }, { goldIcon: word.difficult });
	const { wordVolume } = useSelector((state) => state.settings);
	const { token } = useSelector((state) => state.userData);
	const [ additionalInfo, setAdditionalInfo ] = useState(false);

	const handleAdditinalInfo = () => {
		setAdditionalInfo((prev) => !prev);
	};

	const play = (event) => {
		event.stopPropagation();
		Howler.stop();
		const src = event.currentTarget.value;
		const audioWord = createSound(`${originURL}/${src}`, wordVolume);
		audioWord.play();
	};

	const updateWord = async (event) => {
		event.stopPropagation();
		const body = {
			wordId: event.currentTarget.id,
			name: event.currentTarget.dataset.name,
			value: event.currentTarget.value
		};
		console.log(body);
		dispatch(updateUserWord(body, token));
	};

	return (
		<Paper className={classes.wordCard} onClick={handleAdditinalInfo}>
			<div className={classes.mainInfo}>
				<img className={classes.cardImage} src={`${originURL}/${word.image}`} alt={word.word} title={word.word} />

				<div className={classes.cardContent}>
					<div className={classes.infoPanel}>
						{word.deleted ? (
							<button
								data-name="deleted"
								id={word._id}
								value={word.deleted}
								className={classes.deleteButton}
								onClick={updateWord}
							>
								Восстановить
							</button>
						) : (
							<React.Fragment>
								<button
									data-name="deleted"
									id={word._id}
									value={word.deleted}
									onClick={updateWord}
									className={classes.iconWrap}
								>
									<DeleteIcon className={classes.bigCardIcon} />
								</button>

								<button
									data-name="difficult"
									id={word._id}
									value={word.difficult}
									onClick={updateWord}
									className={classes.iconWrap}
								>
									<GradeIcon className={starIcon} />
								</button>
							</React.Fragment>
						)}
						<Typography className={classes.wordText} variant="h5">
							Правильно:&#160;
							<span className={classes.correctText}>{word.correct || 0}&#160;</span>
						</Typography>
						<Typography className={classes.wordText} variant="h5">
							Ошибочно:&#160;
							<span className={classes.failText}>{word.fail || 0}</span>
						</Typography>
					</div>

					<div className={classes.cardUnitWrap}>
						<button className={classes.iconWrap} value={word.audio} onClick={play}>
							<PlayCircleFilledIcon className={classes.bigCardIcon} />
						</button>
						<Typography
							className={classes.wordText}
							variant="h4"
						>{`${word.word} ${word.transcription} \u2014 ${word.wordTranslate}`}</Typography>
					</div>
				</div>
			</div>
			{additionalInfo && (
				<div className={classes.additionalInfo}>
					<div className={classes.cardContent}>
						<div className={classes.cardUnitWrap}>
							<button className={classes.iconWrap} value={word.audioMeaning} onClick={play}>
								<PlayCircleFilledIcon className={classes.littleCardIcon} />
							</button>
							<Typography className={classes.englishText} variant="h6">
								{convertText(word.textMeaning)}
							</Typography>
						</div>
						<Typography className={classes.translateText} variant="h6">
							{word.textMeaningTranslate}
						</Typography>
					</div>

					<div className={classes.cardContent}>
						<div className={classes.cardUnitWrap}>
							<button className={classes.iconWrap} value={word.audioExample} onClick={play}>
								<PlayCircleFilledIcon className={classes.littleCardIcon} />
							</button>
							<Typography className={classes.englishText} variant="h6">
								{convertText(word.textExample)}
							</Typography>
						</div>
						<Typography className={classes.translateText} variant="h6">
							{word.textExampleTranslate}
						</Typography>
					</div>
				</div>
			)}
		</Paper>
	);
};
