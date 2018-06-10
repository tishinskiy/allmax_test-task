import { 
	EDITOR_CANCEL, 
	EDITOR_NEW, 
	EDITOR_READ, 
	EDITOR_WRITE, 
	EDITOR_CLEAR,
	EDITOR_REPEAR,
	EDITOR_CHECK
} from './action'

function Editor( state = [], action ) {
	switch ( action.type ) {

		case EDITOR_NEW :
			let newEditor = {
				id: action.id,
				mode: 2,
				priority: 'normal',
				complited: false

			}
			return {
				...newEditor
			}
			
			break

		case EDITOR_REPEAR :
			return {
				...state,
				priority: 'normal',
				name: '',
				description: '',
				deadline: false,
				complited: false
			}
			
			break

		case EDITOR_CLEAR :
			return {}
			break

		case EDITOR_READ :
			return {
				...action.data,
				mode: 1,
			}
			break

		case EDITOR_WRITE :
			return {
				...state,
				mode: 3,
			}
			break

		case EDITOR_CANCEL :
			return {
				...action.data,
				mode: 1,
			}
			break

		case EDITOR_CHECK :
			return {
				...action.data,
				complite: ('complite' in state && state.complite) ? false : action.time,
				mode: 3
			}
			break

	default :
		return state
	}
}

export default Editor