import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import App from './components/app/';
import persistState from 'redux-localstorage'

import { createStore, applyMiddleware, compose } from 'redux'
import { Router, Route } from 'react-router-dom'
import reducer from './reducer.js'

import './index.css';
import registerServiceWorker from './registerServiceWorker';

import history from './history'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const enhancer = compose(
	persistState(),
)

const store = createStore(reducer, composeEnhancers(applyMiddleware()), enhancer);

ReactDOM.render(
	<Provider store={store}>
		<Router history={history}>
			<Route exact path="*" component={App}/>
		</Router>
	</Provider>,
	document.getElementById('root'));
registerServiceWorker();
