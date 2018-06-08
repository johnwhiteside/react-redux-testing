import React from 'react';
import PropTypes from 'prop-types';

class Todo extends React.PureComponent {
	handleDeleteClick(){
		const { todo, onDeleteClick } = this.props;
		onDeleteClick(todo);
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
				<span onClick={this.handleDeleteClick}> delete</span>
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
	onDeleteClick: PropTypes.func,
}

Todo.defaultProps = {
	onCheckboxClick: () => {},
	onDeleteClick: () => {},
}

export default Todo;
