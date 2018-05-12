import { Map, Record } from 'immutable';
import * as actionTypes from './action-types';
import Todo from './model';

const initialState = Map([]);

let lastId = 0;

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TODO:
      const todo = new Todo({ id: lastId++, label: action.payload.label });
      return state.set(todo.id, todo);

    case actionTypes.DELETE_TODO:
      return state.delete(action.payload.itemId);

    case actionTypes.SET_TODO_TO_ACTIVE:
      return state.update(action.payload.itemId, todo => todo.set('isCompleted', false));

    case actionTypes.COMPLETE_TODO:
      return state.update(action.payload.itemId, todo => todo.set('isCompleted', true));

    default: return state;
  };
}

export default reducer;
export {
  initialState,
};