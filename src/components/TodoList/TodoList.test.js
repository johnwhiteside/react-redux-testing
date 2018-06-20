import React from 'react';
import { TodoList } from './TodoList';
import Todo from '../Todo';
import { shallow, mount } from 'enzyme';

describe('TodoList', () => {
	const mockTodo = {
		id: 1,
		label: 'Mock Todo',
		isComplete: false,
	}

	const mockTodo2 = {
		id: 2,
		label: 'Mock Todo 2',
		isComplete: true,
	}

	it('renders without error', () => {
		const wrapper = shallow(<TodoList />);
		expect(wrapper.length).toEqual(1);
	});

	it('renders with todo', () => {
		const props = {
			items: [ mockTodo ],
		};
		const wrapper = shallow(<TodoList {...props} />);
		expect(wrapper.find(Todo).length).toEqual(1);
	});

	describe('componentWillMount', () => {
		it('should call fetchTodos when the component mounts', () => {
			const props = {
				fetchTodos: jest.fn(),
			};
			const wrapper = shallow(<TodoList {...props} />);
			expect(props.fetchTodos).toBeCalled();
		});
	});

	describe('handleDelete', () => {
		it('should call deleteToDo', () => {
			const props = {
				items: [ mockTodo ],
				deleteToDo: jest.fn(),
			};
			const wrapper = shallow(<TodoList {...props}/>);
			wrapper.instance().handleDelete(mockTodo);
			expect(props.deleteToDo).toBeCalled();
		});

		it('doesn\'t error when deleteToDo is undefined', () => {
			const props = {
				todo: mockTodo,
			}
			const wrapper = shallow(<TodoList {...props} />);
			expect(() => wrapper.instance().handleDelete(mockTodo)).not.toThrow();
		});
	});

	describe('addTodo', () => {
		it('should call addTodo', () => {
			const props = {
				items: [ mockTodo ],
				addToDo: jest.fn(),
			};
			const wrapper = shallow(<TodoList {...props}/>);
			wrapper.instance().addTodo('Todo');
			expect(props.addToDo).toBeCalled();
		});

		it('doesn\'t error when addToDo is undefined', () => {
			const props = {
				todo: mockTodo,
			}
			const wrapper = shallow(<TodoList {...props} />);
			expect(() => wrapper.instance().addTodo(mockTodo)).not.toThrow();
		});
	});

	describe('handleCheckboxClick', () => {
		it('should call completeToDo', () => {
			const props = {
				items: [ mockTodo ],
				completeToDo: jest.fn(),
				setToDoToActive: jest.fn(),
			};
			const wrapper = shallow(<TodoList {...props}/>);
			wrapper.instance().handleCheckboxClick(mockTodo);
			expect(props.completeToDo).toBeCalled();
			expect(props.setToDoToActive).not.toBeCalled();
		});

		it('doesn\'t error when completeToDo is undefined', () => {
			const props = {
				todo: mockTodo,
			}
			const wrapper = shallow(<TodoList {...props} />);
			expect(() => wrapper.instance().handleCheckboxClick(mockTodo)).not.toThrow();
		});

		it('should call setToDoToActive', () => {
			const props = {
				items: [ mockTodo ],
				completeToDo: jest.fn(),
				setToDoToActive: jest.fn(),
			};
			const wrapper = shallow(<TodoList {...props}/>);
			wrapper.instance().handleCheckboxClick(mockTodo2);
			expect(props.completeToDo).not.toBeCalled();
			expect(props.setToDoToActive).toBeCalled();
		});

		it('doesn\'t error when setToDoToActive is undefined', () => {
			const props = {
				todo: mockTodo,
			}
			const wrapper = shallow(<TodoList {...props} />);
			expect(() => wrapper.instance().handleCheckboxClick(mockTodo2)).not.toThrow();
		});
	});
});
