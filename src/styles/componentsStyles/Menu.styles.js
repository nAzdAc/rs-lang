import { makeStyles } from '@material-ui/core/styles'
import { icons } from '../../assets/icons/IconsRequire'

export const useStyles = makeStyles({
    list: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        zIndex: '2',
        fontFamily: 'inherit',
        color: 'inherit',
    },
    link: (props) => ({
        cursor:
            props.theme === 'dark'
                ? `url(${icons.darkPointer}), pointer`
                : `url(${icons.lightPointer}), pointer`,
        fontFamily: props.theme === 'dark' ? 'darkTitle' : 'lightTitle',
        color: 'inherit',
        '& .MuiSvgIcon-root': {
            width: '2rem',
            height: '2rem',
            color: 'inherit',
            display: 'none',
            '&:hover, &:focus': {
                transform: 'rotate(360deg)',
                transition: '0.5s',
            },
            '@media (max-width: 768px)': {
                display: 'block',
            },
            '@media (max-width: 450px)': {
                width: '1rem',
                height: '1rem',
                marginRight: '3px',
            },
        },
    }),
    text: {
        color: 'inherit',
        fontFamily: 'inherit',
        fontSize: '24px',
        '&:hover': {
            textDecoration: 'underline',
        },
        '@media (max-width: 950px)': {
            fontSize: '17px',
        },
        '@media (max-width: 768px)': {
            display: 'none',
        },
    },
})
