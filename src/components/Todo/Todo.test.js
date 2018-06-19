import React from 'react';
import Todo from './Todo';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

describe('Todo', () => {
	const mockTodo = {
		id: 1,
		label: 'Mock Todo',
		isComplete: false,
	}

	it('renders without error', () => {
		const props = {
			todo: mockTodo,
		}
		const wrapper = shallow(<Todo {...props} />);
		expect(wrapper.length).toEqual(1);
	});

	it('renders todo correctly', () => {
		const props = {
			todo: mockTodo,
		}
		const todo = renderer.create(<Todo {...props} />).toJSON();
		expect(todo).toMatchSnapshot();
	});

	describe('handleDeleteClick', () => {
		it('should call onDelete', () => {
			const props = {
				todo: mockTodo,
				onDeleteClick: jest.fn(),
			}
			const wrapper = shallow(<Todo {...props} />);
			wrapper.instance().handleDeleteClick();
			expect(props.onDeleteClick).toBeCalled();
		});

		it('doesn\'t error when onDeleteClick prop is undefined', () => {
			const props = {
				todo: mockTodo,
			}
			const wrapper = shallow(<Todo {...props} />);
			expect(wrapper.instance().handleDeleteClick).not.toThrow();
		});
	});

	describe('handleCheckboxClick', () => {
		it('calls onCheckboxClick', () => {
			const props = {
				todo: mockTodo,
				onCheckboxClick: jest.fn(),
			}
			const wrapper = shallow(<Todo {...props} />);
			wrapper.instance().handleCheckboxClick();
			expect(props.onCheckboxClick).toBeCalled();
		});

		it('doesn\'t error when onCheckboxClick prop is undefined', () => {
			const props = {
				todo: mockTodo,
			}
			const wrapper = shallow(<Todo {...props} />);
			expect(wrapper.instance().handleCheckboxClick).not.toThrow();
		});
	});
});
