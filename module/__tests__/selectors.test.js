import * as selectors from '../selectors';

describe('selectCompletedTodos', () => {
  it('Should return todos that are completed', () => {
    const todo = { id: 1, completed: false };
    const todo2 = { id: 2, completed: true };
    const todo3 = { id: 3, completed: false };
    const mockState = {
      todos: [
        todo,
        todo2,
        todo3,
      ]
    }
    const expectResult = [ todo2 ];
    expect(selectors.selectCompletedTodos(mockState)).toEqual(expectResult);
  });
});