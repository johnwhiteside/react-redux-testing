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
There are two types of actions that are used in redux applications. There are action creators and async actions using [thunk](https://github.com/reduxjs/redux-thunk).

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
When testing async action creators you are basically testing to make sure that the correct action are called. This requires creating a mock store, dispatching the action, and checking to make sure the correct actions have been called.

##### Example:
```
export const fetchTodos = id => dispatch => {
	dispatch(fetchStart());

	return axios.get(TODOS_ENDPOINT, {
		id,
	})
		.then(response => {
			return dispatch(fetchSuccess(response.data));
		})
		.catch(error => {
			return dispatch(fetchFail(error));
		});
};
```

This action dispatchs three other actions fetchStart, fetchSuccess, and fetchFail. We need to make sure those actions are only dispatched when expected.

##### Test:
```
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('fetchTodos', () => {
	it('successfully fetches todos', done => {
		const mockState = {};
		const store = mockStore(mockState);
		const expectedActions = [
			actions.fetchStart(),
			actions.fetchSuccess(MOCK_SUCCESS.data),
		];
		store.dispatch(actions.fetchTodos(MOCK_IDS.success)).then(() => {
			expect(store.getActions()).toEqual(expectedActions);
			done();
		});
	});

	it('fails to fetch todos', done => {
		const mockState = {};
		const store = mockStore(mockState);
		const expectedActions = [
			actions.fetchStart(),
			actions.fetchFail(MOCK_ERROR),
		];
		store.dispatch(actions.fetchTodos(MOCK_IDS.fail)).then(() => {
			expect(store.getActions()).toEqual(expectedActions);
			done();
		});
	});
});
```
First we use configureMockStore to create a mock store and assign it to mockStore. This variable can then be used in each test with a mock state to dispatch the actions. If some action being dispatched is dependent on something being set in state then you need to mock it in the test. These tests also have an argument called done being passed in which is just a function you call to indicate that the async test is complete. In expectedActions I created an array using the action creators to create a mock of what store.getActions() returns.

### Reducer

### Components

#### Enzyme
[Enzyme](http://airbnb.io/enzyme/) is a library that allows you create a mock DOM and test whether the component behaves correctly.

With Enzyme you can do either [shallow rendering](http://airbnb.io/enzyme/docs/api/shallow.html) or [full DOM rendering](http://airbnb.io/enzyme/docs/api/mount.html). Shallow rendering is what I use probably 90% of the time, it allows you to keep your tests contained to just the functionality of the the component without having to worry about how other components interact with it. Full DOM rendering allows you to test how components in the DOM inteact with eachother.

#### Connected and Unconnected components
When working with redux you have two types of components, connected components and unconnected components. When testing a component that is connected its best to export the class so you can you focus the testing to just the functionality within scope of the component.
````
const mapStateToProps = state => ({
	items: getAllTodos(state),
});

const mapDispatchToProps = { completeToDo, setToDoToActive, deleteToDo, addToDo };

export class TodoList extends React.PureComponent {
	...etc
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
````

Notice I have two exports in the file, that allows me to use the component in a test file unconnected. Everything should be covered with unit tests so you shouldn't need to worry about whether a selector returns the correct thing, just pass the prop you are expecting to the component while testing. Its also best not to add logic within mapStateToProps or mapDispatchToProps. This keeps the logic contained to their respective files which makes everything easier to test. 

#### Example Component
 
Here is an example component using the Todo component which basically just renders a Todo item and handles what happens when you click the delete button and select the check box. This component is not connected to the redux store.
```
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
```

#### Example Test: 
The first thing I do is create a simple test that just makes sure the component renders without any issues
```
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
});
```
In this test i'm mocking a todo item and passing that item as a prop to the Todo component. I'm using the shallow util from enzyme to do a shallow render and then checking to make sure the component actually rendered by checking the length of the wrapper. Most of the time I don't pass any props into the component because the default props should prevent errors, but in this case todo is a required prop so I have to mock it.

This component also has two class methods handleDeleteClick and handleCheckboxClick, both of these need to be tested.
This is an example of how to test one of these class methods. 
```
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
```
In the mocked props I've added a todo and a mocked function for onDeleteClick. Using jest.fn() provides an easy way to test the component without needing to worry about the actual implementation. If onDeleteClick was an action in mapDispatchToProps this would allow me to test whether the function got called doesn't require creating a mock store and everything.
`wrapper.instance()` gets the instance of the root node being rendered and gives you access to class methods like handleDeleteClick. In this test i'm calling handleDeleteClick and then checking to see if my mock function was called or not. 

If you have some lifecylce methods that are supposed to trigger a function you can use this same approach to test whether that function will be called or not. Lets say you have a fetchData prop that gets called when the component mounts, all you would need to do is mount the component and check whether the mock function gets called.

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
