// pokemonReducer.tsx
import { Reducer } from 'redux';
import { ActionTypes } from '../actions/actionTypes'; // Import ActionTypes from actionTypes.tsx

// Define your initial state interface
export interface PokemonState {
  count: number;
}

// Define your initial state
const initialState: PokemonState = {
  count: 0,
};

// Define your reducer function
const pokemonReducer: Reducer<PokemonState, ActionTypes> = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        count: state.count + 1,
      };
    case 'DECREMENT':
      return {
        ...state,
        count: state.count - 1,
      };
    default:
      return state;
  }
};

export default pokemonReducer;
