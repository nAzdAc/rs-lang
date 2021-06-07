import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
	useStyles,
	LightSlider,
	DarkSlider,
	LightSwitch,
	marks,
	CssTextField,
	DarkSwitch
} from '../styles/pagesStyles/StatsGamesSettings.styles';
import { setSettings, uploadAvatar, postName, postSettings } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useMessage } from '../hooks/message.hook';
import { Container, Paper } from '@material-ui/core';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import Brightness3Icon from '@material-ui/icons/Brightness3';

export const SettingsPage = () => {
	const dispatch = useDispatch();
	const {
		soundVolume,
		musicVolume,
		wordVolume,
		difficultWord,
		deleteWord,
		translateSentences,
		translateWord,
		theme
	} = useSelector((state) => state.settings);
	const { token, avatarURL } = useSelector((state) => state.userData);
	const showMessage = useMessage();
	const classes = useStyles();
	const soundSlider = useRef();
	const musicSlider = useRef();
	const wordSlider = useRef();
	const [ newName, setNewName ] = useState('');

	useEffect(
		() => {
			[ musicSlider.current, soundSlider.current, wordSlider.current ].forEach((elem) => {
				elem.addEventListener('mouseup', async (event) => {
					dispatch(setSettings(event.target.ariaValueText, event.target.ariaValueNow));
					if (!token) return showMessage('Рекомендуем авторизоваться, тогда настройки будут всегда с вами :)', 200);
					const { text, code } = await dispatch(
						postSettings(event.target.ariaValueText, event.target.ariaValueNow, token)
					);
					showMessage(text, code);
				});
			});
		},
		[ dispatch, showMessage, token ]
	);

	const handleVolume = (event, newValue) => {
		dispatch(setSettings(event.target.ariaValueText, newValue));
	};

	const handleSwitch = useCallback(
		async (event) => {
			dispatch(setSettings(event.target.name, event.target.checked));
			if (!token) return showMessage('Рекомендуем авторизоваться, тогда настройки будут всегда с вами :)', 200);
			const { text, code } = await dispatch(postSettings(event.target.name, event.target.checked, token));
			showMessage(text, code);
		},
		[ dispatch, showMessage, token ]
	);

	const changeAvatar = async (event) => {
		if (!token) {
			return showMessage('Для загрузки фото необходимо авторизоваться.', 404);
		}
		if (!event.target.files[0]) {
			return showMessage('Выберите файл', 404);
		}
		const { text, code } = await dispatch(uploadAvatar(event.target.files[0], token));
		showMessage(text, code);
	};

	const handleName = (event) => {
		setNewName(event.target.value);
	};

	const handleTheme = async (event) => {
		const newTheme = event.target.value === 'dark' ? 'light' : 'dark';
		dispatch(setSettings('theme', newTheme));
		if (!token) return showMessage('Рекомендуем авторизоваться, тогда выбранная тема будет всегда с вами :)', 200);
		const { text, code } = await dispatch(postSettings('theme', newTheme, token));
		showMessage(text, code);
	};

	const changeName = useCallback(
		async (event) => {
			event.preventDefault();
			setNewName('');
			if (!token) return showMessage('Для изменения никнейма необходимо авторизоваться', 404);
			if (!newName) return showMessage('Вы ничего не ввели. Никнейм не изменён', 404);
			const { text, code } = await dispatch(postName(newName, token));
			showMessage(text, code);
		},
		[ dispatch, newName, showMessage, token ]
	);

	return (
		<Container className={classes.root}>
			<h2 className={classes.title}>Настройки</h2>
			<div className={classes.cardsWrap}>
				<Paper className={classes.card}>
					<h4 className={classes.subtitle1}>Отображение кнопок</h4>
					<div className={classes.buttonsWrapper}>
						<h6 className={classes.subtitle2}>Сложное слово</h6>
						{theme === 'dark' ? (
							<DarkSwitch
								aria-valuetext="difficultWord"
								name="difficultWord"
								data-name="difficultWord"
								onChange={handleSwitch}
								checked={difficultWord}
							/>
						) : (
							<LightSwitch
								aria-valuetext="difficultWord"
								name="difficultWord"
								data-name="difficultWord"
								onChange={handleSwitch}
								checked={difficultWord}
							/>
						)}
					</div>
					<div className={classes.buttonsWrapper}>
						<h6 className={classes.subtitle2}>Удалить слово</h6>
						{theme === 'dark' ? (
							<DarkSwitch
								aria-valuetext="deleteWord"
								name="deleteWord"
								data-name="deleteWord"
								onChange={handleSwitch}
								checked={deleteWord}
							/>
						) : (
							<LightSwitch
								aria-valuetext="deleteWord"
								name="deleteWord"
								data-name="deleteWord"
								onChange={handleSwitch}
								checked={deleteWord}
							/>
						)}
					</div>
					<h4 className={classes.subtitle1}>Отображение перевода</h4>
					<div className={classes.buttonsWrapper} style={{ width: '250px' }}>
						<h6 className={classes.subtitle2}>Перевод слов</h6>
						{theme === 'dark' ? (
							<DarkSwitch
								aria-valuetext="translateWord"
								name="translateWord"
								data-name="translateWord"
								onChange={handleSwitch}
								checked={translateWord}
							/>
						) : (
							<LightSwitch
								aria-valuetext="translateWord"
								name="translateWord"
								data-name="translateWord"
								onChange={handleSwitch}
								checked={translateWord}
							/>
						)}
					</div>
					<div className={classes.buttonsWrapper} style={{ width: '250px' }}>
						<h6 className={classes.subtitle2}>Перевод предложений</h6>
						{theme === 'dark' ? (
							<DarkSwitch
								aria-valuetext="translateSentences"
								name="translateSentences"
								data-name="translateSentences"
								onChange={handleSwitch}
								checked={translateSentences}
							/>
						) : (
							<LightSwitch
								aria-valuetext="translateSentences"
								name="translateSentences"
								data-name="translateSentences"
								onChange={handleSwitch}
								checked={translateSentences}
							/>
						)}
					</div>
				</Paper>
				<Paper className={classes.card}>
					<h6 className={classes.subtitle1}>Громкость музыки</h6>
					{theme === 'dark' ? (
						<DarkSlider
							marks={marks}
							valueLabelDisplay="auto"
							aria-label="pretto slider"
							aria-valuetext="musicVolume"
							data-name="musicVolume"
							ref={musicSlider}
							value={musicVolume}
							onChange={handleVolume}
						/>
					) : (
						<LightSlider
							marks={marks}
							valueLabelDisplay="auto"
							aria-label="pretto slider"
							aria-valuetext="musicVolume"
							data-name="musicVolume"
							ref={musicSlider}
							value={musicVolume}
							onChange={handleVolume}
						/>
					)}
					<h6 className={classes.subtitle1}>Громкость звуков</h6>
					{theme === 'dark' ? (
						<DarkSlider
							marks={marks}
							valueLabelDisplay="auto"
							aria-label="pretto slider"
							aria-valuetext="soundVolume"
							data-name="soundVolume"
							ref={soundSlider}
							value={soundVolume}
							onChange={handleVolume}
						/>
					) : (
						<LightSlider
							marks={marks}
							valueLabelDisplay="auto"
							aria-label="pretto slider"
							aria-valuetext="soundVolume"
							data-name="soundVolume"
							ref={soundSlider}
							value={soundVolume}
							onChange={handleVolume}
						/>
					)}
					<h6 className={classes.subtitle1}>Громкость произношения слов</h6>
					{theme === 'dark' ? (
						<DarkSlider
							marks={marks}
							valueLabelDisplay="auto"
							aria-label="pretto slider"
							aria-valuetext="wordVolume"
							data-name="wordVolume"
							ref={wordSlider}
							value={wordVolume}
							onChange={handleVolume}
						/>
					) : (
						<LightSlider
							marks={marks}
							valueLabelDisplay="auto"
							aria-label="pretto slider"
							aria-valuetext="wordVolume"
							data-name="wordVolume"
							ref={wordSlider}
							value={wordVolume}
							onChange={handleVolume}
						/>
					)}
				</Paper>
				<Paper className={classes.card}>
					<img
						alt="avatar"
						className={classes.avatarImage}
						src={
							avatarURL ||
							'http://res.cloudinary.com/nazdac/image/upload/v1616652013/travelAppFolder/dmlfcuvyr79gpkbgg639.jpg'
						}
					/>
					<label htmlFor="file" className={theme === 'dark' ? classes.darkButton : classes.lightButton}>
						+ ИЗМЕНИТЬ АВАТАР
					</label>
					<input style={{ display: 'none' }} type="file" id="file" accept="image/*" onChange={changeAvatar} />
					<form onSubmit={changeName}>
						<CssTextField
							className={classes.nameField}
							label="Введите Никнейм"
							variant="outlined"
							id="outlined-input"
							value={newName}
							onChange={handleName}
						/>
						<button type="submit" className={theme === 'dark' ? classes.darkButton : classes.lightButton}>
							+ ИЗМЕНИТЬ НИКНЕЙМ
						</button>
					</form>
					<button
						value={theme}
						onClick={handleTheme}
						className={theme === 'dark' ? classes.darkButton : classes.lightButton}
					>
						{theme === 'dark' ? <Brightness3Icon /> : <WbSunnyIcon />}
						+ ИЗМЕНИТЬ ТЕМУ
					</button>
				</Paper>
			</div>
		</Container>
	);
};
