import React from 'react';
import { NavLink } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { gameCardsContent } from '../utils/initConsts';
import { useHistory, Switch, Route, useRouteMatch } from 'react-router-dom';
import { SprintPage } from './SprintPage';
import { frontRoutes } from '../utils/frontRoutes';
import { MatchPage } from './MatchPage';
import { AudioPage } from './AudioPage';
import { SavannaPage } from './SavannaPage';
import { GameCard } from '../components/gameCard';

const useStyles = makeStyles({
  root: {
    maxWidth: '1440px',
    margin: '0 auto',
  },
  cards: {
    display: 'flex',
    flexWrap: 'wrap',
    rowGap: '1rem',
  },
  title: {
    paddingTop: '80px',
    marginBottom: '40px',
  },
});

const Games = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h2" className={classes.title}>
        Выберите игру
      </Typography>
      <div className={classes.cards}>
        {gameCardsContent.map((card, index) => {
          return (
            <div key={index}>
              <GameCard
                name={card.name}
                todo={card.todo}
                to={card.to}
              ></GameCard>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const GamesPage = () => {
  const {
    location: { pathname },
  } = useHistory();
  const isGamesRoute = pathname.slice(1).split('/').length === 1;
  const { path } = useRouteMatch();

  return (
    <>
      {isGamesRoute ? <Games /> : null}
      <Switch>
        <Route path={frontRoutes.savanna}>
          <SavannaPage />
        </Route>
        <Route path={frontRoutes.audio}>
          <AudioPage />
        </Route>
        <Route path={frontRoutes.sprint}>
          <SprintPage />
        </Route>
        <Route path={frontRoutes.match}>
          <MatchPage />
        </Route>
      </Switch>
    </>
  );
};

export default GamesPage;
