import React, { useContext, useEffect, useRef } from 'react';
import Typography from '@material-ui/core/Typography';
import { AuthContext } from '../context/AuthContext';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Paper } from '@material-ui/core';
import { useStyles, VolumeSlider, PurpleSwitch, marks } from '../styles/pagesStyles/StatsGamesSettings.styles';
import { store } from '../redux/store';
import { asyncVolume, changeSwitch, musicVolume } from '../redux/actions';

export const SettingsPage = () => {
	const classes = useStyles();
	const { avatarURL, uploadAvatar, settings, setSettings } = useContext(AuthContext);
	const soundRef = useRef();
	const musicRef = useRef();
	const wordRef = useRef();

	useEffect(() => {
		musicRef.current.addEventListener('mouseup', (event) => {
			console.log(musicRef.current.dataset.name);
		});
		wordRef.current.addEventListener('mouseup', (event) => {
			console.log(wordRef.current.dataset.name);
		});
	}, []);

	// store.subscribe(() => {
	// 	const state = store.getState();
	// 	musicRef.current.value = state.musicVolume;
	// 	soundRef.current.value = state.soundVolume;
	// });

	useEffect(() => {
		store.subscribe(() => {
			const state = store.getState();
			musicRef.current.value = state.volume.MUSIC_VOLUME;
			wordRef.current.value = state.volume.WORD_VOLUME;
		});
		store.dispatch({ type: 'INIT_APP' });
	}, []);

	function handleMusicVolume(event, newValue) {
		console.log('event', event.target.name)
		store.dispatch(musicVolume(newValue));
	}

	function handleSoundVolume(event, newValue) {
		setSettings((prev) => (prev = { ...prev, soundVolume: newValue }));
	}
	function handleWordVolume(event, newValue) {
		store.dispatch(asyncVolume(newValue));
	}

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
							checked={true}
						/>
					</div>
					<div className={classes.buttonsWrapper}>
						<Typography variant="subtitle1">Удалить слово</Typography>
						<PurpleSwitch checked={true} />
					</div>
				</Paper>

				<Paper className={classes.card}>
					<Typography variant="h4" className={classes.subtitle}>
						Отображение перевода
					</Typography>
					<div className={classes.buttonsWrapper} style={{ width: '250px' }}>
						<Typography variant="subtitle1">Перевод слов</Typography>
						<PurpleSwitch
							
							checked={true}
						/>
					</div>
					<div className={classes.buttonsWrapper} style={{ width: '250px' }}>
						<Typography variant="subtitle1">Перевод предложений</Typography>
						<PurpleSwitch
							checked={true}
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
					<input
						style={{ display: 'none' }}
						type="file"
						id="file"
						accept="image/*"
						onChange={(event) => uploadAvatar(event.target.files[0])}
					/>
				</Paper>
				<Paper className={classes.card}>
					<Typography variant="h6" className={classes.subtitle}>
						Громкость музыки
					</Typography>
					<VolumeSlider
						marks={marks}
						valueLabelDisplay="auto"
						aria-label="pretto slider"
						ref={musicRef}
						onChange={handleMusicVolume}
						data-name="musicVolume"
						name='music'
					/>
					<Typography variant="h6" className={classes.subtitle}>
						Громкость звуков
					</Typography>
					<VolumeSlider
						marks={marks}
						valueLabelDisplay="auto"
						aria-label="pretto slider"
						ref={soundRef}
						onChange={handleSoundVolume}
						data-name="soundVolume"
					/>
					<Typography variant="h6" className={classes.subtitle}>
						Громкость произношения слов
					</Typography>
					<VolumeSlider
						marks={marks}
						valueLabelDisplay="auto"
						aria-label="pretto slider"
						ref={wordRef}
						data-name="wordVolume"
						onChange={handleWordVolume}
					/>
				</Paper>
			</div>
		</div>
	);
};
