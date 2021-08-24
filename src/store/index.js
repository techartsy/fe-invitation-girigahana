import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import invitationReducer from './reducer/invitationReducer';

const reducer = combineReducers({
  invitationReducer
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;