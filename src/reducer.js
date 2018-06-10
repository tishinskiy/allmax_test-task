import { combineReducers } from 'redux'
import Tasks from './components/list/reducer'
import Editor from './components/task/reducer'
import Filter from './components/filter/reducer'

export default combineReducers({
	Tasks,
	Editor,
	Filter
})