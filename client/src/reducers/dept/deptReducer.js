import { FETCH_DEPTS, ADMIN_ADD_DEPT } from '../../actions/types';

const INITIAL_STATE_A = [];

export const deptsReducer = (state = INITIAL_STATE_A, action) => {
  switch (action.type) {
    case FETCH_DEPTS:
      return action.payload;
    case ADMIN_ADD_DEPT:
      return [...state, action.payload];

    default:
      return state;
  }
};
