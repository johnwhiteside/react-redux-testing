import { createSelector } from 'reselect';

export const selectCompletedTodos = createSelector(
  state => state.todos,
  todos => todos.filter(todo => todo.completed),
);
