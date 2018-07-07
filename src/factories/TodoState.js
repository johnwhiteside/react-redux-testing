import { Factory } from 'rosie';

export const TodoStateFactory = new Factory().attrs({
	'todos': {},
	'fetching': false,
});

export default TodoStateFactory;
