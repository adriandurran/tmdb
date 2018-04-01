import {
  FETCH_COMPS,
  ADD_COURSE_FOR_COMPBUILDER,
  REMOVE_COURSE_FOR_COMPBUILDER,
  CLEAR_COURSES_FROM_COMPBUILDER,
  ADD_NEW_COMP
} from '../../actions/types';

const INITIAL_STATE = [];

export const compsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_COMPS:
      return action.payload;
    case ADD_NEW_COMP:
      return [...state, action.payload];
    default:
      return state;
  }
};

export const compBuilderCourses = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_COURSE_FOR_COMPBUILDER:
      return [...state, action.payload];
    case REMOVE_COURSE_FOR_COMPBUILDER:
      return state.filter(({ id }) => id !== action.payload);
    case CLEAR_COURSES_FROM_COMPBUILDER:
      return INITIAL_STATE;
    default:
      return state;
  }
};
