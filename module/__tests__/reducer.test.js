import * as actions from '../actions';
import { Map, Record } from 'immutable';
import reducer, { initialState } from '../reducer';
import Todo from '../model';

describe('reducer', () => {
  it('should return state with todo added', () => {
    const label = 'Test Todo';
    const todo = new Todo({ id: 0, label });
    const expectedState = Map([]).set(todo.id, todo);
    expect(reducer(undefined, actions.addToDo(label))).toEqual(expectedState);
  });

  it('should return state with todo removed', () => {
    const label = 'Test Todo';
    const todo = new Todo({ id: 0, label });
    const testState = Map([]).set(todo.id, todo);
    const expectedState = Map([]);
    expect(reducer(testState, actions.deleteToDo(todo.id))).toEqual(expectedState);
  });

  it('should return state with todo set to incomplete', () => {
    const label = 'Test Todo';
    const todo = new Todo({ id: 0, label, isCompleted: true });
    const testState = Map([]).set(todo.id, todo);
    const expectedState = testState.update(todo.id, todo => todo.set('isCompleted', false));
    expect(reducer(testState, actions.setToDoToActive(todo.id))).toEqual(expectedState);
  });

  it('should return state with todo set to complete', () => {
    const label = 'Test Todo';
    const todo = new Todo({ id: 0, label, isCompleted: false });
    const testState = Map([]).set(todo.id, todo);
    const expectedState = testState.update(todo.id, todo => todo.set('isCompleted', true));
    expect(reducer(testState, actions.completeToDo(todo.id))).toEqual(expectedState);
  });
});
