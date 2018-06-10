import createHistory from "history/createBrowserHistory"

const history = createHistory()

const ROUTING = "ROUTING"


export const redirect = store => next => action => { 
	if (action.type === ROUTING) {
		history[action.data.method](action.data.nextUrl)
	}

	return next(action)
}