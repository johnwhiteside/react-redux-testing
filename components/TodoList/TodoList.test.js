import React from 'react';
import { TodoList } from './TodoList';
import Todo from '../Todo';
import { shallow, mount } from 'enzyme';

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

describe('TodoList', () => {
	it('renders without error', () => {
		const wrapper = shallow(<TodoList />);
		expect(wrapper.length).toEqual(1);
	});

	it('renders with todo', () => {
		const props = {
			items: [ mockTodo ],
		};
		const wrapper = mount(<TodoList {...props} />);
		expect(wrapper.find(Todo).text()).toEqual(mockTodo.label);
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
