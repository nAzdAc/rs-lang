import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Visibility from '@material-ui/icons/Visibility';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { useHttp } from '../hooks/http.hook';
import { backRoutes } from '../utils/backRoutes';
import { useMessage } from '../hooks/message.hook';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useStyles } from '../styles/pagesStyles/StatsGamesSettings.styles';

export const SignUpPage = () => {
	const message = useMessage();
	const { request, error, clearError } = useHttp();
	const classes = useStyles();
	const [ form, setForm ] = useState({
		name: '',
		email: '',
		password: ''
	});

	const [ values, setValues ] = useState({
		password: '',
		showPassword: false
	});
	const handleClickShowPassword = () => {
		setValues({ ...values, showPassword: !values.showPassword });
	};
	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};
	const handleChange = (prop) => (event) => {
		setValues({ ...values, [prop]: event.target.value });
	};

	const handleFormChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	useEffect(
		() => {
			message(error);
			clearError();
		},
		[ error, message, clearError ]
	);

	async function handleSubmit(e) {
		e.preventDefault();
		try {
			const data = await request(backRoutes.signUp, 'POST', { ...form });
			message(data.message, 200);
			setForm({
				name: '',
				email: '',
				password: ''
			});
			setValues({ password: '', showPassword: false });
		} catch (e) {}
	}

	return (
		<div className={classes.root}>
			<div className={classes.formCard}>
				<Typography component="h1" variant="h2" align="left" className={classes.title}>
					Регистрация
				</Typography>
				<form className={classes.form} noValidate onSubmit={handleSubmit}>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="name"
						label="Имя"
						type="text"
						id="name"
						autoComplete="name"
						value={form.name}
						onChange={handleFormChange}
						className={classes.field}
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="email"
						label="Электропочта"
						name="email"
						autoComplete="email"
						autoFocus
						value={form.email}
						onChange={handleFormChange}
						className={classes.field}
						style={{ marginTop: '30px' }}
					/>
					<Typography component="h1" variant="subtitle2" align="left" className={classes.info}>
						Используйте настоящую
					</Typography>
					<FormControl className={classes.field} value={form.password} onChange={handleFormChange} variant="outlined">
						<InputLabel htmlFor="outlined-adornment-password">Пароль</InputLabel>
						<OutlinedInput
							name="password"
							id="outlined-adornment-password"
							type={values.showPassword ? 'text' : 'password'}
							value={values.password}
							onChange={handleChange('password')}
							endAdornment={
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle password visibility"
										onClick={handleClickShowPassword}
										onMouseDown={handleMouseDownPassword}
										edge="end"
									>
										{values.showPassword ? <Visibility /> : <VisibilityOff />}
									</IconButton>
								</InputAdornment>
							}
							labelWidth={70}
						/>
					</FormControl>
					<ToastContainer />
					<Typography component="h1" variant="subtitle2" align="left" className={classes.info}>
						Хотя бы 6 символов
					</Typography>
					<Box className={classes.buttonBox}>
						<Button type="submit" variant="contained" className={classes.button}>
							Выполнить
						</Button>
						<Button className={classes.register}>
							<Link className={classes.link} to={'/signIn'}>
								Вход
							</Link>
						</Button>
					</Box>
				</form>
			</div>
		</div>
	);
};
