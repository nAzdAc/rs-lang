import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Visibility from '@material-ui/icons/Visibility';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { backRoutes } from '../utils/backRoutes';
import { useMessage } from '../hooks/message.hook';
import { CssTextField, useStyles } from '../styles/pagesStyles/StatsGamesSettings.styles';
import { useSelector } from 'react-redux';
import { Container } from '@material-ui/core';
import { useInput } from '../hooks/input.hook';

export const SignUpPage = () => {
	const { theme } = useSelector((state) => state.settings);
	const classes = useStyles({ theme });
	const showMessage = useMessage();
	const email = useInput('', { isEmpty: true });
	const password = useInput('', { isEmpty: false, minLength: 6 });
	const { token } = useSelector((state) => state.userData);
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

	const handleSubmit = useCallback(
		async (e) => {
			e.preventDefault();
			try {
				const res = await fetch(backRoutes.signUp, {
					method: 'POST',
					withCredentials: true,
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`
					},
					body: JSON.stringify({ ...form })
				});
				console.log(res);
				const json = await res.json();
				console.log(json);
				showMessage(json.message, res.status || 200);
				setForm({
					name: '',
					email: '',
					password: ''
				});
				setValues({ password: '', showPassword: false });
			} catch (e) {
				console.log(e);
				console.log(e.message);
				return showMessage('Возникла проблема с регистрацией. Попробуйте позже', 404);
			}
		},
		[ form, showMessage, token ]
	);

	return (
		<Container className={classes.root}>
			<div className={classes.formCard}>
				<h2 className={classes.title}>Регистрация</h2>
				<form className={classes.form} noValidate onSubmit={handleSubmit}>
					<CssTextField
						variant="outlined"
						id="email"
						label="Электропочта"
						name="email"
						autoFocus
						value={email.value}
						onChange={email.onChange}
						onBlur={email.onBlur}
					/>
					{/* {email.isDirty && email.isEmpty ? (
						<span style={{ color: 'red' }} className={classes.info}>
							Поле не может быть пустым
						</span>
					) : (
					)} */}
					<span className={classes.info}>Используйте настоящую</span>
					<FormControl className={classes.field} value={form.password} onChange={handleFormChange} variant="outlined">
						<InputLabel htmlFor="outlined-adornment-password">Пароль</InputLabel>
						<OutlinedInput
							name="password"
							id="outlined-adornment-password"
							type={values.showPassword ? 'text' : 'password'}
							value={password.value}
							onChange={password.onChange}
							onBlur={password.onBlur}
							endAdornment={
								<InputAdornment position="end">
									<IconButton
										className={classes.passwordIcon}
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
					<span className={classes.info}>От 4 до 12 символов</span>
					<CssTextField
						variant="outlined"
						name="name"
						label="Имя"
						type="text"
						id="name"
						value={form.name}
						onChange={handleFormChange}
					/>
					<span className={classes.info}>Не более 15 символов</span>
					<Box className={classes.buttonBox}>
						<button style={{ width: '130px' }} type="submit" className={classes.button}>
							Выполнить
						</button>
						<Link className={classes.link} to={'/signIn'}>
							<button className={classes.outlainedButton}>Вход</button>
						</Link>
					</Box>
				</form>
			</div>
		</Container>
	);
};
