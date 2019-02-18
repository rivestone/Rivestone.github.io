import {
  createStore,
  combineReducers,
  applyMiddleware
} from 'redux';
import {
  modelReducer,
  formReducer
} from 'react-redux-form';
import thunk from 'redux-thunk';

const initialUserState = {
  email: '',
  password: '',
  chooseCurrency: 'rubles',
  acceptAgreement: false

};

const store = applyMiddleware(thunk)(createStore)(combineReducers({
  user: modelReducer('user', initialUserState),
  userForm: formReducer('user', initialUserState)
}));

export default store;
