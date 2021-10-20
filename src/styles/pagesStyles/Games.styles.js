import { makeStyles } from '@material-ui/core/styles'
import { icons } from '../../assets/icons/IconsRequire'

export const useStyles = makeStyles({
    root: {
        height: '100%',
        width: '90%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontFamily: 'inherit',
        background: 'inherit',
        alignSelf: 'center',
    },
    gameContainer: {
        position: 'relative',
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'inherit',
        color: 'inherit',
        padding: '10px 5px',
    },
    buttonsWrap: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginBottom: '15px',
        gap: '20px',
        '@media (max-width: 450px)': {
            gap: '7px',
            marginBottom: '10px',
        },
    },
    button: (props) => ({
        padding: '3px',
        minWidth: '100px',
        height: '50px',
        backgroundColor: props.theme === 'dark' ? '#E38600' : '#5600E8',
        color: props.theme === 'dark' ? '#141414' : '#F2F2F2',
        fontFamily: 'inherit',
        fontWeight: '400',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderRadius: '10px',
        cursor:
            props.theme === 'dark'
                ? `url(${icons.darkPointer}), default`
                : `url(${icons.lightPointer}), default`,
        outline: 'none',
        border: '3px solid',
        borderColor: props.theme === 'dark' ? '#141414' : '#F2F2F2',
        fontSize: '1rem',
        '&:hover': {
            border: '3px solid',
            borderColor: props.theme === 'dark' ? '#E38600' : '#5600E8',
            backgroundColor: props.theme === 'dark' ? '#141414' : '#F2F2F2',
            color: props.theme === 'dark' ? '#E38600' : '#5600E8',
        },
        '@media (max-width: 450px)': {
            minWidth: '85px',
            fontSize: '0.7rem',
            height: '40px',
        },
    }),
    failButton: (props) => ({
        padding: '3px',
        minWidth: '100px',
        height: '50px',
        color: props.theme === 'dark' ? '#141414' : '#F2F2F2',
        fontFamily: 'inherit',
        fontWeight: '400',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderRadius: '10px',
        cursor:
            props.theme === 'dark'
                ? `url(${icons.darkPointer}), default`
                : `url(${icons.lightPointer}), default`,
        outline: 'none',
        fontSize: '1rem',
        backgroundColor: '#FF001E',
        border: '3px solid #FF001E',
        '&:hover': {
            border: '3px solid #FF001E',
            backgroundColor: props.theme === 'dark' ? '#141414' : '#F2F2F2',
            color: '#FF001E',
        },
        '@media (max-width: 450px)': {
            minWidth: '85px',
            fontSize: '0.7rem',
            height: '40px',
        },
    }),
    correctButton: (props) => ({
        padding: '3px',
        minWidth: '100px',
        height: '50px',
        color: props.theme === 'dark' ? '#141414' : '#F2F2F2',
        fontFamily: 'inherit',
        fontWeight: '400',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderRadius: '10px',
        cursor:
            props.theme === 'dark'
                ? `url(${icons.darkPointer}), default`
                : `url(${icons.lightPointer}), default`,
        outline: 'none',
        fontSize: '1rem',
        backgroundColor: '#28FC03',
        border: '3px solid #28FC03',
        '&:hover': {
            border: '3px solid #28FC03',
            backgroundColor: props.theme === 'dark' ? '#141414' : '#F2F2F2',
            color: '#28FC03',
        },
        '@media (max-width: 450px)': {
            minWidth: '85px',
            fontSize: '0.7rem',
            height: '40px',
        },
    }),
    speaker: (props) => ({
        width: '150px',
        height: '120px',
        marginBottom: '60px',
        cursor:
            props.theme === 'dark'
                ? `url(${icons.darkPointer}), default`
                : `url(${icons.lightPointer}), default`,
        color: 'inherit',
        '&:hover': {
            transform: 'scale(1.1)',
        },
        '@media (max-width: 450px)': {
            width: '70px',
            height: '90px',
            marginBottom: '20px',
        },
    }),
    progressText: {
        fontFamily: 'inherit',
        color: 'inherit',
        marginBottom: '10px',
        fontSize: '1.5rem',
        '@media (max-width: 450px)': {
            marginBottom: '5px',
            fontSize: '1.2rem',
        },
    },
    failText: {
        fontFamily: 'inherit',
        color: '#FF001E',
        fontSize: '1.2em',
        '@media (max-width: 450px)': {
            marginBottom: '5px',
            fontSize: '1rem',
        },
    },
    correctText: {
        fontFamily: 'inherit',
        color: '#28FC03',
        fontSize: '1.2em',
        '@media (max-width: 450px)': {
            marginBottom: '5px',
            fontSize: '1rem',
        },
    },
    loader: (props) => ({
        position: 'absolute',
        color: props.theme === 'dark' ? '#E38600' : '#5600E8',
        top: '50%',
        left: '50%',
    }),
    savannaWord: (props) => ({
        marginBottom: '300px',
        fontSize: '2rem',
        fontFamily: props.theme === 'dark' ? 'darkTitle' : 'lightTitle',
        '@media (max-width: 450px)': {
            fontSize: '1.4rem',
            marginBottom: '307px',
        },
    }),
    fullScreenBtn: (props) => ({
        position: 'absolute',
        right: '20px',
        bottom: '20px',
        border: 'none',
        outline: 'none',
        cursor:
            props.theme === 'dark'
                ? `url(${icons.darkPointer}), default`
                : `url(${icons.lightPointer}), default`,
        fontWeight: 'bold',
        width: '50px',
        height: '50px',
        background: 'inherit',
        color: 'inherit',
        '@media (max-width: 450px)': {
            width: '30px',
            height: '30px',
            right: '10px',
            bottom: '10px',
        },
    }),
    fullScreenIcon: (props) => ({
        cursor:
            props.theme === 'dark'
                ? `url(${icons.darkPointer}), default`
                : `url(${icons.lightPointer}), default`,
        fontSize: '50px',
        color: 'inherit',
        '&:hover': {
            transform: 'scale(1.1)',
        },
        '@media (max-width: 450px)': {
            fontSize: '30px',
        },
    }),
    series: {
        minHeight: '100px',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginBottom: '15px',
        width: '90%',
        '@media (max-width: 450px)': {
            '& > img': {
                width: '25px',
                height: '25px',
            },
        },
    },
    imagesContainer: {
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '20px 0px 10px 0px',
        gap: '10px',
    },
    imageWrap: (props) => ({
        borderRadius: '5px',
        cursor:
            props.theme === 'dark'
                ? `url(${icons.darkPointer}), default`
                : `url(${icons.lightPointer}), default`,
        position: 'relative',
        width: '180px',
        height: '180px',
        '@media (max-width: 900px)': {
            width: '140px',
            height: '140px',
        },
        '@media (max-width: 700px)': {
            width: '100px',
            height: '100px',
        },
    }),
    overlay: {
        display: 'block',
        position: 'absolute',
        top: '0px',
        left: '0px',
        right: '0px',
        bottom: '0px',
        opacity: '0',
        background: 'white',
    },
    badOverlay: {
        zIndex: '1',
        opacity: '0.4',
        background: '#FF001E',
    },
    goodOverlay: {
        zIndex: '1',
        opacity: '0.4',
        background: '#28FC03',
    },
    image: (props) => ({
        position: 'absolute',
        top: '0px',
        left: '0px',
        width: '100%',
        height: '100%',
        borderRadius: 'inherit',
        cursor:
            props.theme === 'dark'
                ? `url(${icons.darkPointer}), default`
                : `url(${icons.lightPointer}), default`,
    }),
    currentWordWrap: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        '@media (max-width: 450px)': {
            flexDirection: 'column',
        },
    },
    currentWord: {
        marginRight: '10px',
        marginLeft: '10px',
        fontSize: '3rem',
        fontFamily: 'inherit',
        '@media (max-width: 768px)': {
            fontSize: '2.2rem',
        },
        '@media (max-width: 450px)': {
            fontSize: '1.6rem',
        },
    },
    example: {
        margin: '10px',
        fontSize: '1.5rem',
        fontFamily: 'inherit',
        alignSelf: 'center',
        '@media (max-width: 450px)': {
            fontSize: '1.3rem',
        },
    },
    finishLine: (props) => ({
        marginBottom: '10px',
        backgroundColor: props.theme === 'dark' ? '#E38600' : '#5600E8',
        width: '80%',
        maxWidth: '800px',
        height: '3px',
        border: 'none',
    }),
})
