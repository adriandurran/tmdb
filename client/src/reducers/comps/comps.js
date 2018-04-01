import {
  FETCH_COMPS,
  ADD_COURSE_FOR_COMPBUILDER,
  REMOVE_COURSE_FOR_COMPBUILDER
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

export const compBuilderCourses = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_COURSE_FOR_COMPBUILDER:
      return [...state, action.payload];
    case REMOVE_COURSE_FOR_COMPBUILDER:
      return state.filter(({ id }) => id !== action.payload);
    default:
      return state;
  }
};
