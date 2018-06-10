import history from '../../history'

export const EDITOR_CANCEL = "EDITOR_CANCEL"
export const EDITOR_NEW = "EDITOR_NEW"
export const EDITOR_READ = "EDITOR_READ"
export const EDITOR_WRITE = "EDITOR_WRITE"
export const EDITOR_CLEAR = "EDITOR_CLEAR"
export const EDITOR_REPEAR = "EDITOR_REPEAR"
export const EDITOR_CHECK = "EDITOR_CHECK"

export const newEditor = ( id ) => {
	history.push('/task/'+id)
	return ({
		type: EDITOR_NEW,
		data: id
	})
}

export const readEditor = ( data ) => ({
	type: EDITOR_READ,
	data: data
})

export const writeEditor = () => ({
	type: EDITOR_WRITE,
})
export const clearEditor = () => {
	return ({
		type: EDITOR_CLEAR,
	})
}
export const repearEditor = () => {
	return ({
		type: EDITOR_REPEAR,
	})
}
export const cancelEditor = ( data ) => {
	return ({
		type: EDITOR_CANCEL,
		data: data
	})
}
export const checkEditor = ( data, time ) => {
	return ({
		type: EDITOR_CHECK,
		data: data,
		time: time
	})
}
