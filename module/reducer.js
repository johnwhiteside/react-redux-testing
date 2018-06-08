import * as actionTypes from './action-types';

let lastId = 0;

const reducer = (state = {}, action) => {
	switch (action.type) {
		case actionTypes.ADD_TODO:
			const todo = {
				id: lastId++,
				label: action.payload.label,
				isCompleted: false,
			};
			return {
				...state,
				[todo.id]: todo,
			};

		case actionTypes.DELETE_TODO:
			const nextState = { ...state };
			delete nextState[action.payload.itemId]
			return nextState;

		case actionTypes.SET_TODO_TO_ACTIVE:
			return {
				...state,
				[action.payload.itemId]: {
					...state[action.payload.itemId],
					isCompleted: true,
				}
			}

		case actionTypes.COMPLETE_TODO:
			return {
				...state,
				[action.payload.itemId]: {
					...state[action.payload.itemId],
					isCompleted: false,
				}
			}
		default: return state;
	};
}

export default reducer;
