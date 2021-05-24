import React, { useState } from 'react';
import { originURL } from '../utils/backRoutes';
import GradeIcon from '@material-ui/icons/Grade';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import DeleteIcon from '@material-ui/icons/Delete';
import { useStyles } from '../styles/componentsStyles/WordCard.styles';
import { Typography } from '@material-ui/core';
import { convertText, createSound } from '../utils/helpers';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import { updateUserWord } from '../redux/actions';

export const DictionaryCard = ({ word }) => {
	// console.log(word.difficult);
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
		<div className={classes.wordCard} onClick={handleAdditinalInfo}>
			<img className={classes.cardImage} src={`${originURL}/${word.image}`} alt={word.word} title={word.word} />

			<div className={classes.cardContent}>
				<div className={classes.cardUnitWrap}>
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
					<Typography variant="h4">
						Правильно:&#160;
						<span className={classes.correct}>{word.correct}&#160;</span>
					</Typography>
					<Typography variant="h4">
						Ошибочно:&#160;
						<span className={classes.fail}>{word.fail}</span>
					</Typography>
				</div>

				<div className={classes.cardUnitWrap}>
					<button className={classes.iconWrap} value={word.audio} onClick={play}>
						<PlayCircleFilledIcon className={classes.bigCardIcon} />
					</button>
					<Typography variant="h3">{`${word.word} ${word.transcription} \u2014 ${word.wordTranslate}`}</Typography>
				</div>
			</div>

			{additionalInfo && (
				<div>
					<div className={classes.cardContent}>
						<div className={classes.cardUnitWrap}>
							<button className={classes.iconWrap} value={word.audioMeaning} onClick={play}>
								<PlayCircleFilledIcon className={classes.littleCardIcon} />
							</button>
							<Typography className={classes.englishText} variant="h5">
								{convertText(word.textMeaning)}
							</Typography>
						</div>
						<Typography className={classes.translateText} variant="h5">
							{word.textMeaningTranslate}
						</Typography>
					</div>

					<div className={classes.cardContent}>
						<div className={classes.cardUnitWrap}>
							<button className={classes.iconWrap} value={word.audioExample} onClick={play}>
								<PlayCircleFilledIcon className={classes.littleCardIcon} />
							</button>
							<Typography className={classes.englishText} variant="h5">
								{convertText(word.textExample)}
							</Typography>
						</div>
						<Typography className={classes.translateText} variant="h5">
							{word.textExampleTranslate}
						</Typography>
					</div>
				</div>
			)}
		</div>
	);
};
