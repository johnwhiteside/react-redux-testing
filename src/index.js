import React from "react";
import ReactDOM from "react-dom";
import reducer from './module/reducer';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import TodoList from './components/TodoList';

const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <TodoList />
  </Provider>, document.getElementById("index"));
