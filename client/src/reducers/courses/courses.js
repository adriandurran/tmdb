import {
  FETCH_COURSES,
  ADD_NEW_COURSE,
  FETCH_COURSE,
  CLEAR_COURSE_SEARCH
} from '../../actions/types';

const INITIAL_STATE_A = [];
const INITIAL_STATE_O = {};

export const coursesReducer = (state = INITIAL_STATE_A, action) => {
  switch (action.type) {
    case FETCH_COURSES:
      return action.payload;
    case ADD_NEW_COURSE:
      return [...state, action.payload];

    default:
      return state;
  }
};

export const courseReducer = (state = INITIAL_STATE_O, action) => {
  switch (action.type) {
    case FETCH_COURSE:
      return action.payload;
    case CLEAR_COURSE_SEARCH:
      return INITIAL_STATE_O;

    default:
      return state;
  }
};
