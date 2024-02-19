import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'; // If you're using Redux Thunk for async actions
import rootReducer from '../reducers/reducers'; // Import your root reducer
import { PokemonState } from '../reducers/reducers'; // Import PokemonState interface

// Define the initial state
const initialState: PokemonState = {
  count: 0, // Provide a default value for count
};

// Create the Redux store
const store = createStore(
  rootReducer,
  initialState,

);

export default store;
