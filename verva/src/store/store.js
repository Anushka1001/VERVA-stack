import { createStore } from 'redux';
import vervaReducer from './reducer';

const store = createStore(vervaReducer);

export default store;
