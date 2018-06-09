import React from 'react';
import AddTodo from './AddTodo';
import { shallow } from 'enzyme';

describe('AddTodo', () => {
	const mockValue = '';
	const mockEvent = {
		target: { value: mockValue },
		preventDefault: jest.fn(),
	};

	it('renders without error', () => {
		const wrapper = shallow(<AddTodo />);
		expect(wrapper.length).toEqual(1);
	});

	describe('handleChange', () => {
		it('should set value in component state', () => {
			const wrapper = shallow(<AddTodo />);
			wrapper.instance().handleChange(mockEvent);
			expect(wrapper.state().value).toEqual(mockValue);
		})
	});

	describe('handleSubmit', () => {
		it('should call onSubmit', () => {
			const props = {
				onSubmit: jest.fn(),
			};
			const wrapper = shallow(<AddTodo {...props} />);
			wrapper.instance().handleSubmit(mockEvent);
			expect(mockEvent.preventDefault).toBeCalled();
			expect(props.onSubmit).toBeCalled();
		});

		it('doesn\'t error when onSubmit is undefined', () => {
			const props = {
				onSubmit: undefined,
			}
			const wrapper = shallow(<AddTodo {...props} />);
			expect(() => wrapper.instance().handleSubmit(mockEvent)).not.toThrow();
		});
	});
});
