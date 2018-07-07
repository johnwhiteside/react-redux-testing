import * as selectors from '../selectors';
import TodoState from '../../factories/TodoState';
import Todo from '../../factories/Todo';
import keyBy from 'lodash/keyBy';

describe('selectors', () => {
	const mockTodo = Todo.build({ isCompleted: true });
	const mockTodo2 = Todo.build({ isCompleted: true });
	const mockTodo3 = Todo.build({ isCompleted: false });
	const mockTodos = [mockTodo, mockTodo2, mockTodo3];
	const mockState = TodoState.build({ fetching: false, todos: keyBy(mockTodos, 'id') })

	describe('getAllTodos', () => {
		it('should return all todos', () => {
			const expectedResult = Object.values(mockState.todos);
			expect(selectors.getAllTodos(mockState)).toEqual(expectedResult);
		});
	});

	describe('selectCompletedTodos', () => {
		it('Should return todos that are completed', () => {
			const expectedResult = Object.values(mockState.todos).filter(todo => todo.isCompleted);
			expect(selectors.selectCompletedTodos(mockState)).toEqual(expectedResult);
		});
	});

	describe('selectUnCompletedTodos', () => {
		it('Should return todos that are not completed', () => {
			const expectedResult = Object.values(mockState.todos).filter(todo => !todo.isCompleted);
			expect(selectors.selectUnCompletedTodos(mockState)).toEqual(expectedResult);
		});
	})
});
