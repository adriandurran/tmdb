import {
  FETCH_DEPTS,
  ADMIN_ADD_DEPT,
  FETCH_DEPT,
  CLEAR_DEPT,
  ADMIN_DELETE_DEPT
} from '../../actions/types';

const INITIAL_STATE_A = [];
const INITIAL_STATE_O = {};

export const deptsReducer = (state = INITIAL_STATE_A, action) => {
  switch (action.type) {
    case FETCH_DEPTS:
      return action.payload;
    case ADMIN_ADD_DEPT:
      return [...state, action.payload];
    case ADMIN_DELETE_DEPT:
      return state.filter((dept) => dept._id !== action.payload);
    default:
      return state;
  }
};

export const deptReducer = (state = INITIAL_STATE_O, action) => {
  switch (action.type) {
    case FETCH_DEPT:
      return action.payload;
    case CLEAR_DEPT:
      return INITIAL_STATE_O;

    default:
      return state;
  }
};
