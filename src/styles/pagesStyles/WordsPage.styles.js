import { makeStyles } from '@material-ui/core/styles'
import { icons } from '../../assets/icons/IconsRequire'

export const useStyles = makeStyles({
    root: {
        fontFamily: 'inherit',
        color: 'inherit',
        backgroundColor: 'inherit',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10px',
    },
    title: (props) => ({
        fontFamily: props.theme === 'dark' ? 'darkTitle' : 'lightTitle',
        fontSize: '5rem',
        margin: '20px auto 25px 0px',
        '@media (max-width: 768px)': {
            fontSize: '3.5rem',
        },
        '@media (max-width: 450px)': {
            fontSize: '1.7rem',
            margin: '0px auto 10px 0px',
        },
    }),
    buttonBox: {
        display: 'flex',
        flexWrap: 'wrap',
        marginBottom: '20px',
        gap: '30px',
        marginRight: 'auto',
        '@media (max-width: 768px)': {
            gap: '20px',
        },
        '@media (max-width: 450px)': {
            gap: '15px',
            marginBottom: '10px',
        },
    },
    typeBox: (props) => ({
        color: props.theme === 'dark' ? '#141414' : '#F2F2F2',
        backgroundColor: props.theme === 'dark' ? '#E38600' : '#5600E8',
        width: '100%',
        display: 'flex',
        marginBottom: '20px',
        '@media (max-width: 450px)': {
            marginBottom: '10px',
        },
    }),
    typeButton: (props) => ({
        fontFamily: 'inherit',
        width: '100%',
        minWidth: '0px',
        padding: '0px',
        height: '50px',
        fontSize: '0.95rem',
        fontWeight: '400',
        color: 'inherit',
        backgroundColor: 'inherit',
        borderRadius: '0',
        cursor:
            props.theme === 'dark'
                ? `url(${icons.darkPointer}), default`
                : `url(${icons.lightPointer}), default`,
        '&:hover': {
            color: props.theme === 'dark' ? '#E38600' : '#5600E8',
            backgroundColor: props.theme === 'dark' ? '#141414' : '#F2F2F2',
            boxShadow:
                props.theme === 'dark'
                    ? '3px 0px 10px 3px rgba(227, 134, 0, 0.5)'
                    : '3px 0px 10px 3px rgba(86, 0, 232, 0.6)',
        },
        '@media (max-width: 768px)': {
            fontSize: '0.65rem',
        },
        '@media (max-width: 450px)': {
            fontSize: '0.55rem',
            height: '35px',
        },
    }),
    typeButtonActive: (props) => ({
        borderBottom: '7px solid',
        borderColor: props.theme === 'dark' ? '#FCCA81' : '#BB86FC',
        marginBottom: '-7px',
        '@media (max-width: 450px)': {
            borderBottom: '4px solid',
            marginBottom: '-4px',
        },
    }),
    subtitle: (props) => ({
        fontFamily: props.theme === 'dark' ? 'darkTitle' : 'lightTitle',
        marginBottom: '20px',
        fontSize: '2.5rem',
        '@media (max-width: 768px)': {
            fontSize: '1.8rem',
        },
        '@media (max-width: 450px)': {
            fontSize: '1.1rem',
        },
    }),
    link: {
        fontFamily: 'inherit',
        fontWeight: '400',
        textDecoration: 'none',
        color: 'inherit',
        width: '100%',
        height: '100%',
        '@media (max-width: 450px)': {
            '& > button > span': {
                fontSize: '0.4rem',
            },
        },
    },
    pagination: (props) => ({
        fontFamily: 'inherit',
        cursor:
            props.theme === 'dark'
                ? `url(${icons.darkPointer}), default`
                : `url(${icons.lightPointer}), default`,
        display: 'flex',
        margin: '25px',
        justifyContent: 'center',
        '& li': {
            cursor:
                props.theme === 'dark'
                    ? `url(${icons.darkPointer}), default`
                    : `url(${icons.lightPointer}), default`,
            color: 'inherit',
            fontFamily: 'inherit',
            '& .MuiPaginationItem-textPrimary.Mui-selected': {
                fontFamily: 'inherit',
                cursor:
                    props.theme === 'dark'
                        ? `url(${icons.darkPointer}), default`
                        : `url(${icons.lightPointer}), default`,
                backgroundColor: props.theme === 'dark' ? '#E38600' : '#5600E8',
                color: props.theme === 'dark' ? '#141414' : '#F2F2F2',
            },
            '& .MuiPaginationItem-root': {
                fontFamily: 'inherit',
                minWidth: '0px',
                cursor:
                    props.theme === 'dark'
                        ? `url(${icons.darkPointer}), default`
                        : `url(${icons.lightPointer}), default`,
                fontSize: 'inherit',
                color: 'inherit',
            },
        },
        '@media (max-width: 450px)': {
            margin: '10px 0px',
            fontSize: '0.9rem',
        },
    }),
    wordList: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
    },
    levelTitle: (props) => ({
        fontSize: '4.3rem',
        marginBottom: '25px',
        fontFamily: props.theme === 'dark' ? 'darkTitle' : 'lightTitle',
        marginRight: 'auto',
        color:
            props.theme === 'dark'
                ? props.group === 1
                    ? '#FCCA81'
                    : props.group === 2
                    ? '#FCBD60'
                    : props.group === 3
                    ? '#FAAC39'
                    : props.group === 4
                    ? '#FC9F14'
                    : props.group === 5
                    ? '#E38600'
                    : props.group === 6
                    ? '#B86D00'
                    : '#FCCA81'
                : props.group === 1
                ? '#BB86FC'
                : props.group === 2
                ? '#985EFF'
                : props.group === 3
                ? '#7F39FB'
                : props.group === 4
                ? '#7314FA'
                : props.group === 5
                ? '#5600E8'
                : props.group === 6
                ? '#3700B3'
                : '#BB86FC',
        '@media (max-width: 768px)': {
            fontSize: '3.3rem',
        },
        '@media (max-width: 450px)': {
            fontSize: '2rem',
            marginBottom: '15px',
        },
    }),
})
