import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
	MOCK_IDS,
	MOCK_SUCCESS,
	MOCK_ERROR,
} from '../__mocks__/axios';

import * as actions from '../actions';
import * as actionTypes from '../action-types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares); // This returns a function we can use to mock the store

describe('actions', () => {
	it('should return action to create todo', () => {
		const label = 'Test Todo';
		const expectedAction = {
			type: actionTypes.ADD_TODO,
			payload: {
				label,
			}
		};
		expect(actions.addToDo(label)).toEqual(expectedAction);
	});

	it('should return action to complete todo', () => {
		const itemId = 123;
		const expectedAction = {
			type: actionTypes.COMPLETE_TODO,
			payload: {
				itemId,
			}
		};
		expect(actions.completeToDo(itemId)).toEqual(expectedAction);
	});

	it('should return action to delete todo', () => {
		const itemId = 123;
		const expectedAction = {
			type: actionTypes.DELETE_TODO,
			payload: {
				itemId,
			}
		};
		expect(actions.deleteToDo(itemId)).toEqual(expectedAction);
	});

	it('should return action to set todo to active', () => {
		const itemId = 123;
		const expectedAction = {
			type: actionTypes.SET_TODO_TO_ACTIVE,
			payload: {
				itemId,
			}
		};
		expect(actions.setToDoToActive(itemId)).toEqual(expectedAction);
	});

	describe('fetchTodos', () => {
		it('successfully fetches todos', done => {
			const mockState = {};
			const store = mockStore(mockState);
			const expectedActions = [
				actions.fetchStart(),
				actions.fetchSuccess(MOCK_SUCCESS.data),
			];
			store.dispatch(actions.fetchTodos(MOCK_IDS.success)).then(() => {
				expect(store.getActions()).toEqual(expectedActions);
				done();
			});
		});

		it('fails to fetch todos', done => {
			const mockState = {};
			const store = mockStore(mockState);
			const expectedActions = [
				actions.fetchStart(),
				actions.fetchFail(MOCK_ERROR),
			];
			store.dispatch(actions.fetchTodos(MOCK_IDS.fail)).then(() => {
				expect(store.getActions()).toEqual(expectedActions);
				done();
			});
		});
	});
});
