import { Record } from 'immutable';

const Todo = Record({
  id: null,
  label: '',
  isCompleted: false,
});

export default Todo;