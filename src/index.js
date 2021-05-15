import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './App';
import { createStore } from 'redux'
import { rootReducer } from './redux/rootReducer';

const store = createStore(rootReducer)

ReactDOM.render(
		<App />,
	document.getElementById('root')
);
