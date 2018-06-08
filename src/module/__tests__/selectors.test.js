import * as selectors from '../selectors';

describe('selectors', () => {
	const mockTodo = {
		id: 1,
		label: 'Mock Todo',
		isCompleted: false,
	};

	const mockTodo2 = {
		id: 2,
		label: 'Mock Todo 2',
		isCompleted: true,
	};

	const mockTodo3 = {
		id: 3,
		label: 'Mock Todo 3',
		isCompleted: true,
	};

	const mockState = {
		todos: {
			[mockTodo.id]: mockTodo,
			[mockTodo2.id]: mockTodo2,
			[mockTodo3.id]: mockTodo3,
		}
	}

	describe('getAllTodos', () => {
		it('should return all todos', () => {
			const expectResult = [ mockTodo, mockTodo2, mockTodo3 ];
			expect(selectors.selectCompletedTodos(mockState)).toEqual(expectResult);
		});
	});

	describe('selectCompletedTodos', () => {
		it('Should return todos that are completed', () => {
			const expectResult = [ mockTodo2, mockTodo3 ];
			expect(selectors.selectCompletedTodos(mockState)).toEqual(expectResult);
		});
	});

	describe('selectUnCompletedTodos', () => {
		it('Should return todos that are not completed', () => {
			const expectResult = [ mockTodo ];
			expect(selectors.selectUnCompletedTodos(mockState)).toEqual(expectResult);
		});
	})
});
