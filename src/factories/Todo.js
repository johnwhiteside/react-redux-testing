import { Factory } from 'rosie';

const Todo = new Factory()
	.sequence('id')
	.sequence('label', i => `Mock Todo ${i}`)
	.attrs({ isCompleted: false });

export default Todo;
