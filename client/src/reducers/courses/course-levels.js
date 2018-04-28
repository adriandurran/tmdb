import {
  FETCH_COURSE_LEVEL,
  ADD_COURSE_LEVEL,
  DELETE_COURSE_LEVEL
} from '../../actions/types';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_COURSE_LEVEL:
      return action.payload;
    case ADD_COURSE_LEVEL:
      return [...state, action.payload];
    case DELETE_COURSE_LEVEL:
      return state.filter(level => level._id !== action.payload);
    default:
      return state;
  }
};
