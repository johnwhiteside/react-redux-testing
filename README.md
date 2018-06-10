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
#### Action Creators
#### Async Actions
### Reducer
### Components
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
