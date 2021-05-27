import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Visibility from '@material-ui/icons/Visibility';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { ToastContainer } from 'react-toastify';
// import { useMessage } from '../hooks/message.hook';
import 'react-toastify/dist/ReactToastify.css';
import { CssTextField, useStyles } from '../styles/pagesStyles/StatsGamesSettings.styles';
import { useDispatch, useSelector } from 'react-redux';
import { reduxLogin } from '../redux/actions';
import { Container } from '@material-ui/core';

export const SignInPage = () => {
	const dispatch = useDispatch();
	// const message = useMessage();
	const { token } = useSelector((state) => state.userData);
	const classes = useStyles();
	const [ form, setForm ] = useState({
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
			dispatch(reduxLogin(form));
			// message(data.message, 200);
		} catch (e) {}
	}

	if (!!token) {
		return <Redirect to="/book" />;
	} else
		return (
			<Container className={classes.root}>
				<div className={classes.formCard}>
					<h2 className={classes.title}>Аккаунт</h2>
					<form className={classes.form} onSubmit={handleSubmit}>
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
						<FormControl className={classes.field} variant="outlined" value={form.password} onChange={handleFormChange}>
							<InputLabel value={form.password} htmlFor="outlined-adornment-password">
								Пароль
							</InputLabel>
							<OutlinedInput
								className={classes.input}
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
						<span className={classes.info}>От 4 до 12 символов</span>
						<Box className={classes.buttonBox}>
							<button type="submit" className={`${classes.purpleButton} ${classes.containedButton}`}>
								Войти
							</button>
							<button className={`${classes.purpleButton} ${classes.outlainedButton}`}>
								<Link className={classes.link} to={'/signup'}>
									Регистрация
								</Link>
							</button>
						</Box>
					</form>
				</div>
			</Container>
		);
};
