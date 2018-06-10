import { 
	TASK_UPDATE,
	TASK_CHECK, 
	TASK_ADD,
	TASK_DEL
} from "./action"

function Tasks( state = [], action ) {
	switch ( action.type ) {
		
		case TASK_ADD :
			return [...state, action.data]

			break

		case TASK_UPDATE :
			return state.map((item) => {

				return item.id == action.data.id ? {...action.data} : {...item}
			})

			break

		case TASK_CHECK :
			return state.map((item) => (
				item.id == action.id ? {
						...item,
						complite: ('complite' in item && item.complite) ? false : action.time
				}:{...item}
			))

			break

		case TASK_DEL :
			return state.filter((item) => (item.id != action.id)
			)

			break

	default :
		return state
	}
}

export default Tasks