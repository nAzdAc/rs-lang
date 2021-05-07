import Switch from '@material-ui/core/Switch';
import Slider from '@material-ui/core/Slider';
import { makeStyles, withStyles } from '@material-ui/core/styles';


export const useStyles = makeStyles({
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

export const PurpleSwitch = withStyles({
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

export const marks = [
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

export const VolumeSlider = withStyles({
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