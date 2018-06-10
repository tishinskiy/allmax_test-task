import React from 'react';
import { Link } from 'react-router-dom';

const Item = ( { data, checkFunc, delFunc } ) => {
	let overdue = ''
	let deadline = false
	let curent = 'Не завершена'

	if ('deadline' in data) {

		const dl = 'complite' in data && data.complite ? data.complite : Date.now()
		
		if (!!Number(data.deadline) && Number(data.deadline) < dl ) {
			overdue = ' task-list--item__overdue'
		}
		
		deadline = new Date(Number(data.deadline))
		deadline = `${deadline.getDate()}.${deadline.getMonth()+1}.${deadline.getFullYear()} ${deadline.getHours()}:${deadline.getMinutes()}`
	}

	let complited = ('complite' in data && data.complite) ? ' task-list--item__complited' : ''

	if ('complite' in data && data.complite) {
		curent = new Date(Number(data.complite))
		curent = `${curent.getDate()}.${curent.getMonth()+1}.${curent.getFullYear()} ${curent.getHours()}:${curent.getMinutes()}`
	}

	const checkTask = () => {
		checkFunc(data.id)
	}

	const delTask = () => {
		delFunc(data.id)
	}

	return (

		<div className={`task-list--item${overdue+complited}`}>
			<div className="task-item--check">
				<input 
					type="checkbox" 
					onChange={checkTask}
					defaultChecked={!!data.complite}
				/>
			</div>
			<div className={`task-item--priority task-item--priority__${data.priority}`}>
				<p>{data.priority}</p>
			</div>
			<div className="task-item--name">
				<Link to={`/task/${data.id}`}>{data.name}</Link>
			</div>
			{
				!!data.deadline ? (
					<div className="task-item--deadline">
						<p>{deadline}</p>
					</div>
				) : ('')
			}
			<div className="task-item--complite">
				<p>{curent}</p>
			</div>
			<div className="task-item--action">
				<button 
					className='button button__dell'
					onClick={delTask}
				>DEL</button>
			</div>
		</div>
	)
}

export default Item