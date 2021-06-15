import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
	useStyles,
	SettingsSlider,
	marks,
	CssTextField,
	SettingsSwitch
} from '../styles/pagesStyles/StatsGamesSettings.styles';
import { setSettings, uploadAvatar, postName, postSettings } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useMessage } from '../hooks/message.hook';
import { Container } from '@material-ui/core';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import Brightness3Icon from '@material-ui/icons/Brightness3';
import { useInput } from '../hooks/input.hook';
import { backRoutes } from '../utils/backRoutes';

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
	const classes = useStyles({ theme });
	const { token, avatarURL, userEmail } = useSelector((state) => state.userData);
	const showMessage = useMessage();
	const soundSlider = useRef();
	const musicSlider = useRef();
	const wordSlider = useRef();
	const [ newName, setNewName ] = useState('');
	const email = useInput(`${userEmail || ''}`, { emailIsEmail: true });
	const message = useInput('', { messageIsMessage: true });
	const previewRef = useRef();
	const screenshotRef = useRef();

	useEffect(
		() => {
			[ musicSlider.current, soundSlider.current, wordSlider.current ].forEach((elem) => {
				elem.addEventListener('mouseup', async (event) => {
					if (!event.target.ariaValueText || event.target.ariaValueNow === null) {
						return showMessage('Этот ползунок часто заедает! Попробуйте аккуратно его перетянуть :)');
					}
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
		if (!event.target.ariaValueText || newValue === null) {
			return;
		}
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
		if (![ 'image/jpeg', 'image/png', 'image/gif' ].includes(event.target.files[0].type)) {
			return showMessage('Разрешены только изображения', 404);
		}
		if (event.target.files[0].size > 2 * 1024 * 1024) {
			return showMessage('Аватарка должна быть менее 2МБ', 404);
		}
		const { text, code } = await dispatch(uploadAvatar(event.target.files[0], token));
		showMessage(text, code);
	};

	const changeScreenshot = async (event) => {
		console.log(event.target.files[0]);
		if (![ 'image/jpeg', 'image/png', 'image/gif' ].includes(event.target.files[0].type)) {
			return showMessage('Разрешены только изображения', 404);
		}
		if (event.target.files[0].size > 2 * 1024 * 1024) {
			return showMessage('Аватарка должна быть менее 2МБ', 404);
		}

		const reader = new FileReader();
		reader.onload = function(e) {
			previewRef.current.innerHTML = `<img src="${e.target.result}" alt="СКРИНШОТ">`;
		};
		reader.onerror = function() {
			showMessage('Произошла какая-то ошибка с добавлением скриншота', 404);
		};
		reader.readAsDataURL(event.target.files[0]);
	};

	const handleName = (event) => {
		setNewName(event.target.value);
	};

	const sendMessage = async (event) => {
		event.preventDefault();
		if ((!email.isDirty && !email.value) || !message.isDirty) {
			return showMessage('Поля электронной почты и сообщения обязательны для заполнения');
		}
		if (email.emailErrorText || message.messageErrorText) {
			return showMessage('Некорректно введены данные :(');
		}
		const formData = new FormData(event.target);
		formData.append('image', screenshotRef.current.files[0]);
		try {
			const res = await fetch(backRoutes.postFeedback, {
				method: 'POST',
				body: formData
			});
			const json = await res.json();
			showMessage(json.message, res.status);
		} catch (e) {
			console.log(e);
			console.log(e.message);
			showMessage('Возникла какая-то ошибка с отправлением вашей обратной связи. Попробуйте позже :)', 404);
		}
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
				<div className={classes.card}>
					<div className={classes.cardItem}>
						<h4 className={classes.subtitle1}>Отображение кнопок</h4>
						<div className={classes.buttonsWrapper}>
							<h6 className={classes.subtitle2}>Сложное слово</h6>
							<SettingsSwitch
								aria-valuetext="difficultWord"
								name="difficultWord"
								data-name="difficultWord"
								onChange={handleSwitch}
								checked={difficultWord}
								theme={theme}
							/>
						</div>
						<div className={classes.buttonsWrapper}>
							<h6 className={classes.subtitle2}>Удалить слово</h6>
							<SettingsSwitch
								aria-valuetext="deleteWord"
								name="deleteWord"
								data-name="deleteWord"
								onChange={handleSwitch}
								checked={deleteWord}
								theme={theme}
							/>
						</div>
						<h4 className={classes.subtitle1}>Отображение перевода</h4>
						<div className={classes.buttonsWrapper} style={{ width: '250px' }}>
							<h6 className={classes.subtitle2}>Перевод слов</h6>
							<SettingsSwitch
								aria-valuetext="translateWord"
								name="translateWord"
								data-name="translateWord"
								onChange={handleSwitch}
								checked={translateWord}
								theme={theme}
							/>
						</div>
						<div className={classes.buttonsWrapper} style={{ width: '250px' }}>
							<h6 className={classes.subtitle2}>Перевод предложений</h6>
							<SettingsSwitch
								aria-valuetext="translateSentences"
								name="translateSentences"
								data-name="translateSentences"
								onChange={handleSwitch}
								checked={translateSentences}
								theme={theme}
							/>
						</div>
					</div>
				</div>
				<div className={classes.card}>
					<div className={classes.cardItem}>
						<h6 className={classes.subtitle1}>Громкость музыки</h6>
						<SettingsSlider
							marks={marks}
							valueLabelDisplay="auto"
							aria-valuetext="musicVolume"
							data-name="musicVolume"
							ref={musicSlider}
							value={musicVolume}
							onChange={handleVolume}
							theme={theme}
						/>
						<h6 className={classes.subtitle1}>Громкость звуков</h6>
						<SettingsSlider
							marks={marks}
							valueLabelDisplay="auto"
							aria-valuetext="soundVolume"
							data-name="soundVolume"
							ref={soundSlider}
							value={soundVolume}
							onChange={handleVolume}
							theme={theme}
						/>
						<h6 className={classes.subtitle1}>Громкость произношения слов</h6>
						<SettingsSlider
							marks={marks}
							valueLabelDisplay="auto"
							aria-valuetext="wordVolume"
							data-name="wordVolume"
							ref={wordSlider}
							value={wordVolume}
							onChange={handleVolume}
							theme={theme}
						/>
					</div>
				</div>
				<div className={classes.card}>
					<div className={classes.cardItem}>
						<img
							alt="avatar"
							className={classes.avatarImage}
							src={
								avatarURL ||
								'http://res.cloudinary.com/nazdac/image/upload/v1616652013/travelAppFolder/dmlfcuvyr79gpkbgg639.jpg'
							}
						/>
						<label htmlFor="avatarFile" className={classes.button}>
							+ ИЗМЕНИТЬ АВАТАР
						</label>
						<input
							style={{ display: 'none' }}
							type="file"
							id="avatarFile"
							accept=".jpg, .png, .gif"
							onChange={changeAvatar}
						/>
						<form style={{ marginTop: '20px' }} className={classes.form} onSubmit={changeName}>
							<CssTextField
								className={classes.nameField}
								label="Введите Никнейм"
								variant="outlined"
								id="outlined-input"
								value={newName}
								onChange={handleName}
							/>
							<button style={{ margin: '20px 0px' }} type="submit" className={classes.button}>
								+ ИЗМЕНИТЬ НИКНЕЙМ
							</button>
						</form>
						<button value={theme} onClick={handleTheme} className={classes.button}>
							{theme === 'dark' ? <Brightness3Icon /> : <WbSunnyIcon />}
							+ ИЗМЕНИТЬ ТЕМУ
						</button>
					</div>
				</div>

				<div className={classes.card}>
					<div className={classes.cardItem}>
						<form id="messageForm" style={{ marginTop: '20px' }} className={classes.form} onSubmit={sendMessage}>
							<CssTextField
								className={classes.nameField}
								label="Электронная почта"
								variant="outlined"
								id="message-email"
								value={email.value}
								onChange={email.onChange}
								onBlur={email.onBlur}
								name="mail"
							/>
							{email.isDirty && email.emailErrorText ? (
								<span style={{ color: 'red', fontWeight: 'bold' }} className={classes.info}>
									{email.emailErrorText}
								</span>
							) : (
								<span className={classes.info}>Адрес, на который мы обязательно вам ответим</span>
							)}
							<textarea
								className={classes.messageArea}
								value={message.value}
								onChange={message.onChange}
								onBlur={message.onBlur}
								id="message-area"
								name="message"
								placeholder="Здесь вы может оставить отзыв или сообщить об ошибке"
							/>
							{message.isDirty &&
							message.messageErrorText && (
								<span style={{ color: 'red', fontWeight: 'bold' }} className={classes.info}>
									{message.messageErrorText}
								</span>
							)}
							<label style={{ margin: '20px 0px' }} htmlFor="screenshotFile" className={classes.button}>
								+ ПРИКРЕПИТЬ ФОТО
							</label>
							<input
								name="image"
								ref={screenshotRef}
								style={{ display: 'none' }}
								type="file"
								id="screenshotFile"
								accept=".jpg, .png, .gif"
								onChange={changeScreenshot}
							/>
							<div style={{ margin: '0 auto' }} ref={previewRef} className={classes.preview} />
							<button style={{ marginTop: '20px' }} type="submit" className={classes.button}>
								+ ОТПРАВИТЬ СООБЩЕНИЕ
							</button>
						</form>
					</div>
				</div>
			</div>
		</Container>
	);
};
