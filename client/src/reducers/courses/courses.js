import { FETCH_COURSES, ADD_NEW_COURSE } from '../../actions/types';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_COURSES:
      return action.payload;
    case ADD_NEW_COURSE:
      return [...state, action.payload];

    default:
      return state;
  }
};
