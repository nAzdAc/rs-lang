import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

const Login = () => <div>Login</div>
const Book = () => <div>Book</div>
const Games = () => <div>Games</div>

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/book" component={Book} />
      <Route path="/games" component={Games} />
      <Route path="/login" component={Login}/>
    </Switch>
  </Router>,
  document.getElementById('root')
);
