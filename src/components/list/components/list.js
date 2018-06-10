import React from 'react';

import { connect } from 'react-redux'
import Item from './item'
import { checkTask, dellTask } from '../action'
import { marcerFilter } from '../../filter/action'

const List2 = ( { Tasks, onChecktask, onDellTask, onMarcerFilter }) => {

	const taskChecked = (data) => {
		onChecktask(data, Date.now());
		onMarcerFilter()
	}

	const taskDelete = (data) => {
		onDellTask(data);
		onMarcerFilter()
	}


	return (
		Tasks.map(( item, key ) => ( <Item data={item} key={key} checkFunc={taskChecked} delFunc={taskDelete}/> ))
		)
}

export default connect(
	state => ({
		Tasks: [...state.Filter.list],
	}),
	dispatch => ({
		onChecktask: (id, time) => {
			dispatch(checkTask(id, time))
		},
		onDellTask: (id) => {
			dispatch(dellTask(id), dellTask(id))
		},
		onMarcerFilter: () => {
			dispatch(marcerFilter())
		}
	})
)(List2)