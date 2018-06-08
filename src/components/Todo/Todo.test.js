import React from 'react';
import Todo from './Todo';
import { shallow } from 'enzyme';

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
	});
});
