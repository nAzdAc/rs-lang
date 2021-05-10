import React, { useState, useContext, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Link, Redirect } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Visibility from '@material-ui/icons/Visibility';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import { backRoutes } from '../utils/backRoutes';
import { ToastContainer } from 'react-toastify';
import { useMessage } from '../hooks/message.hook';
import 'react-toastify/dist/ReactToastify.css';
import { useStyles } from '../styles/pagesStyles/StatsGamesSettings.styles';

export const SignInPage = () => {
	const message = useMessage();
	const { request, error, clearError } = useHttp();
	const { token, login } = useContext(AuthContext);
	const classes = useStyles();
	const [ form, setForm ] = useState({
		email: '',
		password: ''
	});
	const [ values, setValues ] = useState({
		password: '',
		showPassword: false
	});

	const isAuthenticated = !!token;

	useEffect(
		() => {
			message(error);
			clearError();
		},
		[ error, message, clearError ]
	);

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
	async function handleSubmit(e) {
		e.preventDefault();
		try {
			const data = await request(backRoutes.signIn, 'POST', { ...form });
			login(data.token, data.refreshToken, data.userId, data.name, data.avatarURL, data.settings);
			console.log(data);
			message(data.message, 200);
		} catch (e) {}
	}

	if (isAuthenticated) {
		return <Redirect to="/book" />;
	} else
		return (
			<div className={classes.root}>
				<div className={classes.formCard}>
					<Typography component="h1" variant="h2" align="left" className={classes.title}>
						Аккаунт
					</Typography>
					<form className={classes.form} noValidate onSubmit={handleSubmit}>
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
						/>
						<Typography component="h1" variant="subtitle2" align="left" className={classes.info}>
							Используйте настоящую
						</Typography>
						<FormControl
							className={classes.field}
							variant="outlined"
							value={form.password}
							onChange={handleFormChange}
						>
							<InputLabel value={form.password} htmlFor="outlined-adornment-password">
								Пароль
							</InputLabel>
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
							Минимум 6 символов
						</Typography>
						<Box className={classes.buttonBox}>
							<Button type="submit" variant="contained" size="medium" className={classes.button}>
								Войти
							</Button>
							<Button className={classes.register}>
								<Link className={classes.link} to={'/signup'}>
									Регистрация
								</Link>
							</Button>
						</Box>
					</form>
				</div>
			</div>
		);
};
