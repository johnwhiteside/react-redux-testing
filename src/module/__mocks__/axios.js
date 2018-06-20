import { TODOS_ENDPOINT } from '../constants';
import { data as todos } from './todos.json';

export const MOCK_IDS = {
	success: 1,
	fail: 2,
}
export const MOCK_ERROR = {
	error: 'no todos found for id',
}
export const MOCK_SUCCESS = {
	data: todos
};

const mock = {
	get: jest.fn((url, { id }) => {
		switch (url) {
			case TODOS_ENDPOINT:
				if (id === MOCK_IDS.success) {
					return Promise.resolve(MOCK_SUCCESS);
				}
				return Promise.reject(MOCK_ERROR);
			default:
				return Promise.reject({ error: 'Not Found'});
		}
	})
};

export default mock;
