import React from 'react';
import PropTypes from 'prop-types';

class AddTodo extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = { value: '' }
	}

	handleChange(e){
		this.setState({ value: e.target.value });
	}

	handleSubmit(e){
		const { onSubmit } = this.props;
		e.preventDefault();
		onSubmit(this.state.value);
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<input onChange={this.handleChange} name="label" type="text" />
				<input type="submit" value="Add To List" />
			</form>
		);
	}
}

AddTodo.propTypes = {
	onSubmit: PropTypes.func,
}

AddTodo.defaultProps = {
	onSubmit: () => {},
}

export default AddTodo;
