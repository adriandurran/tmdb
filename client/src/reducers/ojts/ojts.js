import { FETCH_OJTS, FETCH_OJT_TYPES } from '../../actions/types';

const INITIAL_STATE_A = [];

export const ojtsReducer = (state = INITIAL_STATE_A, action) => {
  switch (action.type) {
    case FETCH_OJTS:
      return action.payload;

    default:
      return state;
  }
};

export const ojtTypesReducer = (state = INITIAL_STATE_A, action) => {
  switch (action.type) {
    case FETCH_OJT_TYPES:
      return action.payload;

    default:
      return state;
  }
};
