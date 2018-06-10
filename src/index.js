import React from "react";
import ReactDOM from "react-dom";
import reducer from './module/reducer';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import TodoList from './components/TodoList';
import thunk from 'redux-thunk';

const store = createStore(reducer, applyMiddleware(thunk));

ReactDOM.render(
	<Provider store={store}>
		<TodoList />
	</Provider>, document.getElementById("index"));
