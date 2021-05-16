import React from 'react';
import { render } from 'react-dom';
import './index.css';
import { App } from './App';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from './redux/rootReducer';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const store = createStore(rootReducer, compose(
	applyMiddleware(
		thunk, logger
	),
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));

const app = (
	<Provider store={store}>
		<App />
	</Provider>
);

render(app, document.getElementById('root'));
