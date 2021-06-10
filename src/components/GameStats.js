import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { showTitle } from '../utils/showTitle';
import winSong from '../assets/sounds/win.mp3';
import defeatSong from '../assets/sounds/defeat.mp3';
import { createSound } from '../utils/helpers';
import { useStyles } from '../styles/componentsStyles/GameStats.styles';
import { useDispatch, useSelector } from 'react-redux';
import { Howler } from 'howler';
import { GamePieChart } from './GamePieChart';
import { GameRow } from './GameRow';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CancelIcon from '@material-ui/icons/Cancel';
import { useMessage } from '../hooks/message.hook';
import { postStats } from '../redux/actions';

export const GameStats = ({ allSeries, correctAnswers, failAnswers, lifes, gameName }) => {
	const { soundVolume, theme } = useSelector((state) => state.settings);
	const classes = useStyles({ theme });
	const showMessage = useMessage();
	const dispatch = useDispatch();
	const { token } = useSelector((state) => state.userData);
	const [ title, setTitle ] = useState('');
	const audioWin = useMemo(() => createSound(winSong, soundVolume), [ soundVolume ]);
	const audioDefeat = useMemo(() => createSound(defeatSong, soundVolume), [ soundVolume ]);
	const [ addStats, setAddStats ] = useState(false);

	const sendUserStats = useCallback(
		async () => {
			if (!token) {
				return showMessage('Статистика не была обновлена, авторизуйтесь');
			}
			if (!correctAnswers.length && !failAnswers.length) return;
			const { text, code } = await dispatch(postStats(token, gameName, correctAnswers, failAnswers, allSeries));
			showMessage(text, code);
		},
		[ allSeries, correctAnswers, dispatch, failAnswers, gameName, showMessage, token ]
	);

	useEffect(
		() => {
			sendUserStats();
			setTitle(showTitle(failAnswers.length, correctAnswers.length, lifes));
			if (lifes <= 0 || !correctAnswers.length || failAnswers.length > 5) {
				audioDefeat.play();
			} else {
				audioWin.play();
			}
		},
		[ audioDefeat, audioWin, correctAnswers.length, failAnswers.length, lifes, sendUserStats ]
	);

	useEffect(
		() => {
			return () => {
				Howler.stop();
			};
		},
		[ audioWin, audioDefeat ]
	);

	return (
		<div className={classes.gameStatsRoot}>
			<h3 className={classes.gameStatsTitle}>{title}</h3>
			<div className={classes.contentContainer}>
				{addStats ? (
					<div className={classes.tableContainer}>
						<Table className={classes.table}>
							<TableHead>
								<TableRow>
									<TableCell>Слово</TableCell>
									<TableCell>Перевод</TableCell>
									<TableCell>Транскрипция</TableCell>
									<TableCell>Аудио</TableCell>
									<TableCell>
										<CancelIcon className={classes.cancelIcon} onClick={() => setAddStats(false)} />
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{failAnswers.map((answer, index) => {
									return <GameRow key={`${answer.word}fail-GameStats`} color="#FF001E" answer={answer} />;
								})}
								{correctAnswers.map((answer, index) => {
									return <GameRow key={`${answer.word}correct-GameStats`} color="#28FC03" answer={answer} />;
								})}
							</TableBody>
						</Table>
					</div>
				) : (
					<GamePieChart
						data={[
							{ name: 'Правильно:', value: correctAnswers.length || 0 },
							{ name: 'Ошибочно: ', value: failAnswers.length || 0 }
						]}
						all={correctAnswers.length + failAnswers.length}
						showAddStats={() => setAddStats(true)}
					/>
				)}
			</div>
		</div>
	);
};
