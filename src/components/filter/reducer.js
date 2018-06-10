import {
	FILTER_CHECK,
	FILTER_UPDATE,
	FILTER_MARCER
} from './action'

const initState = {
	val: '',
	list: []
}

function Filter( state = initState, action ) {
	switch ( action.type ) {
		case FILTER_CHECK :
			return {
				val:action.val,
				list: action.val == 'all' ? [...action.list] : action.list.filter((item) => {
					if (item.priority == action.val) {
						return item
					}
				})
			}
			break

		case FILTER_UPDATE :
			return {
				val: state.val,
				list: state.val == 'all' ? [...action.data] : action.data.filter((item) => {
					if (item.priority == state.val) {
						return item
					}
				})
			}
			break

		case FILTER_MARCER :
			return {
				...state,
				marcer: 1
			}
			break

	default :
		return state
	}
}

export default Filter