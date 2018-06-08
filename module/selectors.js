import { createSelector } from 'reselect';

export const getTodos = state => state.todos;

export const selectCompletedTodos = createSelector(
	[getTodos],
	todos => Object.values(todos).filter(({ isCompleted }) => isCompleted),
);

export const selectUnCompletedTodos = createSelector(
	[getTodos],
	todos => Object.values(todos).filter(({ isCompleted }) => !isCompleted),
);
