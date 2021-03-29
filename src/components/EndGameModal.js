import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Typography } from '@material-ui/core';
import { showTitle } from '../utils/showTitle';
import winSong from '../sounds/win.mp3';
import defeatSong from '../sounds/defeat.mp3';
import { LOCAL_STORAGE_KEY } from '../utils/storageKey';
import { INIT_CONSTS } from '../utils/initConsts';
import { Howl } from 'howler';

const useStyles = makeStyles((theme) => ({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},
	paper: {
		margin: '0 auto',
		width: '75%',
		maxWidth: '500px',
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3)
	}
}));

export default function TransitionsModal({ correct, fail }) {
	const classes = useStyles();
	const volume = localStorage.getItem(LOCAL_STORAGE_KEY.volume) || INIT_CONSTS.volume;
	const [ open, setOpen ] = useState(true);
	const [ title, setTitle ] = useState('');

	const defeatSound = new Howl({
		src: [ defeatSong ],
		volume: 0.01 * volume,
		onend: function() {
			console.log('Finished!');
		}
	});
	const winSound = new Howl({
		src: [ winSong ],
		volume: 0.01 * volume,
		onend: function() {
			console.log('Finished!');
		}
	});

	const handleClose = () => {
		setOpen(false);
		winSound.stop();
		defeatSound.stop();
	};

	useEffect(
		() => {
			if (fail < 6) {
				winSound.play();
				// playWin();
			} else {
				defeatSound.play();
				// playDefeat();
			}
			setTitle(showTitle(fail));
			return () => {
				winSound.stop();
				defeatSound.stop();
			};
		},
		[ fail ]
	);

	return (
		<div>
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				className={classes.modal}
				open={open}
				onClose={handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500
				}}
			>
				<Fade in={open}>
					<div className={classes.paper}>
						<Typography variant="h3" id="transition-modal-title">
							{title}
						</Typography>
						<Typography variant="h4" id="transition-modal-title">{`Верных ответов: ${correct}`}</Typography>
						<Typography color="secondary" variant="h4" id="transition-modal-title">{`Ошибок: ${fail}`}</Typography>
						{/* <p id="transition-modal-description">react-transition-group animates me.</p> */}
					</div>
				</Fade>
			</Modal>
		</div>
	);
}
