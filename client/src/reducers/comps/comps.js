import {
  FETCH_COMPS
  // ADD_COURSE_FOR_COMPBUILDER,
  // REMOVE_COURSE_FOR_COMPBUILDER,
  // CLEAR_COURSES_FROM_COMPBUILDER,
  // ADD_NEW_COMP
} from '../../actions/types';

const INITIAL_STATE = [];

export const compsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_COMPS:
      return action.payload;
    default:
      return state;
  }
};
