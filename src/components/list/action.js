import history from '../../history'

export const TASKS_READ = "TASKS_READ"
export const TASK_UPDATE = "TASK_UPDATE"
export const TASK_CHECK = "TASK_CHECK"
export const TASK_ADD = "TASK_ADD"
export const TASKS_ADD = "TASKS_ADD"
export const TASK_DEL = "TASK_DELL"

export const readTasks = (data) => ({
	type: TASKS_READ
})

export const addTasks = (data) => ({
	type: TASKS_ADD
})

export const updateTask = (data) => {

	history.push('/')
	return {
		type: TASK_UPDATE,
		data: data
	}
}
export const addTask = (data) => {

	history.push('/')
	return {
		type: TASK_ADD,
		data: data
	}
}

export const checkTask = (id, time) => ({
	type: TASK_CHECK,
	id: id,
	time: time
})
export const dellTask = (id) => {
	history.push('/')
	return {
		type: TASK_DEL,
		id: id
	}
}

