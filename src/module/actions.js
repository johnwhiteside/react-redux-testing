import * as actionTypes from './action-types';

export const addToDo = label => {
	return {
		type: actionTypes.ADD_TODO,
		payload: {
			label,
		}
	}
};

export const completeToDo = itemId => ({
	type: actionTypes.COMPLETE_TODO,
	payload: {
		itemId,
	}
});

export const deleteToDo = itemId => ({
	type: actionTypes.DELETE_TODO,
	payload: {
		itemId,
	}
});

export const setToDoToActive = itemId => ({
	type: actionTypes.SET_TODO_TO_ACTIVE,
	payload: {
		itemId,
	}
});
