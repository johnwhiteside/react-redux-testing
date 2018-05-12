import * as actions from '../actions';
import * as actionTypes from '../action-types';

describe('actions', () => {
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

  it('should return action to complete todo', () => {
    const itemId = 123;
    const expectedAction = {
      type: actionTypes.COMPLETE_TODO,
      payload: {
        itemId,
      }
    };
    expect(actions.completeToDo(itemId)).toEqual(expectedAction);
  });

  it('should return action to delete todo', () => {
    const itemId = 123;
    const expectedAction = {
      type: actionTypes.DELETE_TODO,
      payload: {
        itemId,
      }
    };
    expect(actions.deleteToDo(itemId)).toEqual(expectedAction);
  });

  it('should return action to set todo to active', () => {
    const itemId = 123;
    const expectedAction = {
      type: actionTypes.SET_TODO_TO_ACTIVE,
      payload: {
        itemId,
      }
    };
    expect(actions.setToDoToActive(itemId)).toEqual(expectedAction);
  });
});
