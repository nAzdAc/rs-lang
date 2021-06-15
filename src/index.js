import React from 'react';
import { render } from 'react-dom';
import './index.css';
import { App } from './App';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from './redux/rootReducer';
import thunk from 'redux-thunk';

const localStorageMiddleware = ({ getState }) => {
	return (next) => (action) => {
		const result = next(action);
		localStorage.setItem('appState', JSON.stringify(getState()));
		return result;
	};
};

const reHydrateStore = () => {
	if (localStorage.getItem('appState') !== null) {
		return JSON.parse(localStorage.getItem('appState'));
	}
};

const store = createStore(rootReducer, reHydrateStore(), applyMiddleware(thunk, localStorageMiddleware));

store.subscribe(() => {
	localStorage.setItem('appState', JSON.stringify(store.getState()));
});

const app = (
	<Provider store={store}>
		<App />
	</Provider>
);

render(app, document.getElementById('root'));
