import React, { useEffect, useRef, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
	useStyles,
	VolumeSlider,
	PurpleSwitch,
	marks,
	CssTextField
} from '../styles/pagesStyles/StatsGamesSettings.styles';
import { reduxFetchSettings, reduxUpload, setName, setVolume } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useMessage } from '../hooks/message.hook';

export const SettingsPage = () => {
	const dispatch = useDispatch();
	const {
		soundVolume,
		musicVolume,
		wordVolume,
		difficultWord,
		deleteWord,
		translateSentences,
		translateWord
	} = useSelector((state) => state.settings);
	const { token, avatarURL } = useSelector((state) => state.userData);
	const message = useMessage();
	const classes = useStyles();
	const soundSlider = useRef();
	const musicSlider = useRef();
	const wordSlider = useRef();
	const [ newName, setNewName ] = useState('');

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

	const handleName = (e) => {
		setNewName(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		dispatch(setName(newName, token));
		setNewName('');
	};

	return (
		<div className={classes.root}>
			<h2 className={classes.title}>Настройки</h2>
			<div className={classes.cardsWrap}>
				<div className={classes.card}>
					<h4 className={classes.subtitle1}>Отображение кнопок</h4>
					<div className={classes.buttonsWrapper}>
						<h6 className={classes.subtitle2}>Сложное слово</h6>
						<PurpleSwitch
							aria-valuetext="difficultWord"
							name="difficultWord"
							data-name="difficultWord"
							onChange={handleSwitch}
							checked={difficultWord}
						/>
					</div>
					<div className={classes.buttonsWrapper}>
						<h6 className={classes.subtitle2}>Удалить слово</h6>
						<PurpleSwitch
							aria-valuetext="deleteWord"
							name="deleteWord"
							data-name="deleteWord"
							onChange={handleSwitch}
							checked={deleteWord}
						/>
					</div>
					<h4 className={classes.subtitle1}>Отображение перевода</h4>
					<div className={classes.buttonsWrapper} style={{ width: '250px' }}>
						<h6 className={classes.subtitle2}>Перевод слов</h6>
						<PurpleSwitch
							aria-valuetext="translateWord"
							name="translateWord"
							data-name="translateWord"
							onChange={handleSwitch}
							checked={translateWord}
						/>
					</div>
					<div className={classes.buttonsWrapper} style={{ width: '250px' }}>
						<h6 className={classes.subtitle2}>Перевод предложений</h6>
						<PurpleSwitch
							aria-valuetext="translateSentences"
							name="translateSentences"
							data-name="translateSentences"
							onChange={handleSwitch}
							checked={translateSentences}
						/>
					</div>
				</div>
				<div className={classes.card}>
					<h6 className={classes.subtitle1}>Громкость музыки</h6>
					<VolumeSlider
						marks={marks}
						valueLabelDisplay="auto"
						aria-label="pretto slider"
						aria-valuetext="musicVolume"
						data-name="musicVolume"
						ref={musicSlider}
						value={musicVolume}
						onChange={handleVolume}
					/>
					<h6 className={classes.subtitle1}>Громкость звуков</h6>
					<VolumeSlider
						marks={marks}
						valueLabelDisplay="auto"
						aria-label="pretto slider"
						aria-valuetext="soundVolume"
						data-name="soundVolume"
						ref={soundSlider}
						value={soundVolume}
						onChange={handleVolume}
					/>
					<h6 className={classes.subtitle1}>Громкость произношения слов</h6>
					<VolumeSlider
						marks={marks}
						valueLabelDisplay="auto"
						aria-label="pretto slider"
						aria-valuetext="wordVolume"
						data-name="wordVolume"
						ref={wordSlider}
						value={wordVolume}
						onChange={handleVolume}
					/>
				</div>
				<div className={classes.card}>
					<img
						alt="avatar"
						className={classes.avatarImage}
						src={
							avatarURL ||
							'http://res.cloudinary.com/nazdac/image/upload/v1616652013/travelAppFolder/dmlfcuvyr79gpkbgg639.jpg'
						}
					/>
					<label htmlFor="file" className={classes.purpleButton}>
						+ ИЗМЕНИТЬ АВАТАР
					</label>
					<input style={{ display: 'none' }} type="file" id="file" accept="image/*" onChange={handleAvatar} />
					<form onSubmit={handleSubmit}>
						<CssTextField
							className={classes.nameField}
							label="Введите Никнейм"
							variant="outlined"
							id="outlined-input"
							value={newName}
							onChange={handleName}
						/>
						<button type="submit" className={classes.purpleButton}>
							+ ИЗМЕНИТЬ НИКНЕЙМ
						</button>
					</form>
				</div>
				<ToastContainer />
			</div>
		</div>
	);
};
