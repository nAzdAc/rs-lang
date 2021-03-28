import './App.css';
import Header from './components/Header';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { bookLinks, gamesLinks } from './components/routeData';

const RouteComponent = ({text}) => <div>{text}</div>

function App() {
  return (
    <Router>
      <div className="App">
        <Header/>
        <Switch>
          <Route path="/book"><RouteComponent text='Book'/></Route>
          {bookLinks.map((link, i) => (<Route path={link.to}><RouteComponent text={link.text}/></Route>))}
          <Route path="/games"><RouteComponent text='Игры'/></Route>
          {gamesLinks.map((link, i) => (<Route path={link.to}><RouteComponent text={link.text}/></Route>))}
          <Route path="/dictionary"><RouteComponent text='Словарь'/></Route>
          <Route path="/stats"><RouteComponent text='Статистика'/></Route>
          <Route path="/settings"><RouteComponent text='Настройки'/></Route>
          <Route path="/login"><RouteComponent text='Login'/></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
