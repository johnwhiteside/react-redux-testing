# React Redux Testing
This is a simple todo list application to demonstrate how to unit test react-redux applications using jest.

## Getting Started
Run `yarn install` to install all dependencies

## Scripts
#### `yarn start`
Runs the application, open [http://localhost:8080](http://localhost:8080) to view the application in a browser
#### `yarn test`
Runs all unit tests
#### `yarn test:coverage`
Runs all unit tests and creates a coverage report

## Testing 

### Actions
There are two types of actions that are used this project, there are action creators and async actions using [thunk](https://github.com/reduxjs/redux-thunk).

#### Synchronous Action Creators
Action creators are a simple function that returns an action object. I have found in most cases that its not neccisarily important to test action creators because when you test the reducer you use action creators to create the action that gets ran through the reducer function. If the action creator is returning something invalid then the reducer tests should fail. Even though I generally don't test these I have included an example below to show how these can be tested. 

Here is an action creator for adding a todo:
```
export const addToDo = label => ({
	type: actionTypes.ADD_TODO,
	payload: {
		label,
	}
});
```
Action can creators can be tested like this.
```
it('should return action to create todo', () => {
	const label = 'Test Todo';
	const expectedAction = {
		type: actionTypes.ADD_TODO,
		payload: {
			label,
		}
	};
	expect(actions.addToDo(label)).toEqual(expectedAction);
});
```
#### Async Action Creators

### Reducer

### Components

#### Enzyme
[Enzyme](http://airbnb.io/enzyme/) is a library that allows you create a mock DOM and test whether the component behaves correctly.

With Enzyme you can do either [shallow rendering](http://airbnb.io/enzyme/docs/api/shallow.html) or [full DOM rendering](http://airbnb.io/enzyme/docs/api/mount.html). Shallow rendering is what I use probably 90% of the time, it allows you to keep your tests contained to just the functionality of the the component without having to worry about how other components interact with it. Full DOM rendering allows you to test how components in the DOM inteact with eachother.

#### Example Component
In this project there is a Todo component which basically just renders a Todo item and handles what happens when you click the delete button and select the check box. It looks like this:
```
class Todo extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = { value: '' }
		this.handleDeleteClick = this.handleDeleteClick.bind(this);
		this.handleCheckboxClick = this.handleCheckboxClick.bind(this);
	}

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
```

#### Example Test: 
The first thing I do is create a simple test that just makes sure the component renders without any issues
```
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
});
```

### Selectors
In this project I am using a library called [reselect](https://github.com/reduxjs/reselect) to create selectors. Testing selectors is pretty easy, all you need to do is mock the state, pass the mocked state into the selector, and evaluate the output.

Here is a selector for getting all todo items:
```
export const getTodos = state => state.todos;

export const getAllTodos = createSelector(
	[getTodos],
	todos => Object.values(todos),
);
```
I created a mock for the data like this:
```
	const mockTodo = {
		id: 1,
		label: 'Mock Todo',
		isCompleted: false,
	};

	const mockTodo2 = {
		id: 2,
		label: 'Mock Todo 2',
		isCompleted: true,
	};

	const mockTodo3 = {
		id: 3,
		label: 'Mock Todo 3',
		isCompleted: true,
	};

	const mockState = {
		todos: {
			[mockTodo.id]: mockTodo,
			[mockTodo2.id]: mockTodo2,
			[mockTodo3.id]: mockTodo3,
		}
	}
```

The test looks like this:
```
	describe('getAllTodos', () => {
		it('should return all todos', () => {
			const expectResult = [ mockTodo, mockTodo2, mockTodo3 ];
			expect(selectors.getAllTodos(mockState)).toEqual(expectResult);
		});
	});
```

I set the expected result to be an array of all the mocked todo items, pass the mocked data into the selector, and expect the return from the selector to match my expected result.
