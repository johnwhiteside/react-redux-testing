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
		const wrapper = mount(<TodoList {...props} />);
		expect(wrapper.find(Todo).length).toEqual(1);
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
	});
});
