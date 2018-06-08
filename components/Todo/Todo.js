import React from 'react';
import PropTypes from 'prop-types';

class Todo extends React.PureComponent {
	constructor(props) {
		super(props);
		this.handleCheckboxClick = this.handleCheckboxClick.bind(this);
	}

	handleCheckboxClick(){
		const { todo, onCheckboxClick } = this.props;
		onCheckboxClick(todo);
	}

	render(){
		const { todo } = this.props;
		return (
			<div>
				<input checked={todo.isComplete} type="checkbox" onChange={this.handleCheckboxClick} />
				<span>{todo.label}</span>
			</div>
		);
	}
};

Todo.propTypes = {
	todo: PropTypes.shape({
		isComplete: PropTypes.bool,
		label: PropTypes.string,
	}).isRequired,
	onCheckboxClick: PropTypes.func,
}

Todo.defaultProps = {
	onCheckboxClick: () => {},
}

export default Todo;
