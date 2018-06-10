import React from 'react';
import { connect } from 'react-redux'
import './style.css';
import { checkFilter, updateFilter } from './action'

const Filter = ({ AllTasks, FilterState, onCheckFilter, onUpdateFilter, action }) => {


	if (FilterState.val == '') {
		onCheckFilter(FilterState.val != '' ? FilterState.val : 'all' , AllTasks)
		return false
	}

	const selectFilter = (val) => {
		onCheckFilter(val, AllTasks)
	}

	if ('marcer' in FilterState) {
		onUpdateFilter(AllTasks)
	}

	const Item = (props) => {

		const checkedFilter = () => {
			props.action(props.pId);
		}
		return (
			<div className='filter-item'>
				<input 
					type='radio'
					className={`filter__${props.pId}`}
					id={props.pId}
					name='filter'
					defaultChecked={props.pChecked}
					onChange={checkedFilter}
				/>
				<label htmlFor={props.pId}>
					{props.pValue}
				</label>
			</div>
		)
	}

	const filters = [
		{
			id: 'all',
			value: 'ALL'
		},
		{
			id: 'normal',
			value: 'NORMAL'
		},
		{
			id: 'important',
			value: 'IMPORTANT'
		},
		{
			id: 'fatality',
			value: 'FATALITY'
		}
	]

		let filtersBlock = filters.map((item, key) => {
			
			return <Item key={key} pId={item.id} pValue={item.value} action={selectFilter} pChecked={
				item.id == FilterState.val ? true : false
			}/>
		})
	
	return (
		<div className='filter-block'>
			<form className='filter-list'>
				{filtersBlock}
			</form>
		</div>
	)
}

export default connect(
	state => ({
		AllTasks: [...state.Tasks],
		FilterState: state.Filter
	}),
	dispatch => ({
		onCheckFilter: (val, list) => {
			dispatch( checkFilter(val, list) )
		},
		onUpdateFilter: (data) => {
			dispatch( updateFilter(data))
		}
	})
)(Filter)