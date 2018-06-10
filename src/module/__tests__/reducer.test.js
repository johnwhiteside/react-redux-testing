import * as actions from '../actions';
import reducer, { initialState } from '../reducer';

describe('reducer', () => {
	const label = 'Test Todo';
	const mockTodo = {
		id: 0,
		label,
		isCompleted: false,
	};

	it('handle default', () => {
		expect(reducer(undefined, {})).toEqual(initialState);
	});

	it('handle ADD_TODO', () => {
		const expectedResult = {
			fetching: false,
			todos: {
				[mockTodo.id]: mockTodo,
			},
		}
		expect(reducer(undefined, actions.addToDo(label))).toEqual(expectedResult);
	});

	it('handle DELETE_TODO', () => {
		const mockState = {
			fetching: false,
			todos: {
				[mockTodo.id]: mockTodo,
			},
		};
		const expectedResult = {
			fetching: false,
			todos: {}
		};
		expect(reducer(mockState, actions.deleteToDo(mockTodo.id))).toEqual(expectedResult);
	});

	it('handle SET_TODO_TO_ACTIVE', () => {
		const mockState = {
			fetching: false,
			todos: {
				[mockTodo.id]: {
					...mockTodo,
					isCompleted: true,
				},
			}
		};
		const expectedResult = {
			fetching: false,
			todos: {
				[mockTodo.id]: {
					...mockTodo,
					isCompleted: false,
				},
			},
		};
		expect(reducer(mockState, actions.setToDoToActive(mockTodo.id))).toEqual(expectedResult);
	});

	it('handle COMPLETE_TODO', () => {
		const mockState = {
			fetching: false,
			todos: {
				[mockTodo.id]: {
					...mockTodo,
					isCompleted: false,
				},
			},
		};
		const expectedResult = {
			fetching: false,
			todos: {
				[mockTodo.id]: {
					...mockTodo,
					isCompleted: true,
				},
			},
		};
		expect(reducer(mockState, actions.completeToDo(mockTodo.id))).toEqual(expectedResult);
	});

	it('handle FETCH_START', () => {
		const mockState = { fetching: false };
		const expectedResult = { fetching: true };
		expect(reducer(mockState, actions.fetchStart())).toEqual(expectedResult);
	});

	it('handle FETCH_FAIL', () => {
		const mockState = { fetching: true };
		const expectedResult = { fetching: false };
		expect(reducer(mockState, actions.fetchFail())).toEqual(expectedResult);
	});

	it('handle FETCH_SUCCESS', () => {
		const mockState = {
			fetching: true,
			todos: {},
		};
		const todos = {
			[mockTodo.id]: mockTodo,
		};
		const expectedResult = {
			fetching: false,
			todos,
		};
		expect(reducer(mockState, actions.fetchSuccess(todos))).toEqual(expectedResult);
	});
});
