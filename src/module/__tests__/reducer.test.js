import * as actions from '../actions';
import reducer, { initialState } from '../reducer';
import TodoState  from '../../factories/TodoState';
import Todo from '../../factories/Todo';
import axios from 'axios';
import { TODOS_ENDPOINT } from '../constants';
import { data as todoData } from '../__mocks__/todos.json';
import keyBy from 'lodash/keyBy';

describe('reducer', () => {
	it('handle default', () => {
		expect(reducer(undefined, {})).toEqual(initialState);
	});

	it('handle ADD_TODO', () => {
		const mockTodo = Todo.build();
		const expectedResult = TodoState.build({ todos: keyBy([mockTodo], 'id') });
		expect(reducer(undefined, actions.addToDo(mockTodo.label))).toEqual(expectedResult);
	});

	it('handle DELETE_TODO', () => {
		const mockTodo = Todo.build();
		const mockState = TodoState.build({ todos: keyBy([mockTodo], 'id') });
		const expectedResult = TodoState.build({ todos: {} });
		expect(reducer(mockState, actions.deleteToDo(mockTodo.id))).toEqual(expectedResult);
	});

	it('handle SET_TODO_TO_ACTIVE', () => {
		const mockTodo = Todo.build({ isCompleted: true });
		const mockTodoActive = { ...mockTodo, isCompleted: false };
		const mockState = TodoState.build({ todos: keyBy([mockTodo], 'id') });
		const expectedResult = TodoState.build({ todos: keyBy([mockTodoActive], 'id') });
		expect(reducer(mockState, actions.setToDoToActive(mockTodo.id))).toEqual(expectedResult);
	});

	it('handle COMPLETE_TODO', () => {
		const mockTodo = Todo.build({ isCompleted: false });
		const mockTodoCompleted = { ...mockTodo, isCompleted: true };
		const mockState = TodoState.build({ todos: keyBy([mockTodo], 'id') });
		const expectedResult = TodoState.build({ todos: keyBy([mockTodoCompleted], 'id') });
		expect(reducer(mockState, actions.completeToDo(mockTodo.id))).toEqual(expectedResult);
	});

	it('handle FETCH_START', () => {
		const mockState = TodoState.build({ fetching: false });
		const expectedResult = TodoState.build({ fetching: true });
		expect(reducer(mockState, actions.fetchStart())).toEqual(expectedResult);
	});

	it('handle FETCH_FAIL', () => {
		const mockState = TodoState.build({ fetching: true });
		const expectedResult = TodoState.build({ fetching: false });
		expect(reducer(mockState, actions.fetchFail())).toEqual(expectedResult);
	});

	it('handle FETCH_SUCCESS', () => {
		const mockState = TodoState.build({ fetching: true });
		const todos = keyBy(todoData.todos, 'id');
		const expectedResult = TodoState.build({ fetching: false, todos });
		expect(reducer(mockState, actions.fetchSuccess(todoData.todos))).toEqual(expectedResult);
	});
});
