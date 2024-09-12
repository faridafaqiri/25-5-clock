// src/redux/store.js
import { createStore } from 'redux';
import timerReducer from './reducers';

const store = createStore(timerReducer);

export default store;