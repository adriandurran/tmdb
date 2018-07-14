import { FETCH_FEEDBACK_TYPES } from '../../actions/types';

const INITIAL_STATE_A = [];
const INITIAL_STATE_O = [];

export const feebackTypeReducer = (state = INITIAL_STATE_A, action) => {
  switch (action.type) {
    case FETCH_FEEDBACK_TYPES:
      return action.payload;

    default:
      return state;
  }
};
