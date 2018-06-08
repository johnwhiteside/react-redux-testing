import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTodos } from '../../module/selectors';
import {
	completeToDo,
	setToDoToActive,
} from '../../module/actions';
import Todo from '../Todo';

const mapStateToProps = state => {
	items: getTodos(state);
};

const mapDispatchToProps = { completeToDo, setToDoToActive }

export class TodoList extends React.PureComponent {
	constructor(props) {
		super(props);
		this.handleCheckboxClick = this.handleCheckboxClick.bind(this);
	}

	handleCheckboxClick(todo) {
		const { completeToDo, setToDoToActive } = this.props;
		return todo.isComplete ? setToDoToActive() : completeToDo();
	}

	renderTodo(todo) {
		const todoProps = {
			todo,
			onCheckboxClick: this.handleCheckboxClick,
		};
		return <Todo key={`todo-${todo.id}`} {...todoProps} />
	}

	render() {
		const { items } = this.props;
		return <div>{items.map(item => this.renderTodo(item))}</div>;
	}
}

TodoList.propTypes = {
	items: PropTypes.string,
	completeToDo: PropTypes.func,
	setToDoToActive: PropTypes.func,
};

TodoList.defaultProps = {
	items: [],
	completeToDo: () => {},
	setToDoToActive: () => {},
}

export default connect(mapStateToProps)(TodoList);
