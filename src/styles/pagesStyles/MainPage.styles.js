import { makeStyles } from '@material-ui/core/styles'
import { icons } from '../../assets/icons/IconsRequire'

export const useStyles = makeStyles({
    root: {
        padding: '10px 10px 10px 20px',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'inherit',
        fontFamily: 'inherit',
        '& > header': {
            backgroundColor: '#5600E8',
        },
        '@media (max-width: 450px)': {
            padding: '5px',
        },
    },
    logo: {
        fontFamily: 'logo',
        marginTop: '0px',
        fontSize: '96px',
        lineHeight: '112px',
        fontWeight: '900',
        color: 'inherit',
        '@media (max-width: 768px)': {
            marginTop: '-15px',
            marginBottom: '-10px',
            fontSize: '70px',
        },
        '@media (max-width: 450px)': {
            marginTop: '-30px',
            marginBottom: '-20px',
            fontSize: '45px',
        },
    },
    title: (props) => ({
        fontSize: '4rem',
        marginBottom: '10px',
        fontFamily: props.theme === 'dark' ? 'darkTitle' : 'lightTitle',
        color: 'inherit',
        marginRight: 'auto',
        '@media (max-width: 768px)': {
            fontSize: '3rem',
        },
        '@media (max-width: 450px)': {
            fontSize: '1.8rem',
            marginBottom: '5px',
        },
    }),
    subtitle: (props) => ({
        marginBottom: '20px',
        fontSize: '50px',
        color: 'inherit',
        fontFamily: props.theme === 'dark' ? 'darkTitle' : 'lightTitle',
        '@media (max-width: 768px)': {
            fontSize: '35px',
        },
        '@media (max-width: 450px)': {
            fontSize: '22px',
        },
    }),
    subtitle1: (props) => ({
        fontSize: '1.5rem',
        fontWeight: '400',
        marginRight: 'auto',
        margin: '15px',
        fontFamily: props.theme === 'dark' ? 'darkTitle' : 'lightTitle',
        '@media (max-width: 450px)': {
            fontSize: '1.1px',
            margin: '7px',
        },
    }),
    subtitle2: {
        fontSize: '1.05rem',
        fontWeight: '400',
        margin: 'auto',
        color: 'inherit',
        '@media (max-width: 450px)': {
            fontSize: '0.9rem',
        },
    },
    video: (props) => ({
        boxShadow:
            props.theme === 'dark'
                ? '3px 0px 10px 3px rgba(227, 134, 0, 0.5)'
                : '3px 0px 10px 3px rgba(86, 0, 232, 0.6)',
        margin: '15px 0px',
        border: 'none',
        borderRadius: '5px',
        width: '100%',
        maxWidth: '700px',
        height: '400px',
        cursor:
            props.theme === 'dark'
                ? `url(${icons.darkPointer}), pointer`
                : `url(${icons.lightPointer}), pointer`,
        '@media (max-width: 768px)': {
            height: '300px',
            margin: '10px 0px',
        },
        '@media (max-width: 450px)': {
            height: '200px',
            margin: '5px 0px',
        },
    }),
    textImgWrapper: {
        color: 'inherit',
        display: 'flex',
        flexDirection: 'column',
    },
    text: {
        fontFamily: 'inherit',
        fontWeight: '400',
        margin: '10px 0px',
        '@media (max-width: 450px)': {
            margin: '5px 0px',
        },
    },
    advantagesSection: (props) => ({
        alignSelf: 'center',
        color: 'inherit',
        backgroundColor: 'inherit',
        width: '85%',
        borderRadius: '5px',
        padding: '30px',
        marginBottom: '30px',
        marginTop: '10px',
        boxShadow:
            props.theme === 'dark'
                ? '3px 0px 10px 3px rgba(227, 134, 0, 0.5)'
                : '3px 0px 10px 3px rgba(86, 0, 232, 0.6)',
        '@media (max-width: 450px)': {
            padding: '10px',
            marginBottom: '15px',
        },
    }),
    advantagesWrapper: {
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexWrap: 'wrap',
        '@media (max-width: 540px)': {
            justifyContent: 'center',
        },
    },
    advantage: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        minWidth: '200px',
        margin: '10px',
        color: 'inherit',
    },
    advantageImg: {
        width: '100px',
        height: '100px',
        marginBottom: '10px',
    },
})
