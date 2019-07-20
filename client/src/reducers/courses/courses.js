import {
  FETCH_COURSES,
  ADD_NEW_COURSE,
  DELETE_NEW_COURSE,
  FETCH_COURSE,
  CLEAR_COURSE
} from '../../actions/types';

const INITIAL_STATE_A = [];
const INITIAL_STATE_O = {};

export const coursesReducer = (state = INITIAL_STATE_A, action) => {
  switch (action.type) {
    case FETCH_COURSES:
      return action.payload;
    case ADD_NEW_COURSE:
      return [...state, action.payload];
    case DELETE_NEW_COURSE:
      return state.filter((course) => course._id !== action.payload);
    default:
      return state;
  }
};

export const courseReducer = (state = INITIAL_STATE_O, action) => {
  switch (action.type) {
    case FETCH_COURSE:
      return action.payload;
    case CLEAR_COURSE:
      return INITIAL_STATE_O;

    default:
      return state;
  }
};
