import * as actions from '../actions';
import reducer from '../reducer';

describe('reducer', () => {
	const label = 'Test Todo';
	const mockTodo = {
		id: 0,
		label,
		isCompleted: false,
	};

	it('handle default', () => {
		expect(reducer(undefined, {})).toEqual({});
	});

	it('handle ADD_TODO', () => {
		const expectResult = {
			[mockTodo.id]: mockTodo,
		}
		expect(reducer(undefined, actions.addToDo(label))).toEqual(expectResult);
	});

	it('handle DELETE_TODO', () => {
		const mockState = {
			[mockTodo.id]: mockTodo,
		};
		expect(reducer(mockState, actions.deleteToDo(mockTodo.id))).toEqual({});
	});

	it('handle SET_TODO_TO_ACTIVE', () => {
		const mockState = {
			[mockTodo.id]: mockTodo,
		};
		const expectResult = {
			[mockTodo.id]: {
				...mockTodo,
				isCompleted: false,
			},
		};
		expect(reducer(mockState, actions.completeToDo(mockTodo.id))).toEqual(expectResult);
	});

	it('handle COMPLETE_TODO', () => {
		const mockState = {
			[mockTodo.id]: {
				...mockTodo,
				isCompleted: false,
			},
		};
		const expectResult = {
			[mockTodo.id]: {
				...mockTodo,
				isCompleted: false,
			},
		};
		expect(reducer(mockState, actions.completeToDo(mockTodo.id))).toEqual(expectResult);
	});
});
