import React, { useContext, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import Slider from '@material-ui/core/Slider';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { AuthContext } from '../context/AuthContext';
import { LOCAL_STORAGE_KEY } from '../utils/storageKey';
import { INIT_CONSTS } from '../utils/initConsts';

const useStyles = makeStyles({
	root: {
		padding: '20px 0px 80px 30px',
		display: 'flex',
		flexDirection: 'column',
		flexWrap: 'wrap'
	},
	content: {
		display: 'flex',
		flexWrap: 'wrap'
	},
	buttonsContainer: {
		width: '390px',
		height: '208px',
		display: 'flex',
		flexDirection: 'column',
		padding: '20px 0px 0px 20px',
		border: '2px solid #000',
		marginBottom: '40px',
		marginRight: '30px',

		'&:hover': {
			transform: 'translateY(-5px)',
			boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)'
		}
	},
	buttonsWrapper: {
		width: '210px',
		display: 'flex',
		flexWrap: 'wrap',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: '10px'
	},
	title: {
		marginBottom: '40px'
	},
	subtitle: {
		marginBottom: '20px'
	},
	avatarContainer: {
		width: '234px',
		height: '212px',
		border: '2px solid #000',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'space-evenly',
		padding: '10px 0px',
		marginRight: '30px',
		marginBottom: '60px',

		'&:hover': {
			transform: 'translateY(-5px)',
			boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)'
		}
	},
	avatarImage: {
		width: '100px',
		height: '100px',
		borderRadius: '50%',
		margin: '10px'
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
		cursor: 'pointer'
	},
	volumeContainer: {
		width: '294px',
		height: '188px',
		border: '2px solid #000',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'space-evenly',
		marginLeft: '60px',

		'&:hover': {
			transform: 'translateY(-5px)',
			boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)'
		}
	}
});

const PurpleSwitch = withStyles({
	switchBase: {
		color: '#DBB2FF',
		'&$checked': {
			color: '#5600E8'
		},
		'&$checked  + $track': {
			backgroundColor: '#5600E8'
		}
	},
	checked: {},
	track: {}
})(Switch);

const marks = [
	{
		value: 0,
		label: '0'
	},
	{
		value: 25,
		label: '25'
	},
	{
		value: 50,
		label: '50'
	},
	{
		value: 75,
		label: '75'
	},
	{
		value: 100,
		label: '100'
	}
];

const VolumeSlider = withStyles({
	root: {
		width: '200px',
		color: '#5600E8',
		height: '8px'
	},
	thumb: {
		height: '24px',
		width: '24px',
		marginTop: '-8px',
		marginLeft: '-12px'
	},
	active: {},
	valueLabel: {
		left: 'calc(-50% + 8px)'
	},
	track: {
		height: '8px'
	},
	rail: {
		height: '8px'
	},
	mark: {
		backgroundColor: '#bfbfbf',
		height: 12,
		width: 1
	},
	markActive: {
		opacity: 1,
		backgroundColor: 'currentColor'
	}
})(Slider);

export const SettingsPage = () => {
	const classes = useStyles();
	const { avatar, uploadAvatar } = useContext(AuthContext);
	const [ volume, setVolume ] = useState(
		parseInt(localStorage.getItem(LOCAL_STORAGE_KEY.volume)) || INIT_CONSTS.volume
	);

	function handleVolume(event, newValue) {
		console.log(newValue);
		setVolume(newValue);
		localStorage.setItem(LOCAL_STORAGE_KEY.volume, newValue);
	}

	return (
		<div className={classes.root}>
			<Typography variant="h2" className={classes.title}>
				Настройки
			</Typography>
			<div className={classes.content}>
				<div className={classes.buttonsContainer}>
					<Typography variant="h4" className={classes.subtitle}>
						Отображение кнопок
					</Typography>
					<div className={classes.buttonsWrapper}>
						<Typography variant="subtitle1">Сложное слово</Typography>
						<PurpleSwitch />
					</div>
					<div className={classes.buttonsWrapper}>
						<Typography variant="subtitle1">Удалить слово</Typography>
						<PurpleSwitch />
					</div>
				</div>

				<div className={classes.buttonsContainer}>
					<Typography variant="h4" className={classes.subtitle}>
						Отображение перевода
					</Typography>
					<div className={classes.buttonsWrapper} style={{ width: '250px' }}>
						<Typography variant="subtitle1">Перевод слов</Typography>
						<PurpleSwitch />
					</div>
					<div className={classes.buttonsWrapper} style={{ width: '250px' }}>
						<Typography variant="subtitle1">Перевод предложений</Typography>
						<PurpleSwitch />
					</div>
				</div>

				<div className={classes.avatarContainer}>
					<Typography variant="h4" className={classes.subtitle}>
						Аватар
					</Typography>
					<img
						alt="avatar"
						className={classes.avatarImage}
						src={
							avatar ||
							'http://res.cloudinary.com/nazdac/image/upload/v1616652013/travelAppFolder/dmlfcuvyr79gpkbgg639.jpg'
						}
					/>
					<label htmlFor="file" className={classes.upload}>
						+ ИЗМЕНИТЬ
					</label>
					<input
						style={{ display: 'none' }}
						type="file"
						accept="image/*"
						onChange={(event) => uploadAvatar(event.target.files[0])}
					/>
				</div>

				<div className={classes.volumeContainer}>
					<Typography variant="h4" className={classes.subtitle} style={{ marginBottom: '40px' }}>
						Громкость
					</Typography>
					<VolumeSlider
						marks={marks}
						valueLabelDisplay="auto"
						aria-label="pretto slider"
						value={volume}
						onChange={handleVolume}
					/>
				</div>
			</div>
		</div>
	);
};
