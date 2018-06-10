import React from 'react';
import { connect } from 'react-redux'
import './style.css';
import Filter from '../filter/index'
import { newEditor, clearEditor } from '../task/action'
import { updateFilter } from '../filter/action'
import List2 from './components/list'



const List = ( { AllTasks, Editor,onClearEditor, onNewEditor, onUpdateFilter } ) => {

	const addTask = () => {
		onNewEditor( Date.now())
	}

	if ('id' in Editor) {
		onClearEditor()
		onUpdateFilter(AllTasks)
		return false
	}

	return (
		<div className="task-list--block">
			<h1>Список дел</h1>
			<Filter/>
			{
				!AllTasks.length ? (
					<p>Список дел пуст</p>
				) : (
					<React.Fragment>
						<div className="task-list">
							<div className="task-list--header">
								<div className="task-item--check">
									
								</div>
								<div className="task-item--priority">
									<p>Статус</p>
								</div>
								<div className="task-item--name">
									<p>Название</p>
								</div>
								<div className="task-item--deadline">
									<p>Крайний срок</p>
								</div>
								<div className="task-item--complite">
									<p>Готовность</p>
								</div>
								<div className="task-item--action">
									<p>Удалить</p>
								</div>
							</div>

							<List2/>
						</div>
					</React.Fragment>
				)
			}
			<div className='add-task--block'>
				<button className="add-task-button" onClick={addTask}>ADD TASK</button>
			</div>
		</div>
	)
}

export default connect(
	state => ({
		AllTasks: [...state.Tasks],
		Editor: {...state.Editor}
	}),
	dispatch => ({
		onClearEditor: () => {
			dispatch( clearEditor() )
		},
		onNewEditor: (id) => {
			dispatch( newEditor(id) )
		},
		onUpdateFilter: (data) => {
			dispatch( updateFilter(data))
		}
	})
)(List)