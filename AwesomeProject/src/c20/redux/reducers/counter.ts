import {ActionType} from '../action-types';

export type CounterState = {
  count: number;
};

const InitialState: CounterState = {
  count: 0,
};

export const counterReducer = (state = InitialState, action: ActionType) => {
  switch (action.type) {
    case 'COUNTER_INCREMENT':
      return {
        ...state,
        count: state.count + 1,
      };
    case 'COUNTER_RESET':
      return {
        ...InitialState,
      };
    default:
      return state;
  }
};
