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
import { useDispatch, useSelector } from 'react-redux';
import { Container } from '@material-ui/core';
import { useInput } from '../hooks/input.hook';
import { frontRoutes } from '../utils/frontRoutes';
import { isBlock } from '../redux/actions';

export const SignUpPage = () => {
	const dispatch = useDispatch();
	const { theme } = useSelector((state) => state.settings);
	const classes = useStyles({ theme });
	const showMessage = useMessage();
	const email = useInput('', { emailIsEmail: true });
	const password = useInput('', { passwordIsPassword: true });
	const name = useInput('', { nameIsName: true });
	const { token } = useSelector((state) => state.userData);

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

	const handleSubmit = useCallback(
		async (e) => {
			e.preventDefault();
			if (!name.isDirty || !password.isDirty) {
				return showMessage('Необходимо заполнить все поля');
			}
			if (name.nameErrorText || password.passwordErrorText || email.emailErrorText) {
				return showMessage('Некорректно введены данные :(');
			}
			dispatch(isBlock(true));
			try {
				const res = await fetch(backRoutes.signUp, {
					method: 'POST',
					withCredentials: true,
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`
					},
					body: JSON.stringify({ email: email.value, password: password.value, name: name.value })
				});
				console.log(res);
				const json = await res.json();
				console.log(json);
				showMessage(json.message, res.status || 200);
				name.setValue('');
				email.setValue('');
				password.setValue('');
				name.setDirty(false);
				email.setDirty(false);
				password.setDirty(false);
				setValues({ password: '', showPassword: false });
				dispatch(isBlock(false));
			} catch (e) {
				console.log(e);
				console.log(e.message);
				dispatch(isBlock(false));
				return showMessage('Возникла проблема с регистрацией. Попробуйте позже', 404);
			}
		},
		[ dispatch, email, name, password, showMessage, token ]
	);

	return (
		<Container className={classes.root}>
			<div className={classes.formCard}>
				<h2 className={classes.title}>Регистрация</h2>
				<form className={classes.form} noValidate onSubmit={handleSubmit}>
					<CssTextField
						variant="outlined"
						id="email"
						label="Email"
						name="email"
						autoFocus
						value={email.value}
						onChange={email.onChange}
						onBlur={email.onBlur}
					/>
					{email.isDirty && email.emailErrorText ? (
						<span style={{ color: 'red', fontWeight: 'bold' }} className={classes.info}>
							{email.emailErrorText}
						</span>
					) : (
						<span className={classes.info}>Используйте настоящую, чтобы мы могли отправить вам письмо</span>
					)}
					<FormControl className={classes.field} value={password.value} variant="outlined">
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
					{password.isDirty && password.passwordErrorText ? (
						<span style={{ color: 'red', fontWeight: 'bold' }} className={classes.info}>
							{password.passwordErrorText}
						</span>
					) : (
						<span className={classes.info}>От 4 до 12 символов</span>
					)}
					<CssTextField
						variant="outlined"
						name="name"
						label="Имя"
						type="text"
						id="name"
						value={name.value}
						onChange={name.onChange}
						onBlur={name.onBlur}
					/>
					{name.isDirty && name.nameErrorText ? (
						<span style={{ color: 'red', fontWeight: 'bold' }} className={classes.info}>
							{name.nameErrorText}
						</span>
					) : (
						<span className={classes.info}>От 1 до 15 символов</span>
					)}
					<Box className={classes.buttonBox}>
						<button style={{ width: '130px' }} type="submit" className={classes.button}>
							Выполнить
						</button>
						<Link className={classes.link} to={frontRoutes.signIn}>
							<button className={classes.outlainedButton}>Вход</button>
						</Link>
					</Box>
				</form>
			</div>
		</Container>
	);
};
