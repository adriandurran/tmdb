import { FETCH_COURSES } from '../actions/types';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_COURSES:
      return [action.payload];

    default:
      return state;
  }
};
