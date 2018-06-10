import React from 'react';
import { connect } from 'react-redux'
import './style.css';

import List from '../list/';
import Task from '../task/';

import history from '../../history'

import { Router, Route, Switch } from 'react-router-dom'

const App = () => {

	

	return (
		<main>
			<Router history={history}>
				<Switch>
					<Route exact path="/" component={List}/>
					<Route path="/task" component={Task}/>
				</Switch>
			</Router>
		</main>
	);

}

export default connect(
	state => ({
		store: state
	}),
	dispatch => ({})
)(App)
