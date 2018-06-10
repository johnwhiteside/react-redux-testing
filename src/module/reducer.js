import * as actionTypes from './action-types';

let lastId = 0;

export const initialState = {
	todos: {},
	fetching: false,
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ADD_TODO:
			const todo = {
				id: lastId++,
				label: action.payload.label,
				isCompleted: false,
			};
			return {
				...state,
				todos: {
					...state.todos,
					[todo.id]: todo,
				},
			};

		case actionTypes.DELETE_TODO:
			const nextTodoState = {
				...state.todos,
			};
			delete nextTodoState[action.payload.itemId]
			return {
				...state,
				todos: nextTodoState,
			};

		case actionTypes.SET_TODO_TO_ACTIVE:
			return {
				...state,
				todos: {
					...state.todos,
					[action.payload.itemId]: {
						...state.todos[action.payload.itemId],
						isCompleted: false,
					}
				}
			}

		case actionTypes.COMPLETE_TODO:
			return {
				...state,
				todos: {
					...state.todos,
					[action.payload.itemId]: {
						...state.todos[action.payload.itemId],
						isCompleted: true,
					}
				},
			}

		case actionTypes.FETCH_START:
			return {
				...state,
				fetching: true,
			}

		case actionTypes.FETCH_FAIL:
			return {
				...state,
				fetching: false,
			}

		case actionTypes.FETCH_SUCCESS:
			return {
				...state,
				fetching: false,
				todos: {
					...state.todos,
					...action.payload.todos,
				},
			};

		default: return state;
	};
}

export default reducer;
