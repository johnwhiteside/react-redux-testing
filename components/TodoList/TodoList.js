import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTodos } from '../../module/selectors';
import {
	completeToDo,
	setToDoToActive,
	deleteToDo,
	addToDo,
} from '../../module/actions';
import Todo from '../Todo';
import AddTodo from '../AddTodo';

const mapStateToProps = state => {
	items: getTodos(state);
};

const mapDispatchToProps = { completeToDo, setToDoToActive, deleteToDo, addToDo };

export class TodoList extends React.PureComponent {

	handleCheckboxClick(todo) {
		const { completeToDo, setToDoToActive } = this.props;
		return todo.isComplete ? setToDoToActive(todo.id) : completeToDo(todo.id);
	}

	handleDelete(todo){
		const { deleteToDo } = this.props;
		deleteToDo(todo.id);
	}

	renderTodo(todo) {
		const todoProps = {
			todo,
			onCheckboxClick: this.handleCheckboxClick,
			onDeleteClick: this.handleDelete,
		};
		return <Todo key={`todo-${todo.id}`} {...todoProps} />
	}

	addTodo(label){
		const { addToDo } = this.props;
		addToDo(label);
	}

	render() {
		const { items } = this.props;
		return (
			<div>
				<AddTodo onSubmit={this.addTodo} />
				{items.map(item => this.renderTodo(item))}
			</div>
		);
	}
}

TodoList.propTypes = {
	items: PropTypes.array,
	completeToDo: PropTypes.func,
	setToDoToActive: PropTypes.func,
	deleteToDo: PropTypes.func,
};

TodoList.defaultProps = {
	items: [],
	completeToDo: () => {},
	setToDoToActive: () => {},
	deleteToDo: () => {},
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
