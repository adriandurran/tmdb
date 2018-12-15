import { FETCH_OJTS } from '../../actions/types';

const INITIAL_STATE_A = [];

export const ojtsReducer = (state = INITIAL_STATE_A, action) => {
  switch (action.type) {
    case FETCH_OJTS:
      return action.payload;

    default:
      return state;
  }
};
