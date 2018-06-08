import React from 'react';
import Todo from './Todo';
import { shallow } from 'enzyme';

const mockTodo = {
	id: 1,
	label: 'Mock Todo',
	isComplete: false,
}

describe('Todo', () => {
	it('renders without error', () => {
		const props = {
			todo: mockTodo,
		}
		const wrapper = shallow(<Todo {...props} />);
		expect(wrapper.length).toEqual(1);
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
