import React, { useState } from 'react';
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
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CssTextField, useStyles } from '../styles/pagesStyles/StatsGamesSettings.styles';
import { useSelector } from 'react-redux';
import { Container } from '@material-ui/core';

export const SignUpPage = () => {
	const message = useMessage();
	const { token } = useSelector((state) => state.userData);
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

	async function handleSubmit(e) {
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
			const json = await res.json();
			console.log(json);
			message(json.message, 200);
			setForm({
				name: '',
				email: '',
				password: ''
			});
			setValues({ password: '', showPassword: false });
		} catch (e) {}
	}

	return (
		<Container className={classes.root}>
			<div className={classes.formCard}>
				<h2 className={classes.title}>Регистрация</h2>
				<form className={classes.form} noValidate onSubmit={handleSubmit}>
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
					<CssTextField
						variant="outlined"
						id="email"
						label="Электропочта"
						name="email"
						autoFocus
						value={form.email}
						onChange={handleFormChange}
					/>
					<span className={classes.info}>Используйте настоящую</span>
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
					<ToastContainer />
					<span className={classes.info}>От 4 до 15 символов</span>
					<Box className={classes.buttonBox}>
						<button type="submit" className={`${classes.purpleButton} ${classes.containedButton}`}>
							Выполнить
						</button>
						<button className={`${classes.purpleButton} ${classes.outlainedButton}`}>
							<Link className={classes.link} to={'/signIn'}>
								Вход
							</Link>
						</button>
					</Box>
				</form>
			</div>
		</Container>
	);
};
