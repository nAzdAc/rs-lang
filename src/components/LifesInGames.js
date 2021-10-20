import Rating from '@material-ui/lab/Rating'
import { withStyles } from '@material-ui/core/styles'
import FavoriteIcon from '@material-ui/icons/Favorite'
import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector } from 'react-redux'

const StyledRating = withStyles({
    iconFilled: {
        color: '#FF001E',
    },
})(Rating)

const useStyles = makeStyles({
    lifesContainer: (props) => ({
        '& .MuiRating-root': {
            '& .MuiRating-iconEmpty': {
                color: props.theme === 'dark' ? '#FCCA81' : '#BB86FC',
            },
        },
    }),
})

export const LifesInGames = ({ lifes }) => {
    const { theme } = useSelector((state) => state.settings)
    const classes = useStyles({ theme })
    return (
        <Box
            className={classes.lifesContainer}
            component="fieldset"
            mb={3}
            borderColor="transparent"
        >
            <StyledRating
                name="customized-color"
                readOnly={true}
                value={lifes || 0}
                size="large"
                icon={<FavoriteIcon fontSize="inherit" />}
            />
        </Box>
    )
}
