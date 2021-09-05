import React, { useCallback, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import Box from '@material-ui/core/Box'
import Visibility from '@material-ui/icons/Visibility'
import IconButton from '@material-ui/core/IconButton'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import FormControl from '@material-ui/core/FormControl'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import { useMessage } from '../hooks/message.hook'
import {
    CssTextField,
    useStyles,
} from '../styles/pagesStyles/StatsGamesSettings.styles'
import { useDispatch, useSelector } from 'react-redux'
import { signIn } from '../redux/actions'
import { Container } from '@material-ui/core'
import { frontRoutes } from '../utils/frontRoutes'

export const SignInPage = () => {
    const { theme } = useSelector((state) => state.settings)
    const classes = useStyles({ theme })
    const dispatch = useDispatch()
    const showMessage = useMessage()
    const { token } = useSelector((state) => state.userData)
    const [form, setForm] = useState({
        email: '',
        password: '',
    })
    const [values, setValues] = useState({
        password: '',
        showPassword: false,
    })

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword })
    }
    const handleMouseDownPassword = (event) => {
        event.preventDefault()
    }
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value })
    }
    const handleFormChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = useCallback(
        async (event) => {
            event.preventDefault()
            const { text, code } = await dispatch(signIn(form))
            showMessage(text, code)
        },
        [dispatch, form, showMessage]
    )

    if (!!token) {
        return <Redirect to="/book" />
    } else
        return (
            <Container className={classes.root}>
                <div className={classes.formCard}>
                    <h2 className={classes.title}>Аккаунт</h2>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <CssTextField
                            variant="outlined"
                            id="email"
                            label="Электронная почта"
                            name="email"
                            autoFocus
                            value={form.email}
                            onChange={handleFormChange}
                        />
                        <span className={classes.info}>
                            Используйте настоящую
                        </span>
                        <FormControl
                            className={classes.field}
                            variant="outlined"
                            value={form.password}
                            onChange={handleFormChange}
                        >
                            <InputLabel
                                value={form.password}
                                htmlFor="outlined-adornment-password"
                            >
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
                                            onMouseDown={
                                                handleMouseDownPassword
                                            }
                                            edge="end"
                                        >
                                            {values.showPassword ? (
                                                <Visibility />
                                            ) : (
                                                <VisibilityOff />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                labelWidth={70}
                            />
                        </FormControl>
                        <span className={classes.info}>
                            От 4 до 12 символов
                        </span>
                        <Box className={classes.buttonBox}>
                            <button
                                style={{ width: '130px' }}
                                type="submit"
                                className={classes.button}
                            >
                                Войти
                            </button>
                            <Link
                                className={classes.link}
                                to={frontRoutes.signUp}
                            >
                                <button className={classes.outlainedButton}>
                                    Регистрация
                                </button>
                            </Link>
                        </Box>
                    </form>
                </div>
            </Container>
        )
}
