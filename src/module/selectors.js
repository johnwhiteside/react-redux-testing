import { createSelector } from 'reselect';

export const getTodos = state => state.todos;

export const getAllTodos = createSelector(
	[getTodos],
	todos => Object.values(todos),
)

export const selectCompletedTodos = createSelector(
	[getAllTodos],
	todos => Object.values(todos).filter(({ isCompleted }) => isCompleted),
);

export const selectUnCompletedTodos = createSelector(
	[getAllTodos],
	todos => Object.values(todos).filter(({ isCompleted }) => !isCompleted),
);
