# React Redux Testing
This is a simple todo list application to demonstrate how to unit test React/Redux applications using [Jest](https://facebook.github.io/jest/).

## Getting Started
Run `yarn install` to install all dependencies

## Scripts
#### `yarn start`
Runs the application, open [http://localhost:8080](http://localhost:8080) to view the application in a browser
#### `yarn test`
Runs all unit tests
#### `yarn test:coverage`
Runs all unit tests and creates a coverage report
#### `yarn test:updateSnapshot`
Runs unit tests and updates snapshots

## Unit Testing
In a React/Redux application there are several different pieces involved in making something happens and it's important that each of those are covered by tests. Each new feature in an application should be accompanied by tests and every bug fix should include some tests to ensure the bug is not reintroduced at a later time. It also helps the next developer who works on the code to understand how the code should function especially in cases where the code is more complex.

### Code Coverage
This project includes a script for creating a code coverage report. This report is helpful for making sure everything is fully tested. Its best for developers strive towards 100% coverage, but in some cases it may not be realistic and your coverage could be in the 90% range. Its not bad to have less than 100% because you may have some places where it just doesn't make sense to test that part of the code. It's important to make sure your test are providing value and not just giving you code coverage.

### Actions
There are two types of actions that are used in redux applications, synchronous action creators and async action creators. When testing synchronous action creators we want to make sure the correct action is returned, when testing async actions we want to make sure the correct actions are dispatched.

#### Synchronous Action Creators
I have found in most cases that it's not necessarily important to test synchronous action creators because when I test the reducer I use action creators to create the action that gets passed into the reducer function. If the action creator is returning something invalid then the reducer tests should fail. Even though I generally don't test these I have included examples to show how these can be tested.

##### Example Action Creator:
```
export const addToDo = label => ({
	type: actionTypes.ADD_TODO,
	payload: {
		label,
	}
});
```
##### Example Test:
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
When testing async action creators we want to make sure that the correct actions are dispatched. This requires creating a mock store, dispatching the action, and checking to make sure the correct actions have been called.

##### Example Action:
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

This action dispatches three other actions fetchStart, fetchSuccess, and fetchFail so we want to make sure each of those dispatch when we want them to.

##### Example Test:
```
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares); // This returns a function we can use to mock the store

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
First we call configureMockStore passing in any middleware that is needed, this returns a function we can use to create a mock store. If some action being dispatched is dependent on something being set in state then you need to pass an object mocking that part of state into the function returned from configureMockStore. These tests also have an argument called done being passed in which is just a function you call to indicate that the async test is complete. In expectedActions I created an array using the action creators to create a mock of what store.getActions() returns.

### Reducer
When testing the reducer it's important to make sure that every case is tested.

##### Example Reducer:
```
import * as actionTypes from './action-types';

let lastId = 0;

export const initialState = {
	todos: {},
	fetching: false,
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ADD_TODO:
			const todo = {
				id: lastId++,
				label: action.payload.label,
				isCompleted: false,
			};
			return {
				...state,
				todos: {
					...state.todos,
					[todo.id]: todo,
				},
			};

		case actionTypes.DELETE_TODO:
			const nextTodoState = {
				...state.todos,
			};
			delete nextTodoState[action.payload.itemId]
			return {
				...state,
				todos: nextTodoState,
			};

		case actionTypes.SET_TODO_TO_ACTIVE:
			return {
				...state,
				todos: {
					...state.todos,
					[action.payload.itemId]: {
						...state.todos[action.payload.itemId],
						isCompleted: false,
					}
				}
			}

		case actionTypes.COMPLETE_TODO:
			return {
				...state,
				todos: {
					...state.todos,
					[action.payload.itemId]: {
						...state.todos[action.payload.itemId],
						isCompleted: true,
					}
				},
			}

		case actionTypes.FETCH_START:
			return {
				...state,
				fetching: true,
			}

		case actionTypes.FETCH_FAIL:
			return {
				...state,
				fetching: false,
			}

		case actionTypes.FETCH_SUCCESS:
			return {
				...state,
				fetching: false,
				todos: {
					...state.todos,
					...action.payload.todos,
				},
			};

		default: return state;
	};
}

export default reducer;
```
Each case in the reducer returns a new state with whatever changes were made for the action that was dispatched. If the action doesn't have an actionType that matches an action type in the reducer then it will return whatever state was passed in or initialState. When testing we want to make sure that the correct changes are made for the action that was dispatched. To test this we mock state if needed and call the reducer with the mocked state and action returned by the action creator. We also need to mock what the expected state should look like and use this to compare with the output of the reducer.

##### Example Tests:
```
import * as actions from '../actions';
import reducer, { initialState } from '../reducer';

describe('reducer', () => {
	const label = 'Test Todo';
	const mockTodo = {
		id: 0,
		label,
		isCompleted: false,
	};

	it('handle default', () => {
		expect(reducer(undefined, {})).toEqual(initialState);
	});

	it('handle ADD_TODO', () => {
		const expectedResult = {
			fetching: false,
			todos: {
				[mockTodo.id]: mockTodo,
			},
		}
		expect(reducer(undefined, actions.addToDo(label))).toEqual(expectedResult);
	});

	it('handle DELETE_TODO', () => {
		const mockState = {
			fetching: false,
			todos: {
				[mockTodo.id]: mockTodo,
			},
		};
		const expectedResult = {
			fetching: false,
			todos: {}
		};
		expect(reducer(mockState, actions.deleteToDo(mockTodo.id))).toEqual(expectedResult);
	});

	it('handle SET_TODO_TO_ACTIVE', () => {
		const mockState = {
			fetching: false,
			todos: {
				[mockTodo.id]: {
					...mockTodo,
					isCompleted: true,
				},
			}
		};
		const expectedResult = {
			fetching: false,
			todos: {
				[mockTodo.id]: {
					...mockTodo,
					isCompleted: false,
				},
			},
		};
		expect(reducer(mockState, actions.setToDoToActive(mockTodo.id))).toEqual(expectedResult);
	});

	it('handle COMPLETE_TODO', () => {
		const mockState = {
			fetching: false,
			todos: {
				[mockTodo.id]: {
					...mockTodo,
					isCompleted: false,
				},
			},
		};
		const expectedResult = {
			fetching: false,
			todos: {
				[mockTodo.id]: {
					...mockTodo,
					isCompleted: true,
				},
			},
		};
		expect(reducer(mockState, actions.completeToDo(mockTodo.id))).toEqual(expectedResult);
	});

	it('handle FETCH_START', () => {
		const mockState = { fetching: false };
		const expectedResult = { fetching: true };
		expect(reducer(mockState, actions.fetchStart())).toEqual(expectedResult);
	});

	it('handle FETCH_FAIL', () => {
		const mockState = { fetching: true };
		const expectedResult = { fetching: false };
		expect(reducer(mockState, actions.fetchFail())).toEqual(expectedResult);
	});

	it('handle FETCH_SUCCESS', () => {
		const mockState = {
			fetching: true,
			todos: {},
		};
		const todos = {
			[mockTodo.id]: mockTodo,
		};
		const expectedResult = {
			fetching: false,
			todos,
		};
		expect(reducer(mockState, actions.fetchSuccess(todos))).toEqual(expectedResult);
	});
});
```

### Components

#### Enzyme
[Enzyme](http://airbnb.io/enzyme/) is a library that allows you create a mock DOM and test whether a component behaves correctly.

With Enzyme you can do either [shallow rendering](http://airbnb.io/enzyme/docs/api/shallow.html) or [full DOM rendering](http://airbnb.io/enzyme/docs/api/mount.html). Shallow rendering is what I use probably 90% of the time, it allows you to keep your tests contained to just the functionality of the the component without having to worry about how other components interact with it. Full DOM rendering allows you to test how components in the DOM interact with each other.

#### Connected and Unconnected components
When working with redux you have connected components and unconnected components. When testing a component that is connected, it's best to export the class so you can you focus the tests to just the functionality within scope of the component.
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

Notice I have two exports in the file, that allows me to use the component in a test file unconnected. Everything should be covered with unit tests so you shouldn't need to worry about whether a selector returns the correct thing, just pass the prop you are expecting to the component while testing. Its also best not to add a lot of logic within mapStateToProps or mapDispatchToProps. This keeps the logic contained to their respective files and makes everything easier to test.

Here is an example component using the Todo component which basically just renders a Todo item and handles what happens when you click the delete button and the check box. This component is not connected.
##### Example Component
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
##### Example Test:
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
The first thing I do is create a simple test that just makes sure the component renders without any issues. In this test i'm mocking a todo item and passing that item as a prop to the Todo component. I'm using the shallow util from enzyme to do a shallow render and then checking to make sure the component actually rendered by checking the length of the wrapper. Most of the time I don't pass any props into the component for this type of test because default props should prevent errors, but in this case todo is a required prop so I have to mock it.

#### Class and Lifecycle Methods
Your component may have some class methods or lifecycle methods the need to be tested. You can test these by mounting the component and either calling the class methods or triggering whatever change that causes the a lifecyle method to be called.
##### Class Methods
The Todo component above has two class methods handleDeleteClick and handleCheckboxClick. In the example below we are going to test handleDeleteClick. First we mock the props and for the onDeleteClick prop we are going to use a [mock function](https://facebook.github.io/jest/docs/en/mock-functions.html) that will be used for this prop. We can then mount the component, call handleDeleteClick, and see if the mock function was called.
##### Example Test:
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
Using `jest.fn()` provides an easy way to test a prop that is a function without needing to worry about the actual implementation. If onDeleteClick was an action in mapDispatchToProps this would allow me to test whether the function was called and doesn't require the mocking store and everything.
`wrapper.instance()` gets the instance of the root node being rendered and gives you access to class methods like handleDeleteClick. In this test i'm calling handleDeleteClick and then checking to see if my mock function was called or not.

##### Lifecycle Methods
I don't have very many lifecycle method examples in this project yet, but it's important to know how to test these. If you have some lifecycle methods that are supposed to trigger a function you can use this same approach as I used on class methods to test whether that function will be called or not. With lifecycle methods you need to mount the component and then trigger whatever is needed for the lifecycle method to be called. In the TodoList component, fetchTodos is called in componentWillMount, to test this we need to create a mock function, mount the component and pass the mocked function in props. We can then check to see if the mocked function was actually called when the component mounts.
##### Example Test:
```
describe('componentWillMount', () => {
	it('should call fetchTodos when the component mounts', () => {
		const props = {
			fetchTodos: jest.fn(),
		};
		const wrapper = shallow(<TodoList {...props} />);
		expect(props.fetchTodos).toBeCalled();
	});
});
```
In this example i'm using `expect(mockedFunction).toBeCalled();` to see if my mock function has been called, if we expect the function to be called with some value we can use `expect(mockedFunction).toBeCalledWith(value);` If we have a function that gets called when componentWillReceiveProps is called we can use `wrapper.setProps` to trigger componentWillReceiveProps. Lets say we have a prop called "listId" and when it changes, we fetch todos for that id. We could test that like this:
##### Example Test:
```
describe('componentWillReceiveProps', () => {
	it('should call fetchTodos when the component receives a new listId', () => {
		const props = {
			fetchTodos: jest.fn(),
			listId: 1,
		};
		const wrapper = shallow(<TodoList {...props} />);
		wrapper.setProps({ id: 2 });
		expect(props.fetchTodos).toBeCalled();
	});
});
```
You can use that approach to test other lifecycle methods like shouldComponentUpdate. You can also use `setState` to trigger state to test something that should happen when the state changes.

#### Snapshot Tests
Snapshots are a great way to catch unexpected changes in the UI that may cause a regression. A snapshot test will render a component, take a snapshot, and compare it against a reference image, if the two don't match the test will fail. The test will fail if there was an intentional change made and the snapshot needs to be updated or there was an unexpected change that causes a regression. Below is a snapshot test I have written for the todo component. To create a snapshot test we need to use [react-test-renderer](https://reactjs.org/docs/test-renderer.html), this provides a react renderer that renders components to pure Javascript without requiring the DOM. In the test we use react-test-renderer to render the component and then check to see if the snapshot matches the previous snapshot, if there is not an existing snapshot one will be created.  

##### Example Test:
```
it('renders todo correctly', () => {
	const props = {
		todo: mockTodo,
	}
	const todo = renderer.create(<Todo {...props} />).toJSON();
	expect(todo).toMatchSnapshot();
});
```
If a snapshot was created you'll `1 snapshot written.` in the console when you run the test, if there's an existing snapshot and it doesn't match you'll see `1 snapshot failed.` and whatever is missing will be highlighted in green. If the change was expected you can run jest with -u to updated it, in this project I created a script callled test:updateSnapshot that will updated the snapshots.

### Selectors
This project uses [reselect](https://github.com/reduxjs/reselect) to create selectors for getting data from the store. Testing selectors is pretty easy, all you need to do is mock the state, pass the mocked state into the selector, and evaluate the output.

##### Example Selector:
```
export const getTodos = state => state.todos;

export const getAllTodos = createSelector(
	[getTodos],
	todos => Object.values(todos),
);
```
This what my mock state looks like:
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

##### Example Test:
```
	describe('getAllTodos', () => {
		it('should return all todos', () => {
			const expectResult = [ mockTodo, mockTodo2, mockTodo3 ];
			expect(selectors.getAllTodos(mockState)).toEqual(expectResult);
		});
	});
```

I set the expected result to be an array of all the mocked todo items, pass the mocked data into the selector, and expect the return from the selector to match my expected result.
