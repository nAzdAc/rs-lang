import React, { useContext, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { AuthContext } from '../context/AuthContext';
import { LOCAL_STORAGE_KEY } from '../utils/storageKey';
import { INIT_CONSTS } from '../utils/initConsts';
import { useDispatch } from 'react-redux';
import {
  changeDifficultBtn,
  changeDeleteBtn,
  changeTranslateWordBtn,
  changeTranslateSentenceBtn,
} from '../store/settingSlice';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Paper } from '@material-ui/core';
import { useStyles, VolumeSlider, PurpleSwitch, marks } from '../styles/pagesStyles/SettingsPage.styles';

export const SettingsPage = () => {
  const classes = useStyles();
  const { avatar, uploadAvatar } = useContext(AuthContext);
  const [musicVolume, setMusicVolume] = useState(
    parseInt(localStorage.getItem(LOCAL_STORAGE_KEY.musicVolume)) ||
      INIT_CONSTS.musicVolume
  );
  const [soundVolume, setSoundVolume] = useState(
    parseInt(localStorage.getItem(LOCAL_STORAGE_KEY.soundVolume)) ||
      INIT_CONSTS.soundVolume
  );
  const [wordVolume, setWordVolume] = useState(
    parseInt(localStorage.getItem(LOCAL_STORAGE_KEY.wordVolume)) ||
      INIT_CONSTS.wordVolume
  );

  function handleMusicVolume(event, newValue) {
    setMusicVolume(newValue);
    localStorage.setItem(LOCAL_STORAGE_KEY.musicVolume, newValue);
  }
  function handleSoundVolume(event, newValue) {
    setSoundVolume(newValue);
    localStorage.setItem(LOCAL_STORAGE_KEY.soundVolume, newValue);
  }
  function handleWordVolume(event, newValue) {
    setWordVolume(newValue);
    localStorage.setItem(LOCAL_STORAGE_KEY.wordVolume, newValue);
  }

  const dispatch = useDispatch();
  const handleDifficulty = (e) => {
    dispatch(changeDifficultBtn(e.target.checked));
  };

  const handleDeleteWord = (e) => {
    dispatch(changeDeleteBtn(e.target.checked));
  };

  const handleTranslateWord = (e) => {
    dispatch(changeTranslateWordBtn(e.target.checked));
  };

  const handleTranslateSentence = (e) => {
    dispatch(changeTranslateSentenceBtn(e.target.checked));
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.content}>
        <Typography variant="h2" className={classes.title}>
          Настройки
        </Typography>
        <div className={classes.contentCards}>
          <Paper className={classes.card}>
            <Typography variant="h4" className={classes.subtitle}>
              Отображение кнопок
            </Typography>
            <div className={classes.buttonsWrapper}>
              <Typography variant="subtitle1">Сложное слово</Typography>
              <PurpleSwitch
                onChange={handleDifficulty}
                checked={useSelector(
                  (state) => state.settings.DifficultWordBtn
                )}
              />
            </div>
            <div className={classes.buttonsWrapper}>
              <Typography variant="subtitle1">Удалить слово</Typography>
              <PurpleSwitch
                onChange={handleDeleteWord}
                checked={useSelector((state) => state.settings.DeleteWordBtn)}
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
                onChange={handleTranslateWord}
                checked={useSelector(
                  (state) => state.settings.TranslateWordBtn
                )}
              />
            </div>
            <div className={classes.buttonsWrapper} style={{ width: '250px' }}>
              <Typography variant="subtitle1">Перевод предложений</Typography>
              <PurpleSwitch
                onChange={handleTranslateSentence}
                checked={useSelector(
                  (state) => state.settings.TranslateSentenceBtn
                )}
              />
            </div>
          </Paper>
          <ToastContainer />
          <Paper className={classes.card}>
            <Typography variant="h4" className={classes.subtitle}>
              Аватар
            </Typography>
            <img alt="avatar" className={classes.avatarImage} src={avatar} />
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
              value={musicVolume}
              onChange={handleMusicVolume}
            />
            <Typography variant="h6" className={classes.subtitle}>
              Громкость звуков
            </Typography>
            <VolumeSlider
              marks={marks}
              valueLabelDisplay="auto"
              aria-label="pretto slider"
              value={soundVolume}
              onChange={handleSoundVolume}
            />
            <Typography variant="h6" className={classes.subtitle}>
              Громкость произношения слов
            </Typography>
            <VolumeSlider
              marks={marks}
              valueLabelDisplay="auto"
              aria-label="pretto slider"
              value={wordVolume}
              onChange={handleWordVolume}
            />
          </Paper>
        </div>
      </div>
    </div>
  );
};
