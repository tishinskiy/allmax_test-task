import React from 'react';
import { connect } from 'react-redux'
import history from '../../history'
import './style.css';
import { newEditor,  readEditor, writeEditor, repearEditor, cancelEditor, checkEditor } from './action'
import { addTask, updateTask, dellTask,} from '../list/action'

import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker-cssmodules.css';


const Task = ( { Editor, onNewEditor, onAddTask, onUpdateTask, Tasks, onReadEditor, onWriteEditor, onRepearEditor, onCancelEditor,onDellTask, onCheckEditor } ) => {

	let taskId = history.location.pathname.replace('/task/','')

	if (!('id' in Editor) && taskId != '') {
		let newEditor = false
		Tasks.forEach((item) => {
			if (item.id == taskId) {
				newEditor = item 
			}
		})

		if (newEditor) {
			onReadEditor(newEditor);
		}
		else {
			onNewEditor( taskId )
		}


		return false
	}

	// if (taskId == '') {
	// 	taskId = Date.now()
	// 	onNewEditor( taskId )
	// 	return false
	// }
	let modeEditor = ('mode' in Editor && Editor.mode > 0) ? Editor.mode : 0 

	// let eDeadline = ''
	let dl = false
	let overdue = ''
	let complited = ''

	if ('deadline' in Editor && !!Editor.deadline) {
		dl = new Date(Number(Editor.deadline))
		if (!!Number(Editor.deadline) && Number(Editor.deadline) < Date.now() ) {
			overdue = 'deadline__overdue'
		}
	}

	let taskName =''
	let taskDesc =''
	let taskPriority =''
	let taskDeadline =''
	let taskDeadlineTime = 'deadline' in Editor && Editor.deadline ? dl : ''

	const Name = (props) => {
		return (
			<input type='text' ref={(input) => { taskName = input } } defaultValue={props.name} />
		)
	}

	const Description = (props) => {
		return (
			<textarea ref={(input) => { taskDesc = input } } defaultValue={props.data} />
		)
	}

	const Priority = (props) => {
		return (
			<React.Fragment>
				<div className='priority-item'>
					<input 
						type='radio' 
						name='priority' 
						id='priority_1' 
						defaultValue='normal' 
						defaultChecked={
							props.priority == 'normal' ? true : false
						} 
					/>
					<label htmlFor="priority_1">mormal</label>
				</div>

				<div className='priority-item'>
					<input 
						type='radio' 
						name='priority' 
						id='priority_2' 
						defaultValue='important'
						defaultChecked={
							props.priority == 'important' ? true : false
						} 
					/>
					<label htmlFor="priority_2">important</label>
				</div>

				<div className='priority-item'>
					<input 
						type='radio' 
						name='priority' 
						id='priority_3' 
						defaultValue='fatality'
						defaultChecked={
							props.priority == 'fatality' ? true : false
						} 
					/>
					<label htmlFor="priority_3">fatality</label>
				</div>
			</React.Fragment>
		)
	}


	const Deadline = (props) => {
		return (
			<React.Fragment>
				<input type='checkbox' defaultChecked={0} id="dlCheck" ref={(input) => { taskDeadline = input } } defaultChecked={props.check}/>
				<div className ="deadline-header">
					<p>Крайний срок:</p>
				</div>
				<div className="dtp-wrap">
					<DTP/>
				</div>
			</React.Fragment>
		)
	}

	const Complite = (props) => {

		let cp = false
		if ('complite' in Editor && !!Editor.complite) {
			cp = new Date(Number(Editor.complite))
		}

		return (
			<div className ="deadline-block">
				{
					!!cp ? 
						<p>Завершена: {cp.getDate()}.{(cp.getMonth()+1)}.{cp.getFullYear()} {cp.getHours()}:{cp.getMinutes()}</p>
					: <p>Задача не завершена</p>
				}

				{
					modeEditor > 1 ? 
					<div className='task-button--item'>
						<button 
							className='button button__edit' 
							onClick={props.action}
						>{
							!!cp ? 'Возобновить' : 'Завершить'
						}</button>
					</div>
					: ''
				}
			</div>
		)
	}




	let handleChange = (date) => {
		taskDeadlineTime = date
	}

	let sDate = ('deadline' in Editor && !!Editor.deadline) ? moment(new Date(Number(Editor.deadline))) : moment()

	class DTP extends React.Component {
		constructor (props) {
			super(props)
			this.state = {
				startDate: sDate
			};
			this.handleChange = this.handleChange.bind(this);
		}

		handleChange(date) {
			taskDeadlineTime = date
			this.setState({
				startDate: date
			});
		}

		render() {
			return <DatePicker
				selected={this.state.startDate}
				onChange={this.handleChange}
				showTimeSelect
				timeFormat="HH:mm"
				timeIntervals={15}
				dateFormat="DD.MM.YYYY HH:mm"
				timeCaption="Время"
			/>;
		}
	}

	const generateTask = () => {
		return {
			id: taskId,
			name: taskName.value != '' ? taskName.value : 'Task #'+taskId,
			description: taskDesc.value,
			priority: taskPriority.priority.value,
			complite: 'complite' in Editor ? Editor.complite : false
		}
	}

	const taskSave = () => {

		taskDeadlineTime == '' ? taskDeadlineTime = moment() : false
		let data = {
			
			...generateTask(),
			deadline: taskDeadline.checked ? Date.parse(taskDeadlineTime) : false,
		}


		"name" in Editor ? onUpdateTask(data) : onAddTask(data);
	}
	
	const taskEdit = () => {
		onWriteEditor()
	}
	const taskRepar = () => {
		onRepearEditor()
	}

	const taskCancel =() => {

		let newEditor = false
		Tasks.forEach((item) => {
			if (item.id == taskId) {
				newEditor = {...item} 
			}
		})

		onCancelEditor(newEditor)
	}

	const backToList = () => {
		history.push('/')
	}

	const deleteTask = () => {
		onDellTask(taskId)
	}

	const CheckedTask = () => {
		let data = {
			
			...generateTask(),
			deadline: taskDeadlineTime != '' ? taskDeadlineTime : false
		}
		const time = Date.now()
		onCheckEditor(data, time)

	}


	let isTaskName = 'name' in Editor ? Editor.name : ''
	let isTaskDesc = 'description' in Editor ? Editor.description : ''
	let isTaskDeadline = 'deadline' in Editor ? Editor.deadline : 0

	
	return (
		<div className="task-page">
			<h1>{
				('name' in Editor && Editor.name != '' && modeEditor <= 1) ? Editor.name :( modeEditor == 2 ? 'Новая задача' : 'Редактирование задачи')
			}</h1>
			<div className='task-form'>
			{ modeEditor > 1 ?
				
				<div className='task-form--block task-form--block__name'>
					<p>Название задачи</p>
					<Name name={Editor.name}/>
				</div>
				: ''
			}
				<div className='task-form--block task-form--block__desc'>
					{ modeEditor > 1 ?
						<React.Fragment>
							<p>Описание задачи</p>
							<Description data={Editor.description}/>
						</React.Fragment>
						: <div className='task-desc' > {

							('description' in Editor && Editor.description != '') ? Editor.description : <span className="task-desc__empty">У задачи нет описания</span>
							}
						</div>
					}
				</div>
				<div className='task-form--block task-form--block__priority'>
					<form ref={(form) => { taskPriority = form }} className='priority-list'>
						<div className='priority-header'>
							<p>Важность задачи:</p>
						</div>
						{
							 modeEditor > 1 ?

							 <Priority priority={Editor.priority} />

							:
							<div className={`task-item--priority task-item--priority__${Editor.priority}`}>
								<p>{Editor.priority}</p>
							</div>
						}
					</form>
				</div>
				<div className='task-form--block task-form--block__deadline'>
					<div className ="deadline-block">
						{
							modeEditor > 1 ?
							
							<Deadline check={Editor.deadline}/>
							: 
							!!dl ? 
								<p className={overdue}>Крайний срок: {dl.getDate()}.{(dl.getMonth()+1)}.{dl.getFullYear()} {dl.getHours()}:{dl.getMinutes()}</p>
							: <p>Задача без крайнего срока</p>
						}
					</div>
				</div>
				<div className='task-form--block task-form--block__deadline'>
					{modeEditor != 2 ?
					<Complite action={CheckedTask} complite={
						'complite' in Editor ? Editor.complite : false
					}/>: ''}
				</div>
				<div className='task-form--block task-form--block__buttons'>
					<div className='task-button--list'>
						{modeEditor > 1 ?

							<React.Fragment>
								<div className='task-button--item'>
									<button 
										className='button button__save' 
										onClick={taskSave}
									>Сохранить</button>
								</div>
								<div className='task-button--item'>
									<button 
										className='button button__clear'
										onClick={taskRepar}
									>Очистить
									</button>
								</div>
								<div className='task-button--item'>
									<button 
										className='button button__revert'
										onClick={taskCancel}
										>Отмена</button>
								</div>
							</React.Fragment>
							:
							<div className='task-button--item'>
								<button
									className='button button__edit'
									onClick={taskEdit}
								>Редактировать</button>
							</div>
						}
						{
							modeEditor != 2 ?
								<div className='task-button--item'>
									<button 
										className='button button__dell'
										onClick={deleteTask}
									>Удалить</button>
								</div>
								: ''
						}
						<div className='task-button--item'>
							<button 
								className='button button__back'
								onClick={backToList}
							>Вернуться к списку
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default connect(
	state => ({
		Tasks: [...state.Tasks],
		Editor: {...state.Editor},
	}),
	dispatch => ({
		onNewEditor: (id) => {
			dispatch( newEditor(id) )
		},
		onAddTask: (data) => {
			dispatch( addTask(data) )
		},
		onUpdateTask: (data) => {
			dispatch( updateTask(data) )
		},
		onDellTask: (id) => {
			dispatch(dellTask(id))
		},
		onReadEditor: (data) => {
			dispatch( readEditor(data))
		},
		onWriteEditor: () => {
			dispatch(writeEditor())
		},
		onRepearEditor: () => {
			dispatch(repearEditor())
		},
		onCancelEditor: (data) => {
			dispatch(cancelEditor(data))
		},
		onCheckEditor: (data, time) => {
			dispatch(checkEditor(data, time))
		}
	})
)(Task)