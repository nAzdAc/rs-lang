import React, { useRef } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Footer } from './components/Footer'
import { Menu } from './components/Menu'
import { Link } from 'react-router-dom'
import { useStyles } from './styles/pagesStyles/App.styles'
import { useRoutes } from './hooks/routes.hook'
import { EnterPoint } from './components/EnterPoint'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useSelector } from 'react-redux'
import { frontRoutes } from './utils/frontRoutes'
import { CircularProgress } from '@material-ui/core'

export const App = () => {
    const { theme } = useSelector((state) => state.settings)
    const { block } = useSelector((state) => state)
    const classes = useStyles({ theme, block })
    const routes = useRoutes()
    const preloaderRef = useRef()

    window.addEventListener('load', () => {
        preloaderRef.current.style.display = 'none'
    })

    return (
        <Router>
            <div className={classes.app}>
                <header className={classes.header}>
                    <Link to={frontRoutes.main} className={classes.logo}>
                        RS Lang
                    </Link>
                    <Menu />
                    <EnterPoint />
                </header>
                <React.Fragment>{routes}</React.Fragment>
                <div ref={preloaderRef} className={classes.preloader}>
                    <CircularProgress color="inherit" />
                    <span>Минуточку...</span>
                </div>
                <div className={classes.loader}>
                    <CircularProgress color="inherit" />
                    <span>Секундочку...</span>
                </div>
                <ToastContainer className={classes.toast} />
                <Footer />
            </div>
        </Router>
    )
}
