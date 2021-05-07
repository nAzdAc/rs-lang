import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  rs_lang: {
    margin: '40px 20px 20px 20px',
    'font-family': '"Permanent Marker", cursive',
    'font-size': '96px',
    'line-height': '112px',
    'font-weight': '400',
    color: '#5600E8',

    '@media (max-width: 800px)': {
      'font-size': '60px',
    },
  },

  wrapper: {
    maxWidth: '1440px',
    margin: '0 auto',
    paddingLeft: '20px',
    paddingRight: '20px',
  },

  title: {
    margin: '20px',

    '@media (max-width: 800px)': {
      'font-size': '30px',
    },
  },
  text: {
    margin: '20px',
  },
  textImgWrapper: {
    display: 'flex',
    gap: '20%',

    '@media (max-width: 800px)': {
      flexDirection: 'column',
      gap: '20px',
    },
  },
  mainTextImgWrapper: {
    alignSelf: 'flex-end',
  },
  advantagesSection: {
    background: '#C8FFF4',
    padding: '30px 120px 30px 120px',

    '& > h2': {
      margin: '0 0 20px 0',
    },

    '@media (max-width: 1080px)': {
      padding: '20px 80px 30px 80px',
    },

    '@media (max-width: 580px)': {
      padding: '20px 35px 30px 35px',
    },
  },
  advantagesWrapper: {
    display: 'flex',
    justifyContent: 'space-between',

    '@media (max-width: 960px)': {
      flexWrap: 'wrap',
      gap: '20px',
    },
  },
  advantage: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minWidth: '200px',
  },
  advantageImgWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100px',
    height: '100px',
    marginBottom: '10px',
  },
  developersSection: {
    padding: '100px 60px 60px 80px',

    '& > h2': {
      margin: '0 0 40px 0',
    },
  },
  developers: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '120px',
  },
  developerImgWrapper: {
    display: 'flex',
    width: '100%',
    height: '210px',
    marginBottom: '24px',

    '& > img': {
      width: '100%',
    },
  },
  developerWrapper: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    width: '344px',
    minHeight: '450px',
  },
  devImg: {
    position: 'absolute',
    top: '-100px',
  },
  gitWrapper: {
    display: 'flex',
    alignItems: 'center',
    flex: '0 0 auto',
    width: '120px',

    '&:hover': {
      cursor: 'pointer',
    },
  },
  gitIconWrapper: {
    marginRight: '14px',
  },
  description: {
    flex: '1 0 auto',
  },
  video: {
    marginLeft: '20px',
  },
});
