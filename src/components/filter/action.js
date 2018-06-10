export const FILTER_CHECK = 'FILTER_CHECK'
export const FILTER_UPDATE = 'FILTER_UPDATE'
export const FILTER_MARCER = 'FILTER_MARCER'

export const checkFilter = (val,list) => ({
	type: FILTER_CHECK,
	val: val,
	list: list
})

export const updateFilter = (data) => ({
	type:FILTER_UPDATE,
	data: data
})
export const marcerFilter = () => ({
	type:FILTER_MARCER,
})