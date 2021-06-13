import React from 'react';
import { render } from 'react-dom';
import './index.css';
import { App } from './App';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from './redux/rootReducer';
import thunk from 'redux-thunk';

export const store = createStore(rootReducer, applyMiddleware(thunk));

const app = (
	<Provider store={store}>
		<App />
	</Provider>
);

render(app, document.getElementById('root'));
