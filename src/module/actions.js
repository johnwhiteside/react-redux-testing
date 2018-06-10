import axios from 'axios';
import * as actionTypes from './action-types';
import { TODOS_ENDPOINT } from './constants';

export const addToDo = label => ({
	type: actionTypes.ADD_TODO,
	payload: {
		label,
	}
});

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

export const fetchStart = () => ({
	type: actionTypes.FETCH_START,
});

export const fetchSuccess = todos => ({
	type: actionTypes.FETCH_SUCCESS,
	payload: {
		todos,
	},
});

export const fetchFail = error => ({
	type: actionTypes.FETCH_FAIL,
	payload: {
		error,
	},
});

export const fetchTodos = id => dispatch => {
	dispatch(fetchStart());

	return axios.get(TODOS_ENDPOINT, {
		id,
	})
		.then(response => {
			return dispatch(fetchSuccess(response.data));
		})
		.catch(error => {
			return dispatch(fetchFail(error));
		});
};
