// actionTypes.ts
export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';

export interface IncrementAction {
  type: typeof INCREMENT;
}

export interface DecrementAction {
  type: typeof DECREMENT;
}

export type ActionTypes = IncrementAction | DecrementAction;
