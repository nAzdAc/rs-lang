import React, { useState, useEffect, useCallback, useContext } from "react";
import { backRoutes } from "../utils/backRoutes";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import "fontsource-roboto";
import Box from "@material-ui/core/Box";
import WordsCardList from "../components/WordsCardList";
import { AuthContext } from "../context/AuthContext";
import Button from '@material-ui/core/Button';
import LevelButton from "../components/LevelButton";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
  },
  container: {
    width: '100%',
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    aligneItems:'flex-start',
  },
  title: {
    marginRight: "40px",
    fontSize: "60px",
    fontStyle: "normal",
    fontWeight: "300",
    lineHeight: "80px",
    textAlign: "left",
    color: '#000000',
    verticalAlign: "middle",
  },
  titleBox: {
    height:'72px',
    display: "flex",
    marginTop: "80px",
    marginRight: "auto",
    width: '100%',
  },
  typeBox: {
    width: '100%',
    height:'48px',
    display: "flex",
    marginTop: "40px",
    // backgroundColor:'#6200EE',
    justifyContent: 'space-around',
    // marginRight: "auto",
  },
  typeButton: {
    width: '100%',
    fontSize: "14px",
    fontWeight: "500",
    color:'white',
    backgroundColor:'#6200EE',
    borderRadius:'0',
  },
  typeButtonActive: {
    borderBottom: '4px solid white',
    margiBottom: '-4px',
    color:'white',
    backgroundColor:'#6200EE',
    
  },
  buttonBox: {
    width: '100%',
    display: "flex",
    marginTop: "40px",
    marginRight: "auto",
    flexWrap: "wrap",
  },
  link: {
    textDecoration: 'none',
  },

  pagination: {
    margin: "40px",
    fontSize: "40px",
  },
}));

export default function DictionaryPage() {
  const {userId,token} = useContext(AuthContext);
  const [page, setPage] = useState(1);
  const [data, setData] = useState();
  const classes = useStyles();
  // console.log(userId)
 
  // const fetchUrl = backRoutes.words
  const func = useCallback( async () => {
    const result = await backRoutes.getUserWords({userId, token}); 
    setData(result)
  }, [token, userId])

  useEffect(() => {
    if(userId && token ){
      func()
    }
  }, [func, token, userId])

  const handlePaginationChange = (e, value) => {
    setPage(value);
  };
  const handleButtonBoxClick = (e) => {
    // console.log('hello')
  }

  return (
    <Container className={classes.container}>
      <Box className={classes.titleBox}>
        <Typography className={classes.title} variant="h1" component="h2">
          Словарь
        </Typography>

      </Box>
      <Box className={classes.typeBox}>
        <Button variant="contained" className={`${classes.typeButton} ${classes.typeButtonActive} `}>Изучаемые слова</Button>
        <Button variant="contained"  className={classes.typeButton}>Сложные слова</Button>
        <Button variant="contained" className={classes.typeButton}>Удаленные слова</Button>
      </Box>
      <Box className={classes.buttonBox} >
        <LevelButton click={handleButtonBoxClick} state={'active'} group={1}></LevelButton>
        <LevelButton click={handleButtonBoxClick} group={2}></LevelButton>
        <LevelButton click={handleButtonBoxClick} group={3}></LevelButton>
        <LevelButton click={handleButtonBoxClick} group={4}></LevelButton>
        <LevelButton click={handleButtonBoxClick} group={5}></LevelButton>
        <LevelButton click={handleButtonBoxClick} group={6}></LevelButton>
      </Box>
      <WordsCardList
        // difficulty={group}
        // fetchUrl={fetchUrl}
        userWords={data}
        infoPanel="CardIcons"
      ></WordsCardList>
       <Pagination
        page={page}
        className={classes.pagination}
        onChange={handlePaginationChange}
        count={20}
        color="primary"
      />
    </Container>
  );
}
