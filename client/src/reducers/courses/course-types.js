import {
  FETCH_COURSE_TYPE,
  ADD_COURSE_TYPE,
  DELETE_COURSE_TYPE
} from '../../actions/types';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_COURSE_TYPE:
      return action.payload;
    case ADD_COURSE_TYPE:
      return [...state, action.payload];
    case DELETE_COURSE_TYPE:
      return state.filter(type => type._id !== action.payload);
    default:
      return state;
  }
};
