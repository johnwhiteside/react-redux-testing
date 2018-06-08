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
			todos: {
				[mockTodo.id]: mockTodo,
			},
		}
		expect(reducer(undefined, actions.addToDo(label))).toEqual(expectedResult);
	});

	it('handle DELETE_TODO', () => {
		const mockState = {
			todos: {
				[mockTodo.id]: mockTodo,
			},
		};
		const expectedResult = { todos: {} };
		expect(reducer(mockState, actions.deleteToDo(mockTodo.id))).toEqual(expectedResult);
	});

	it('handle SET_TODO_TO_ACTIVE', () => {
		const mockState = {
			todos: {
				[mockTodo.id]: {
					...mockTodo,
					isCompleted: true,
				},
			}
		};
		const expectedResult = {
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
			todos: {
				[mockTodo.id]: {
					...mockTodo,
					isCompleted: false,
				},
			},
		};
		const expectedResult = {
			todos: {
				[mockTodo.id]: {
					...mockTodo,
					isCompleted: true,
				},
			},
		};
		expect(reducer(mockState, actions.completeToDo(mockTodo.id))).toEqual(expectedResult);
	});
});
