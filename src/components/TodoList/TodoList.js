import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllTodos } from '../../module/selectors';
import {
	completeToDo,
	setToDoToActive,
	deleteToDo,
	addToDo,
} from '../../module/actions';
import Todo from '../Todo';
import AddTodo from '../AddTodo';

const mapStateToProps = state => ({
	items: getAllTodos(state),
});

const mapDispatchToProps = { completeToDo, setToDoToActive, deleteToDo, addToDo };

export class TodoList extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = { value: '' }
		this.handleCheckboxClick = this.handleCheckboxClick.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.addTodo = this.addTodo.bind(this);
	}

	componentWillMount(){
		this.props.fetchTodos();
	}

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
	addToDo: () => {},
	fetchTodos: () => {},
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
