import React, { useContext, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import Slider from '@material-ui/core/Slider';
import { makeStyles, withStyles } from '@material-ui/core/styles';
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
import illustration from '../assets/images/settings.png';
import { Paper } from '@material-ui/core';

const useStyles = makeStyles({
  wrapper: {
    display: 'flex',
    gap: '1rem',
    maxWidth: '1440px',
    margin: '0 auto',
  },
  content: {
    width: '60%',
    paddingTop: '80px',
    paddingLeft: '120px',
    '@media (max-width: 960px)': {
      width: '100%',
      paddingTop: '40px',
      paddingBottom: '80px',
    },
  },

  contentCards: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
  },
  card: {
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 40,
    paddingBottom: 60,
    width: 240,
  },

  illustration: {
    width: '40%',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'end',
    paddingBottom: '40px',
    overflow: 'hidden',
    '@media (max-width: 1164px)': {
      display: 'none',
    },
  },
  title: {
    marginBottom: '40px',
  },

  buttonsWrapper: {
    width: '200px',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '10px',
  },

  subtitle: {
    marginBottom: '20px',
  },

  avatarImage: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    margin: '10px',
  },
  upload: {
    width: '134px',
    height: '36px',
    background: '#6200EE',
    color: '#FFFFFF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: '6px',
    cursor: 'pointer',
    marginTop: 20,
  },
});

const PurpleSwitch = withStyles({
  switchBase: {
    color: '#DBB2FF',
    '&$checked': {
      color: '#5600E8',
    },
    '&$checked  + $track': {
      backgroundColor: '#5600E8',
    },
  },
  checked: {},
  track: {},
})(Switch);

const marks = [
  {
    value: 0,
    label: '0',
  },
  {
    value: 25,
    label: '25',
  },
  {
    value: 50,
    label: '50',
  },
  {
    value: 75,
    label: '75',
  },
  {
    value: 100,
    label: '100',
  },
];

const VolumeSlider = withStyles({
  root: {
    width: '200px',
    color: '#5600E8',
    height: '8px',
  },
  thumb: {
    height: '24px',
    width: '24px',
    marginTop: '-8px',
    marginLeft: '-12px',
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 8px)',
  },
  track: {
    height: '8px',
  },
  rail: {
    height: '8px',
  },
  mark: {
    backgroundColor: '#bfbfbf',
    height: 12,
    width: 1,
  },
  markActive: {
    opacity: 1,
    backgroundColor: 'currentColor',
  },
})(Slider);

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
      <div className={classes.illustration}>
        <img src={illustration} alt="a man looking at chart" />
      </div>
    </div>
  );
};
