import {ActionType} from '../action-types';

export type CounterState = {
  value: number;
};

const InitialState: CounterState = {
  value: 0,
};

export const counterReducer = (state = InitialState, action: ActionType) => {
  switch (action.type) {
    case 'COUNTER_INCREMENT':
      return {
        ...state,
        value: state.value + 1,
      };
    case 'COUNTER_RESET':
      return {
        ...InitialState,
      };
    default:
      return state;
  }
};
