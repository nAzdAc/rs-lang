import React, { useEffect, useRef } from 'react';
import Typography from '@material-ui/core/Typography';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Paper } from '@material-ui/core';
import { useStyles, VolumeSlider, PurpleSwitch, marks } from '../styles/pagesStyles/StatsGamesSettings.styles';
import { reduxFetchSettings, reduxUpload, setVolume } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useMessage } from '../hooks/message.hook';

export const SettingsPage = () => {
	const dispatch = useDispatch();
	const settings = useSelector((state) => state.app.settings);
	const { token, avatarURL } = useSelector((state) => state.app.userData);
	const message = useMessage();
	const classes = useStyles();
	const soundSlider = useRef();
	const musicSlider = useRef();
	const wordSlider = useRef();
	const difficultWordSwitch = useRef();
	const deleteWordSwitch = useRef();
	const translateWordSwitch = useRef();
	const translateSentencesSwitch = useRef();

	useEffect(
		() => {
			[ musicSlider.current, soundSlider.current, wordSlider.current ].forEach((elem) => {
				elem.addEventListener('mouseup', async (e) => {
					dispatch(reduxFetchSettings(e.target.ariaValueText, e.target.ariaValueNow, token));
				});
			});
		},
		[ dispatch, token ]
	);

	const handleVolume = (e, newValue) => {
		dispatch(setVolume(e.target.ariaValueText, newValue));
	};

	const handleSwitch = (e) => {
		dispatch(reduxFetchSettings(e.target.name, e.target.checked, token));
	};

	const handleAvatar = async (e) => {
		if (!token) {
			return message('Для загрузки фото необходимо авторизоваться.', 400);
		}
		if (!e.target.files[0]) {
			return message('Выберите файл', 400);
		}
		const { text, code } = await dispatch(reduxUpload(e.target.files[0], token));
		message(text, code);
	};

	return (
		<div className={classes.root}>
			<Typography variant="h2" className={classes.title}>
				Настройки
			</Typography>
			<div className={classes.cardsWrap}>
				<Paper className={classes.card}>
					<Typography variant="h4" className={classes.subtitle}>
						Отображение кнопок
					</Typography>
					<div className={classes.buttonsWrapper}>
						<Typography variant="subtitle1">Сложное слово</Typography>
						<PurpleSwitch
							aria-valuetext="difficultWord"
							name="difficultWord"
							data-name="difficultWord"
							onChange={handleSwitch}
							checked={settings.difficultWord}
							ref={difficultWordSwitch}
						/>
					</div>
					<div className={classes.buttonsWrapper}>
						<Typography variant="subtitle1">Удалить слово</Typography>
						<PurpleSwitch
							aria-valuetext="deleteWord"
							name="deleteWord"
							data-name="deleteWord"
							onChange={handleSwitch}
							checked={settings.deleteWord}
							ref={deleteWordSwitch}
						/>
					</div>
				</Paper>
				<Paper className={classes.card}>
					<Typography variant="h4" className={classes.subtitle}>
						Отображение перевода
					</Typography>
					<div className={classes.buttonsWrapper} style={{ width: '250px' }}>
						<Typography variant="subtitle1">Перевод слов</Typography>
						<PurpleSwitch
							aria-valuetext="translateWord"
							name="translateWord"
							data-name="translateWord"
							onChange={handleSwitch}
							checked={settings.translateWord}
							ref={translateWordSwitch}
						/>
					</div>
					<div className={classes.buttonsWrapper} style={{ width: '250px' }}>
						<Typography variant="subtitle1">Перевод предложений</Typography>
						<PurpleSwitch
							aria-valuetext="translateSentences"
							name="translateSentences"
							data-name="translateSentences"
							onChange={handleSwitch}
							checked={settings.translateSentences}
							ref={translateSentencesSwitch}
						/>
					</div>
				</Paper>
				<ToastContainer />
				<Paper className={classes.card}>
					<Typography variant="h4" className={classes.subtitle}>
						Аватар
					</Typography>
					<img alt="avatar" className={classes.avatarImage} src={avatarURL} />
					<label htmlFor="file" className={classes.upload}>
						+ ИЗМЕНИТЬ
					</label>
					<input style={{ display: 'none' }} type="file" id="file" accept="image/*" onChange={handleAvatar} />
				</Paper>
				<Paper className={classes.card}>
					<Typography variant="h6" className={classes.subtitle}>
						Громкость музыки
					</Typography>
					<VolumeSlider
						marks={marks}
						valueLabelDisplay="auto"
						aria-label="pretto slider"
						aria-valuetext="musicVolume"
						data-name="musicVolume"
						ref={musicSlider}
						value={settings.musicVolume}
						onChange={handleVolume}
					/>
					<Typography variant="h6" className={classes.subtitle}>
						Громкость звуков
					</Typography>
					<VolumeSlider
						marks={marks}
						valueLabelDisplay="auto"
						aria-label="pretto slider"
						aria-valuetext="soundVolume"
						data-name="soundVolume"
						ref={soundSlider}
						value={settings.soundVolume}
						onChange={handleVolume}
					/>
					<Typography variant="h6" className={classes.subtitle}>
						Громкость произношения слов
					</Typography>
					<VolumeSlider
						marks={marks}
						valueLabelDisplay="auto"
						aria-label="pretto slider"
						aria-valuetext="wordVolume"
						data-name="wordVolume"
						ref={wordSlider}
						value={settings.wordVolume}
						onChange={handleVolume}
					/>
				</Paper>
			</div>
		</div>
	);
};
